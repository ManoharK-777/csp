import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Database, Landmark, BookOpen, FileText, CheckCircle, RefreshCw, X, Mic } from 'lucide-react';
import { API_BASE } from '../utils/api';

export default function Admin({ bilingual, categories, departments, fetchAllData, startListening }) {
  const [activeTab, setActiveTab] = useState('schemes');
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form Field States
  const [formData, setFormData] = useState({});

  // helper to dictate voice input into formData textareas
  const handleDictate = (fieldName, label) => {
    if (startListening) {
      startListening(label, (text) => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: prev[fieldName] ? (String(prev[fieldName]).trim() + ' ' + text) : text
        }));
      });
    }
  };

  // Translations dictionary
  const t = {
    title: bilingual === 'EN' ? 'Administrative Management Center' : 'పరిపాలనా నిర్వహణ కేంద్రం',
    subtitle: bilingual === 'EN' ? 'Live database CRUD interface. Manage, edit, and add schemes, services, departments, and document requirements.' : 'లైవ్ డేటాబేస్ నిష్క్రియ (CRUD) ఇంటర్‌ఫేస్. పథకాలు, सేవలు, విభాగాలు మరియు పత్రాల వివరాలను ఇక్కడ సృష్టించండి లేదా మార్చండి.',
    addNewRecord: bilingual === 'EN' ? 'Add New Record' : 'కొత్త రికార్డును జోడించు',
    fetchingRecords: bilingual === 'EN' ? 'Fetching database records...' : 'డేటాబేస్ రికార్డులను సేకరిస్తోంది...',
    idCol: bilingual === 'EN' ? 'ID' : 'ఐడి',
    primaryIdentifierCol: bilingual === 'EN' ? 'Primary Identifier' : 'ప్రధాన గుర్తింపు',
    secondaryDetailsCol: bilingual === 'EN' ? 'Secondary details' : 'అదనపు వివరాలు',
    actionsCol: bilingual === 'EN' ? 'Actions' : 'చర్యలు',
    deleteConfirm: bilingual === 'EN' ? 'Are you sure you want to delete this record?' : 'మీరు నిజంగానే ఈ రికార్డును తొలగించాలనుకుంటున్నారా?',
    deleteFailed: bilingual === 'EN' ? 'Failed to delete record' : 'రికార్డు తొలగింపు విఫలమైంది',
    saveFailed: (err) => bilingual === 'EN' ? `Error saving record: ${err}` : `రికార్డును సేవ్ చేయడంలో లోపం: ${err}`,
    noRecords: bilingual === 'EN' ? 'No records found in this database table. Click "Add New Record" to generate one.' : 'ఈ డేటాబేస్ పట్టికలో ఎటువంటి రికార్డులు కనుగొనబడలేదు. కొత్తదాన్ని సృష్టించడానికి "కొత్త రికార్డును జోడించు" క్లిక్ చేయండి.',
    createNewTitle: (tabLabel) => bilingual === 'EN' ? `Create New ${tabLabel} Record` : `కొత్త ${tabLabel} రికార్డును సృష్టించండి`,
    editTitle: (tabLabel) => bilingual === 'EN' ? `Edit ${tabLabel} Record` : `${tabLabel} రికార్డును సవరించండి`,
    cancel: bilingual === 'EN' ? 'Cancel' : 'రద్దు చేయి',
    saveRecord: bilingual === 'EN' ? 'Save Record' : 'రికార్డును సేవ్ చేయి',
    tabLabels: {
      schemes: bilingual === 'EN' ? 'Welfare Schemes' : 'సంక్షేమ పథకాలు',
      services: bilingual === 'EN' ? 'Citizen Services' : 'పౌర సేవలు',
      departments: bilingual === 'EN' ? 'Departments' : 'ప్రభుత్వ విభాగాలు',
      categories: bilingual === 'EN' ? 'Categories' : 'పథకాల విభాగాలు',
      grievances: bilingual === 'EN' ? 'Grievance Rules' : 'గ్రీవెన్స్ నిబంధనలు',
      documents: bilingual === 'EN' ? 'Document Guide' : 'పత్రాల మార్గదర్శి'
    },
    formLabels: {
      schemeName: bilingual === 'EN' ? 'Scheme Name' : 'పథకం పేరు',
      category: bilingual === 'EN' ? 'Category' : 'విభాగం',
      department: bilingual === 'EN' ? 'Department' : 'ప్రభుత్వ శాఖ',
      jurisdictionType: bilingual === 'EN' ? 'Jurisdiction Type' : 'అధికార పరిధి రకం',
      centralNational: bilingual === 'EN' ? 'Central (National)' : 'కేంద్ర (జాతీయ)',
      stateAP: bilingual === 'EN' ? 'State (Andhra Pradesh)' : 'రాష్ట్ర (ఆంధ్రప్రదేశ్)',
      financialAid: bilingual === 'EN' ? 'Financial Aid (₹)' : 'ఆర్థిక సహాయం (₹)',
      description: bilingual === 'EN' ? 'Description' : 'వివరణ',
      welfareBenefits: bilingual === 'EN' ? 'Welfare Benefits' : 'సంక్షేమ ప్రయోజనాలు',
      eligibilityCriteria: bilingual === 'EN' ? 'Eligibility Criteria' : 'అర్హత ప్రమాణాలు',
      minAge: bilingual === 'EN' ? 'Min Age' : 'కనీస వయస్సు',
      maxAge: bilingual === 'EN' ? 'Max Age' : 'గరిష్ట వయస్సు',
      maxIncome: bilingual === 'EN' ? 'Max Income (₹)' : 'గరిష్ట ఆదాయం (₹)',
      genderReq: bilingual === 'EN' ? 'Gender Req.' : 'లింగం నిబంధన',
      all: bilingual === 'EN' ? 'All' : 'అందరూ',
      male: bilingual === 'EN' ? 'Male' : 'పురుషులు',
      female: bilingual === 'EN' ? 'Female' : 'స్త్రీలు',
      studentOnly: bilingual === 'EN' ? 'Student Only Scheme' : 'విద్యార్థులకు మాత్రమే',
      farmerOnly: bilingual === 'EN' ? 'Farmer Only Scheme' : 'రైతులకు మాత్రమే',
      seniorOnly: bilingual === 'EN' ? 'Senior Citizens Only' : 'వృద్ధులకు మాత్రమే',
      disabledOnly: bilingual === 'EN' ? 'Disabled Citizens Only' : 'దివ్యాంగులకు మాత్రమే',
      requiredDocs: bilingual === 'EN' ? 'Required Documents (comma separated)' : 'అవసరమైన పత్రాలు (కామాలతో వేరు చేయబడినవి)',
      officialWebsiteUrl: bilingual === 'EN' ? 'Official Website URL' : 'అధికారిక వెబ్‌సైట్ URL',
      serviceName: bilingual === 'EN' ? 'Service Name' : 'సేవ పేరు',
      nationalCentral: bilingual === 'EN' ? 'National (Central)' : 'జాతీయ (కేంద్ర)',
      stateMeeSeva: bilingual === 'EN' ? 'State (Andhra Pradesh - MeeSeva)' : 'రాష్ట్ర (ఆంధ్రప్రదేశ్ - మీసేవ)',
      portalWebsiteUrl: bilingual === 'EN' ? 'Portal Website URL' : 'పోర్టల్ వెబ్‌సైట్ URL',
      requiredDocuments: bilingual === 'EN' ? 'Required Documents' : 'అవసరమైన పత్రాలు',
      processOverviewSteps: bilingual === 'EN' ? 'Process Overview Steps' : 'దరఖాస్తు విధానం దశలు',
      departmentName: bilingual === 'EN' ? 'Department Name' : 'శాఖ పేరు',
      departmentCode: bilingual === 'EN' ? 'Department Code (Short)' : 'శాఖ కోడ్ (సంక్షిప్త)',
      officialPortalUrl: bilingual === 'EN' ? 'Official Portal URL' : 'అధికారిక పోర్టల్ URL',
      categoryName: bilingual === 'EN' ? 'Category Name' : 'విభాగం పేరు',
      lucideIconName: bilingual === 'EN' ? 'Lucide Icon Name' : 'లూసిడ్ ఐకాన్ పేరు',
      complaintCategoryName: bilingual === 'EN' ? 'Complaint Category Name' : 'ఫిర్యాదు వర్గం పేరు',
      recommendedDepartment: bilingual === 'EN' ? 'Recommended Department' : 'సిఫార్సు చేయబడిన శాఖ',
      officialRedirectionPortalUrl: bilingual === 'EN' ? 'Official Redirection Portal URL' : 'అధికారిక రీడైరెక్ట్ పోర్టల్ URL',
      proofDocumentsRequired: bilingual === 'EN' ? 'Proof Documents Required' : 'అవసరమైన రుజువు పత్రాలు',
      complaintLetterDraftTemplate: bilingual === 'EN' ? 'Complaint Letter Draft Template' : 'ఫిర్యాదు లేఖ డ్రాఫ్ట్ టెంప్లేట్',
      documentName: bilingual === 'EN' ? 'Document Name' : 'పత్రం పేరు',
      issuingAuthority: bilingual === 'EN' ? 'Issuing Authority' : 'జారీ చేసే అధికారి',
      processingTimeSla: bilingual === 'EN' ? 'Processing Time SLA' : 'ప్రాసెసింగ్ సమయం (SLA)',
      stepByStepApplicationSteps: bilingual === 'EN' ? 'Step-by-Step Application Steps' : 'దశలవారీ దరఖాస్తు విధానం'
    }
  };

  const tabs = [
    { id: 'schemes', label: t.tabLabels.schemes, icon: Database },
    { id: 'services', label: t.tabLabels.services, icon: CheckCircle },
    { id: 'departments', label: t.tabLabels.departments, icon: Landmark },
    { id: 'categories', label: t.tabLabels.categories, icon: BookOpen },
    { id: 'grievances', label: t.tabLabels.grievances, icon: FileText },
    { id: 'documents', label: t.tabLabels.documents, icon: FileText }
  ];

  // Fetch list data based on active tab
  const fetchTabData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/${activeTab}`);
      if (response.ok) {
        const data = await response.json();
        setListData(data);
      }
    } catch (error) {
      console.error(`Error fetching admin ${activeTab} data`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      const response = await fetch(`${API_BASE}/api/admin/${activeTab}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTabData();
        if (fetchAllData) fetchAllData(); // Refresh global app data
      } else {
        alert(t.deleteFailed);
      }
    } catch (error) {
      console.error('Error deleting record', error);
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedItem(null);
    setFormData(getInitialFormValues(activeTab));
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = modalMode === 'create'
      ? `${API_BASE}/api/admin/${activeTab}`
      : `${API_BASE}/api/admin/${activeTab}/${selectedItem.id}`;

    const method = modalMode === 'create' ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowModal(false);
        fetchTabData();
        if (fetchAllData) fetchAllData(); // Refresh global app data
      } else {
        const err = await response.json();
        alert(t.saveFailed(err.error || 'Server error'));
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const getInitialFormValues = (tab) => {
    if (tab === 'schemes') {
      return {
        name: '', category_id: categories[0]?.id || '', department_id: departments[0]?.id || '',
        type: 'Central', description: '', benefits: '', eligibility_criteria: '',
        min_age: 0, max_age: 120, gender_restriction: 'All', min_income: 0, max_income: 99999999,
        is_student_only: 0, is_farmer_only: 0, is_senior_only: 0, is_disabled_only: 0,
        required_documents: '', application_process: '', official_website: '', contact_details: '',
        financial_assistance_amount: 0, processing_time: ''
      };
    }
    if (tab === 'services') {
      return {
        name: '', category_id: categories[0]?.id || '', department_id: departments[0]?.id || '',
        type: 'National', description: '', website_url: '', required_documents: '', process_overview: ''
      };
    }
    if (tab === 'departments') {
      return { name: '', code: '', description: '', official_url: '' };
    }
    if (tab === 'categories') {
      return { name: '', description: '', icon_name: 'BookOpen' };
    }
    if (tab === 'grievances') {
      return { category_name: '', recommended_department_id: departments[0]?.id || '', draft_template: '', official_portal_url: '', required_documents: '' };
    }
    if (tab === 'documents') {
      return { document_name: '', description: '', issuing_authority: '', eligibility_criteria: '', processing_time: '', application_steps: '' };
    }
    return {};
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-8 bg-gov-blue rounded-full"></span>
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.subtitle}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-gov-blue hover:bg-gov-navy text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4.5 h-4.5" /> {t.addNewRecord}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-5 border-b-2 text-xs font-bold transition duration-150 ${
                activeTab === tab.id
                  ? 'border-gov-blue text-gov-blue dark:text-blue-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Table Display */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" /> {t.fetchingRecords}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4 w-16">{t.idCol}</th>
                  <th className="p-4">{t.primaryIdentifierCol}</th>
                  <th className="p-4">{t.secondaryDetailsCol}</th>
                  <th className="p-4 w-28 text-center">{t.actionsCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {listData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4 font-semibold text-slate-400">{item.id}</td>
                    
                    {/* Primary Identifier */}
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      {item.name || item.document_name || item.category_name}
                    </td>

                    {/* Secondary details context */}
                    <td className="p-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                      {activeTab === 'schemes' && `${item.type === 'Central' ? (bilingual === 'EN' ? 'Central' : 'కేంద్ర') : (bilingual === 'EN' ? 'State' : 'రాష్ట్ర')} Scheme &bull; ${item.category_name}`}
                      {activeTab === 'services' && `${item.type === 'National' ? (bilingual === 'EN' ? 'National' : 'జాతీయ') : (bilingual === 'EN' ? 'State' : 'రాష్ట్ర')} Service &bull; ${item.department_name}`}
                      {activeTab === 'departments' && `Code: ${item.code} &bull; ${item.official_url}`}
                      {activeTab === 'categories' && item.description}
                      {activeTab === 'grievances' && `Department: ${item.department_name}`}
                      {activeTab === 'documents' && `Authority: ${item.issuing_authority}`}
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-300"
                        title="Edit Record"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg text-rose-500"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {listData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-slate-400">
                      {t.noRecords}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CRUD FORM MODAL DIALOG */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {modalMode === 'create' 
                  ? t.createNewTitle(t.tabLabels[activeTab]) 
                  : t.editTitle(t.tabLabels[activeTab])
                }
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
              {activeTab === 'schemes' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.schemeName}</label>
                    <input type="text" name="name" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.name || ''} onChange={handleFormChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.category}</label>
                      <select name="category_id" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.category_id || ''} onChange={handleFormChange}>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.department}</label>
                      <select name="department_id" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.department_id || ''} onChange={handleFormChange}>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.jurisdictionType}</label>
                      <select name="type" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.type || 'Central'} onChange={handleFormChange}>
                        <option value="Central">{t.formLabels.centralNational}</option>
                        <option value="State">{t.formLabels.stateAP}</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.financialAid}</label>
                      <input type="number" name="financial_assistance_amount" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.financial_assistance_amount || 0} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.description}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('description', t.formLabels.description)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="description" rows="3" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.description || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.welfareBenefits}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('benefits', t.formLabels.welfareBenefits)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="benefits" rows="2" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.benefits || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.eligibilityCriteria}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('eligibility_criteria', t.formLabels.eligibilityCriteria)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="eligibility_criteria" rows="2" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.eligibility_criteria || ''} onChange={handleFormChange} />
                  </div>

                  {/* Constraint values */}
                  <div className="grid grid-cols-4 gap-2 border p-3 rounded-xl bg-slate-50/50 dark:bg-slate-850">
                    <div className="space-y-1">
                      <label className="font-semibold block text-[10px] text-slate-400">{t.formLabels.minAge}</label>
                      <input type="number" name="min_age" className="w-full p-2 border rounded" value={formData.min_age || 0} onChange={handleFormChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold block text-[10px] text-slate-400">{t.formLabels.maxAge}</label>
                      <input type="number" name="max_age" className="w-full p-2 border rounded" value={formData.max_age || 120} onChange={handleFormChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold block text-[10px] text-slate-400">{t.formLabels.maxIncome}</label>
                      <input type="number" name="max_income" className="w-full p-2 border rounded" value={formData.max_income || 99999999} onChange={handleFormChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold block text-[10px] text-slate-400">{t.formLabels.genderReq}</label>
                      <select name="gender_restriction" className="w-full p-2 border rounded bg-white dark:bg-slate-800" value={formData.gender_restriction || 'All'} onChange={handleFormChange}>
                        <option value="All">{t.formLabels.all}</option>
                        <option value="Male">{t.formLabels.male}</option>
                        <option value="Female">{t.formLabels.female}</option>
                      </select>
                    </div>
                  </div>

                  {/* Criteria check flags */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="is_student_only" checked={formData.is_student_only === 1} onChange={handleFormChange} />
                      <span>{t.formLabels.studentOnly}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="is_farmer_only" checked={formData.is_farmer_only === 1} onChange={handleFormChange} />
                      <span>{t.formLabels.farmerOnly}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="is_senior_only" checked={formData.is_senior_only === 1} onChange={handleFormChange} />
                      <span>{t.formLabels.seniorOnly}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="is_disabled_only" checked={formData.is_disabled_only === 1} onChange={handleFormChange} />
                      <span>{t.formLabels.disabledOnly}</span>
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.requiredDocs}</label>
                    <input type="text" name="required_documents" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.required_documents || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.officialWebsiteUrl}</label>
                    <input type="text" name="official_website" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.official_website || ''} onChange={handleFormChange} />
                  </div>
                </>
              )}

              {activeTab === 'services' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.serviceName}</label>
                    <input type="text" name="name" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.name || ''} onChange={handleFormChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.category}</label>
                      <select name="category_id" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.category_id || ''} onChange={handleFormChange}>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.department}</label>
                      <select name="department_id" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.department_id || ''} onChange={handleFormChange}>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.jurisdictionType}</label>
                      <select name="type" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.type || 'National'} onChange={handleFormChange}>
                        <option value="National">{t.formLabels.nationalCentral}</option>
                        <option value="State">{t.formLabels.stateMeeSeva}</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.portalWebsiteUrl}</label>
                      <input type="text" name="website_url" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.website_url || ''} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.description}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('description', t.formLabels.description)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="description" rows="3" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.description || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.requiredDocuments}</label>
                    <input type="text" name="required_documents" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.required_documents || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.processOverviewSteps}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('process_overview', t.formLabels.processOverviewSteps)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="process_overview" rows="3" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.process_overview || ''} onChange={handleFormChange} />
                  </div>
                </>
              )}

              {activeTab === 'departments' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.departmentName}</label>
                    <input type="text" name="name" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.name || ''} onChange={handleFormChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.departmentCode}</label>
                      <input type="text" name="code" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.code || ''} onChange={handleFormChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.officialPortalUrl}</label>
                      <input type="text" name="official_url" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.official_url || ''} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.description}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('description', t.formLabels.description)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="description" rows="3" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.description || ''} onChange={handleFormChange} />
                  </div>
                </>
              )}

              {activeTab === 'categories' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.categoryName}</label>
                    <input type="text" name="name" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.name || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.lucideIconName}</label>
                    <input type="text" name="icon_name" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.icon_name || 'BookOpen'} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.description}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('description', t.formLabels.description)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="description" rows="3" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.description || ''} onChange={handleFormChange} />
                  </div>
                </>
              )}

              {activeTab === 'grievances' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.complaintCategoryName}</label>
                    <input type="text" name="category_name" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.category_name || ''} onChange={handleFormChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.recommendedDepartment}</label>
                      <select name="recommended_department_id" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.recommended_department_id || ''} onChange={handleFormChange}>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.officialRedirectionPortalUrl}</label>
                      <input type="text" name="official_portal_url" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.official_portal_url || ''} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.proofDocumentsRequired}</label>
                    <input type="text" name="required_documents" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.required_documents || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.complaintLetterDraftTemplate}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('draft_template', t.formLabels.complaintLetterDraftTemplate)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="draft_template" rows="5" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl font-mono text-[11px]" value={formData.draft_template || ''} onChange={handleFormChange} />
                  </div>
                </>
              )}

              {activeTab === 'documents' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.documentName}</label>
                    <input type="text" name="document_name" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.document_name || ''} onChange={handleFormChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.issuingAuthority}</label>
                      <input type="text" name="issuing_authority" required className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.issuing_authority || ''} onChange={handleFormChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.processingTimeSla}</label>
                      <input type="text" name="processing_time" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.processing_time || ''} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.description}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('description', t.formLabels.description)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="description" rows="2" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.description || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.eligibilityCriteria}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('eligibility_criteria', t.formLabels.eligibilityCriteria)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="eligibility_criteria" rows="2" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.eligibility_criteria || ''} onChange={handleFormChange} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">{t.formLabels.stepByStepApplicationSteps}</label>
                      {startListening && (
                        <button type="button" onClick={() => handleDictate('application_steps', t.formLabels.stepByStepApplicationSteps)} className="text-[10px] text-gov-blue hover:text-gov-navy dark:text-blue-400 flex items-center gap-1 font-bold">
                          <Mic className="w-3 h-3 text-red-500 animate-pulse" /> {bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}
                        </button>
                      )}
                    </div>
                    <textarea name="application_steps" rows="4" className="w-full bg-slate-50 dark:bg-slate-800 border p-3 rounded-xl focus:outline-none" value={formData.application_steps || ''} onChange={handleFormChange} />
                  </div>
                </>
              )}

              {/* Modal footer */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 text-xs sm:text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl transition"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-gov-blue hover:bg-gov-navy text-white px-5 py-2.5 rounded-xl transition shadow-sm"
                >
                  {t.saveRecord}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
