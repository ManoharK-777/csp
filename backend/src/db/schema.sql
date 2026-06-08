-- Database Schema for Unified Government Services Portal

PRAGMA foreign_keys = ON;

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  official_url TEXT
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT
);

-- Schemes Table
CREATE TABLE IF NOT EXISTS schemes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER,
  department_id INTEGER,
  type TEXT NOT NULL CHECK(type IN ('Central', 'State')),
  description TEXT NOT NULL,
  benefits TEXT NOT NULL,
  eligibility_criteria TEXT NOT NULL,
  min_age INTEGER DEFAULT 0,
  max_age INTEGER DEFAULT 120,
  gender_restriction TEXT DEFAULT 'All' CHECK(gender_restriction IN ('All', 'Male', 'Female')),
  min_income REAL DEFAULT 0,
  max_income REAL DEFAULT 99999999,
  is_student_only INTEGER DEFAULT 0,
  is_farmer_only INTEGER DEFAULT 0,
  is_senior_only INTEGER DEFAULT 0,
  is_disabled_only INTEGER DEFAULT 0,
  required_documents TEXT, -- JSON array string or comma separated
  application_process TEXT,
  official_website TEXT,
  contact_details TEXT,
  financial_assistance_amount REAL DEFAULT 0,
  processing_time TEXT,
  FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER,
  department_id INTEGER,
  type TEXT NOT NULL CHECK(type IN ('National', 'State')),
  description TEXT NOT NULL,
  website_url TEXT NOT NULL,
  required_documents TEXT,
  process_overview TEXT,
  FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Grievances Table
CREATE TABLE IF NOT EXISTS grievances (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name TEXT NOT NULL UNIQUE,
  recommended_department_id INTEGER,
  draft_template TEXT NOT NULL,
  official_portal_url TEXT,
  required_documents TEXT,
  FOREIGN KEY(recommended_department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Documents Table
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_name TEXT NOT NULL UNIQUE,
  description TEXT,
  issuing_authority TEXT,
  eligibility_criteria TEXT,
  processing_time TEXT,
  application_steps TEXT
);

-- SDG Mapping Table
CREATE TABLE IF NOT EXISTS sdg_mapping (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scheme_id INTEGER,
  service_id INTEGER,
  sdg_code TEXT NOT NULL CHECK(sdg_code IN ('SDG_1', 'SDG_3', 'SDG_4', 'SDG_8', 'SDG_10', 'SDG_16')),
  sdg_name TEXT NOT NULL,
  FOREIGN KEY(scheme_id) REFERENCES schemes(id) ON DELETE CASCADE,
  FOREIGN KEY(service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Indexes for search performance
CREATE INDEX IF NOT EXISTS idx_schemes_name ON schemes(name);
CREATE INDEX IF NOT EXISTS idx_schemes_type ON schemes(type);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category_id);
CREATE INDEX IF NOT EXISTS idx_services_name ON services(name);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_sdg_mapping_scheme ON sdg_mapping(scheme_id);
CREATE INDEX IF NOT EXISTS idx_sdg_mapping_service ON sdg_mapping(service_id);
