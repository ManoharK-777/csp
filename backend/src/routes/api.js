import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// ==========================================
// 1. STATS & ANALYTICS ENDPOINTS
// ==========================================
router.get('/stats', (req, res) => {
  try {
    const totalSchemes = db.queryOne('SELECT COUNT(*) AS count FROM schemes').count;
    const totalServices = db.queryOne('SELECT COUNT(*) AS count FROM services').count;
    const totalDepts = db.queryOne('SELECT COUNT(*) AS count FROM departments').count;
    const totalGrievanceCats = db.queryOne('SELECT COUNT(*) AS count FROM grievances').count;

    // Schemes by Category for charts
    const schemesByCategory = db.query(`
      SELECT c.name, COUNT(s.id) AS count, c.icon_name
      FROM categories c
      LEFT JOIN schemes s ON s.category_id = c.id
      GROUP BY c.id
    `);

    // Schemes by Type (Central vs State)
    const schemesByType = db.query(`
      SELECT type, COUNT(*) AS count
      FROM schemes
      GROUP BY type
    `);

    // Services by Category for charts
    const servicesByCategory = db.query(`
      SELECT c.name, COUNT(srv.id) AS count
      FROM categories c
      LEFT JOIN services srv ON srv.category_id = c.id
      GROUP BY c.id
    `);

    // SDG Goal mapping count
    const sdgDistribution = db.query(`
      SELECT sdg_code, sdg_name, COUNT(*) AS count
      FROM sdg_mapping
      GROUP BY sdg_code
    `);

    // Department Scheme Distribution (Top 5)
    const schemesByDept = db.query(`
      SELECT d.name AS dept_name, d.code AS dept_code, COUNT(s.id) AS count
      FROM departments d
      LEFT JOIN schemes s ON s.department_id = d.id
      GROUP BY d.id
      ORDER BY count DESC
      LIMIT 5
    `);

    res.json({
      summary: {
        totalSchemes,
        totalServices,
        totalDepts,
        totalGrievanceCats
      },
      schemesByCategory,
      schemesByType,
      servicesByCategory,
      sdgDistribution,
      schemesByDept
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 2. SCHEMES ENDPOINTS
// ==========================================
router.get('/schemes', (req, res) => {
  try {
    const { search, category, type, sortBy, sortOrder } = req.query;
    let sql = `
      SELECT s.*, c.name AS category_name, c.icon_name AS category_icon, d.name AS department_name
      FROM schemes s
      LEFT JOIN categories c ON s.category_id = c.id
      LEFT JOIN departments d ON s.department_id = d.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      sql += ` AND (s.name LIKE ? OR s.description LIKE ? OR s.eligibility_criteria LIKE ?)`;
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    if (category) {
      sql += ` AND s.category_id = ?`;
      params.push(category);
    }

    if (type) {
      sql += ` AND s.type = ?`;
      params.push(type);
    }

    // Sorting
    const allowedSortFields = ['name', 'financial_assistance_amount', 'processing_time'];
    const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
    if (sortBy && allowedSortFields.includes(sortBy)) {
      sql += ` ORDER BY s.${sortBy} ${order}`;
    } else {
      sql += ` ORDER BY s.name ASC`;
    }

    const schemes = db.query(sql, params);
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single scheme with SDG mapping and related schemes
router.get('/schemes/:id', (req, res) => {
  try {
    const scheme = db.queryOne(`
      SELECT s.*, c.name AS category_name, c.icon_name AS category_icon, d.name AS department_name, d.code AS department_code
      FROM schemes s
      LEFT JOIN categories c ON s.category_id = c.id
      LEFT JOIN departments d ON s.department_id = d.id
      WHERE s.id = ?
    `, [req.params.id]);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    const sdgs = db.query('SELECT sdg_code, sdg_name FROM sdg_mapping WHERE scheme_id = ?', [req.params.id]);
    
    // Suggest 3 related schemes from same category (excluding current)
    const related = db.query(`
      SELECT id, name, type, description, financial_assistance_amount, category_id
      FROM schemes
      WHERE category_id = ? AND id != ?
      LIMIT 3
    `, [scheme.category_id, scheme.id]);

    res.json({
      ...scheme,
      sdgs,
      related
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. SMART ELIGIBILITY CHECKER
// ==========================================
router.post('/eligibility', (req, res) => {
  try {
    const {
      age,
      gender,
      occupation,
      income,
      isStudent,
      isFarmer,
      isSenior,
      isDisabled
    } = req.body;

    const userAge = parseInt(age) || 0;
    const userIncome = parseFloat(income) || 0;
    const userGender = gender || 'All';

    // Fetch all schemes
    const allSchemes = db.query(`
      SELECT s.*, c.name AS category_name, c.icon_name AS category_icon, d.name AS department_name
      FROM schemes s
      LEFT JOIN categories c ON s.category_id = c.id
      LEFT JOIN departments d ON s.department_id = d.id
    `);

    // Matcher logic
    const eligibleSchemes = allSchemes.filter(scheme => {
      // 1. Age constraint
      if (userAge < scheme.min_age || userAge > scheme.max_age) return false;

      // 2. Gender constraint
      if (scheme.gender_restriction !== 'All' && scheme.gender_restriction !== userGender) return false;

      // 3. Income constraint
      if (userIncome > scheme.max_income) return false;

      // 4. Student check
      if (scheme.is_student_only && !isStudent) return false;

      // 5. Farmer check
      if (scheme.is_farmer_only && !isFarmer) return false;

      // 6. Senior check (scheme can define senior only, or if age >= 60)
      if (scheme.is_senior_only && !isSenior && userAge < 60) return false;

      // 7. Disabled check
      if (scheme.is_disabled_only && !isDisabled) return false;

      return true;
    });

    res.json({
      profile: { age: userAge, gender: userGender, income: userIncome, isStudent, isFarmer, isSenior, isDisabled },
      matchCount: eligibleSchemes.length,
      schemes: eligibleSchemes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 4. SERVICES DIRECTORY ENDPOINTS
// ==========================================
router.get('/services', (req, res) => {
  try {
    const { search, category, type } = req.query;
    let sql = `
      SELECT srv.*, c.name AS category_name, d.name AS department_name, d.code AS department_code
      FROM services srv
      LEFT JOIN categories c ON srv.category_id = c.id
      LEFT JOIN departments d ON srv.department_id = d.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      sql += ` AND (srv.name LIKE ? OR srv.description LIKE ? OR srv.process_overview LIKE ?)`;
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    if (category) {
      // Services category mapping
      sql += ` AND c.id = ?`;
      params.push(category);
    }

    if (type) {
      sql += ` AND srv.type = ?`;
      params.push(type);
    }

    sql += ` ORDER BY srv.name ASC`;

    const services = db.query(sql, params);
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 5. GRIEVANCE ASSISTANCE ENDPOINTS
// ==========================================
router.get('/grievances', (req, res) => {
  try {
    const grievances = db.query(`
      SELECT g.*, d.name AS department_name, d.code AS department_code
      FROM grievances g
      LEFT JOIN departments d ON g.recommended_department_id = d.id
      ORDER BY g.category_name ASC
    `);
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to generate complaint draft
router.post('/grievances/draft', (req, res) => {
  try {
    const {
      categoryId,
      citizenName,
      citizenPhone,
      citizenAadhaar,
      citizenLocality,
      citizenWard,
      citizenDistrict,
      complaintDetails,
      consumerId
    } = req.body;

    const grievanceTemplate = db.queryOne(`
      SELECT g.*, d.name AS department_name
      FROM grievances g
      LEFT JOIN departments d ON g.recommended_department_id = d.id
      WHERE g.id = ?
    `, [categoryId]);

    if (!grievanceTemplate) {
      return res.status(404).json({ message: 'Grievance category not found' });
    }

    let draft = grievanceTemplate.draft_template;
    // Perform string replacements
    draft = draft.replace('[Your Name]', citizenName || '__________________');
    draft = draft.replace('[Your Mobile Number]', citizenPhone || '__________________');
    draft = draft.replace('[Your Aadhaar Number]', citizenAadhaar || '__________________');
    draft = draft.replace('[Your Village/Town]', citizenLocality || '__________________');
    draft = draft.replace('[Your Ward Number]', citizenWard || '__________________');
    draft = draft.replace('[Your District]', citizenDistrict || '__________________');
    draft = draft.replace('[Enter ID]', consumerId || 'N/A');
    draft = draft.replace('[Detail the exact problem here - e.g., leakage, billing errors, road damage]', complaintDetails || '__________________________________________________________________');

    res.json({
      categoryId,
      categoryName: grievanceTemplate.category_name,
      recommendedDepartment: grievanceTemplate.department_name,
      officialPortalUrl: grievanceTemplate.official_portal_url,
      requiredDocuments: grievanceTemplate.required_documents,
      draftText: draft
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 6. DOCUMENT REQUIREMENT CENTER ENDPOINTS
// ==========================================
router.get('/documents', (req, res) => {
  try {
    const { search } = req.query;
    let sql = `SELECT * FROM documents`;
    const params = [];

    if (search) {
      sql += ` WHERE document_name LIKE ? OR description LIKE ? OR issuing_authority LIKE ?`;
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    sql += ` ORDER BY document_name ASC`;
    const documents = db.query(sql, params);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 7. SHARED AUXILIARY METADATA
// ==========================================
router.get('/categories', (req, res) => {
  try {
    const categories = db.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/departments', (req, res) => {
  try {
    const departments = db.query('SELECT * FROM departments ORDER BY name ASC');
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 8. ADMIN CRUD OPERATION ENDPOINTS
// ==========================================

// --- Schemes CRUD ---
router.post('/admin/schemes', (req, res) => {
  try {
    const s = req.body;
    const result = db.run(`
      INSERT INTO schemes (
        name, category_id, department_id, type, description, benefits, eligibility_criteria,
        min_age, max_age, gender_restriction, min_income, max_income, is_student_only,
        is_farmer_only, is_senior_only, is_disabled_only, required_documents, application_process,
        official_website, contact_details, financial_assistance_amount, processing_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      s.name, s.category_id, s.department_id, s.type, s.description, s.benefits, s.eligibility_criteria,
      parseInt(s.min_age) || 0, parseInt(s.max_age) || 120, s.gender_restriction || 'All',
      parseFloat(s.min_income) || 0, parseFloat(s.max_income) || 99999999,
      s.is_student_only ? 1 : 0, s.is_farmer_only ? 1 : 0, s.is_senior_only ? 1 : 0, s.is_disabled_only ? 1 : 0,
      s.required_documents, s.application_process, s.official_website, s.contact_details,
      parseFloat(s.financial_assistance_amount) || 0, s.processing_time
    ]);
    res.status(201).json({ message: 'Scheme created', id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/admin/schemes/:id', (req, res) => {
  try {
    const s = req.body;
    db.run(`
      UPDATE schemes SET
        name = ?, category_id = ?, department_id = ?, type = ?, description = ?, benefits = ?, eligibility_criteria = ?,
        min_age = ?, max_age = ?, gender_restriction = ?, min_income = ?, max_income = ?, is_student_only = ?,
        is_farmer_only = ?, is_senior_only = ?, is_disabled_only = ?, required_documents = ?, application_process = ?,
        official_website = ?, contact_details = ?, financial_assistance_amount = ?, processing_time = ?
      WHERE id = ?
    `, [
      s.name, s.category_id, s.department_id, s.type, s.description, s.benefits, s.eligibility_criteria,
      parseInt(s.min_age) || 0, parseInt(s.max_age) || 120, s.gender_restriction || 'All',
      parseFloat(s.min_income) || 0, parseFloat(s.max_income) || 99999999,
      s.is_student_only ? 1 : 0, s.is_farmer_only ? 1 : 0, s.is_senior_only ? 1 : 0, s.is_disabled_only ? 1 : 0,
      s.required_documents, s.application_process, s.official_website, s.contact_details,
      parseFloat(s.financial_assistance_amount) || 0, s.processing_time, req.params.id
    ]);
    res.json({ message: 'Scheme updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/admin/schemes/:id', (req, res) => {
  try {
    db.run('DELETE FROM schemes WHERE id = ?', [req.params.id]);
    res.json({ message: 'Scheme deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Services CRUD ---
router.post('/admin/services', (req, res) => {
  try {
    const s = req.body;
    const result = db.run(`
      INSERT INTO services (name, category_id, department_id, type, description, website_url, required_documents, process_overview)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [s.name, s.category_id, s.department_id, s.type, s.description, s.website_url, s.required_documents, s.process_overview]);
    res.status(201).json({ message: 'Service created', id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/admin/services/:id', (req, res) => {
  try {
    const s = req.body;
    db.run(`
      UPDATE services SET name = ?, category_id = ?, department_id = ?, type = ?, description = ?, website_url = ?, required_documents = ?, process_overview = ?
      WHERE id = ?
    `, [s.name, s.category_id, s.department_id, s.type, s.description, s.website_url, s.required_documents, s.process_overview, req.params.id]);
    res.json({ message: 'Service updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/admin/services/:id', (req, res) => {
  try {
    db.run('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Departments CRUD ---
router.post('/admin/departments', (req, res) => {
  try {
    const d = req.body;
    const result = db.run('INSERT INTO departments (name, code, description, official_url) VALUES (?, ?, ?, ?)', [d.name, d.code, d.description, d.official_url]);
    res.status(201).json({ message: 'Department created', id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/admin/departments/:id', (req, res) => {
  try {
    const d = req.body;
    db.run('UPDATE departments SET name = ?, code = ?, description = ?, official_url = ? WHERE id = ?', [d.name, d.code, d.description, d.official_url, req.params.id]);
    res.json({ message: 'Department updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/admin/departments/:id', (req, res) => {
  try {
    db.run('DELETE FROM departments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Categories CRUD ---
router.post('/admin/categories', (req, res) => {
  try {
    const c = req.body;
    const result = db.run('INSERT INTO categories (name, description, icon_name) VALUES (?, ?, ?)', [c.name, c.description, c.icon_name || 'BookOpen']);
    res.status(201).json({ message: 'Category created', id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/admin/categories/:id', (req, res) => {
  try {
    const c = req.body;
    db.run('UPDATE categories SET name = ?, description = ?, icon_name = ? WHERE id = ?', [c.name, c.description, c.icon_name || 'BookOpen', req.params.id]);
    res.json({ message: 'Category updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/admin/categories/:id', (req, res) => {
  try {
    db.run('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Grievance Categories CRUD ---
router.post('/admin/grievances', (req, res) => {
  try {
    const g = req.body;
    const result = db.run('INSERT INTO grievances (category_name, recommended_department_id, draft_template, official_portal_url, required_documents) VALUES (?, ?, ?, ?, ?)', [g.category_name, g.recommended_department_id, g.draft_template, g.official_portal_url, g.required_documents]);
    res.status(201).json({ message: 'Grievance category created', id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/admin/grievances/:id', (req, res) => {
  try {
    const g = req.body;
    db.run('UPDATE grievances SET category_name = ?, recommended_department_id = ?, draft_template = ?, official_portal_url = ?, required_documents = ? WHERE id = ?', [g.category_name, g.recommended_department_id, g.draft_template, g.official_portal_url, g.required_documents, req.params.id]);
    res.json({ message: 'Grievance category updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/admin/grievances/:id', (req, res) => {
  try {
    db.run('DELETE FROM grievances WHERE id = ?', [req.params.id]);
    res.json({ message: 'Grievance category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Documents CRUD ---
router.post('/admin/documents', (req, res) => {
  try {
    const d = req.body;
    const result = db.run('INSERT INTO documents (document_name, description, issuing_authority, eligibility_criteria, processing_time, application_steps) VALUES (?, ?, ?, ?, ?, ?)', [d.document_name, d.description, d.issuing_authority, d.eligibility_criteria, d.processing_time, d.application_steps]);
    res.status(201).json({ message: 'Document created', id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/admin/documents/:id', (req, res) => {
  try {
    const d = req.body;
    db.run('UPDATE documents SET document_name = ?, description = ?, issuing_authority = ?, eligibility_criteria = ?, processing_time = ?, application_steps = ? WHERE id = ?', [d.document_name, d.description, d.issuing_authority, d.eligibility_criteria, d.processing_time, d.application_steps, req.params.id]);
    res.json({ message: 'Document updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/admin/documents/:id', (req, res) => {
  try {
    db.run('DELETE FROM documents WHERE id = ?', [req.params.id]);
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
