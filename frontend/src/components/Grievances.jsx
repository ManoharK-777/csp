import React, { useState, useEffect } from 'react';
import { API_BASE } from '../utils/api';
import { FileText, HelpCircle, Clipboard, Printer, ExternalLink, RefreshCw, Send, AlertTriangle, ShieldCheck, Mic, Mail } from 'lucide-react';

export default function Grievances({ bilingual, startListening }) {
  const [categories, setCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState('');
  
  // Form fields
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [citizenAadhaar, setCitizenAadhaar] = useState('');
  const [citizenLocality, setCitizenLocality] = useState('');
  const [citizenWard, setCitizenWard] = useState('');
  const [citizenDistrict, setCitizenDistrict] = useState('');
  const [complaintDetails, setComplaintDetails] = useState('');
  const [consumerId, setConsumerId] = useState('');

  const [draftResult, setDraftResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Translations dictionary
  const t = {
    title: bilingual === 'EN' ? 'Grievance Guidance & Complaint Draft Assistant' : 'గ్రీవెన్స్ మార్గదర్శకత్వం & ఫిర్యాదు డ్రాఫ్ట్ అసిస్టెంట్',
    subtitle: bilingual === 'EN' ? 'Draft professional letters for civic issues, identify the administrative department, and find official complaint portals.' : 'పౌర సమస్యల కొరకు వృత్తిపరమైన లేఖలను రూపొందించండి, పరిపాలనా విభాగాన్ని గుర్తించండి మరియు అధికారిక ఫిర్యాదు పోర్టల్‌లను కనుగొనండి.',
    privacyWarning: bilingual === 'EN' ? 'Citizen Privacy Warning:' : 'పౌరుల గోప్యత హెచ్చరిక:',
    privacyText: bilingual === 'EN' ? 'This system does NOT auto-submit complaints or collect your credentials. Drafts are generated locally. Copy or print your completed draft to submit on the recommended official portals.' : 'ఈ సిస్టమ్ స్వయంచాలకంగా ఫిర్యాదులను సమర్పించదు లేదా మీ ఆధారాలను సేకరించదు. డ్రాఫ్ట్‌లు స్థానికంగా సృష్టించబడతాయి. సిఫార్సు చేయబడిన అధికారిక పోర్టల్‌లలో సమర్పించడానికి మీ పూర్తి డ్రాఫ్ట్‌ను కాపీ లేదా ప్రింట్ చేయండి.',
    formTitle: bilingual === 'EN' ? 'Complaint Formulation Form' : 'ఫిర్యాదు రూపకల్పన ఫారమ్',
    complaintCategory: bilingual === 'EN' ? 'Complaint Category' : 'ఫిర్యాదు వర్గం',
    selectCategoryPlaceholder: bilingual === 'EN' ? 'Select Category (e.g. Roads, Sanitation)...' : 'వర్గాన్ని ఎంచుకోండి (ఉదా. రోడ్లు, పారిశుధ్యం)...',
    recommendedDept: bilingual === 'EN' ? 'Recommended Department:' : 'సిఫార్సు చేయబడిన విభాగం:',
    requiredProofDocs: bilingual === 'EN' ? 'Required Proof Documents:' : 'అవసరమైన సాక్ష్య పత్రాలు:',
    defaultProofDocs: bilingual === 'EN' ? 'Complaint Statement, Location Details, Supporting Photographs.' : 'ఫిర్యాదు పత్రం, స్థలం వివరాలు, సహాయక ఛాయాచిత్రాలు.',
    citizenName: bilingual === 'EN' ? 'Citizen Full Name' : 'పౌరుడి పూర్తి పేరు',
    enterNamePlaceholder: bilingual === 'EN' ? 'Enter name' : 'పేరు నమోదు చేయండి',
    mobileNumber: bilingual === 'EN' ? 'Mobile Phone Number' : 'మొబైల్ ఫోన్ నంబర్',
    enterMobilePlaceholder: bilingual === 'EN' ? 'Enter mobile number' : 'మొబైల్ నంబర్ నమోదు చేయండి',
    aadhaarNumber: bilingual === 'EN' ? 'Aadhaar Card Number (12 digit)' : 'ఆధార్ కార్డ్ నంబర్ (12 అంకెలు)',
    enterAadhaarPlaceholder: bilingual === 'EN' ? 'Enter Aadhaar (optional)' : 'ఆధార్ నమోదు చేయండి (ఐచ్ఛికం)',
    consumerId: bilingual === 'EN' ? 'Consumer ID / Service ID (optional)' : 'వినియోగదారు ID / సర్వీస్ ID (ఐచ్ఛికం)',
    consumerIdPlaceholder: bilingual === 'EN' ? 'e.g. meter no, pension ID' : 'ఉదా. మీటర్ నంబర్, పెన్షన్ ID',
    villageTown: bilingual === 'EN' ? 'Village/Town' : 'గ్రామం/పట్టణం',
    wardSecretariat: bilingual === 'EN' ? 'Secretariat/Ward' : 'సచివాలయం/వార్డు',
    district: bilingual === 'EN' ? 'District' : 'జిల్లా',
    problemDescription: bilingual === 'EN' ? 'Problem Description / Incident Details' : 'సమస్య వివరణ / సంఘటన వివరాలు',
    problemPlaceholder: bilingual === 'EN' ? 'Explain the issue clearly (e.g. Garbage has not been collected in our ward since 6 days...)' : 'సమస్యను స్పష్టంగా వివరించండి (ఉదా. మా వార్డులో 6 రోజుల నుండి చెత్తను సేకరించలేదు...)',
    generateBtn: bilingual === 'EN' ? 'Generate Complaint Letter Draft' : 'ఫిర్యాదు లేఖ డ్రాఫ్ట్‌ను రూపొందించు',
    loadingText: bilingual === 'EN' ? 'Generating...' : 'రూపొందిస్తోంది...',
    draftTitle: bilingual === 'EN' ? 'Drafted Complaint Letter' : 'రూపొందించబడిన ఫిర్యాదు లేఖ',
    copiedText: bilingual === 'EN' ? 'Copied to clipboard!' : 'క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!',
    submitInstruction: bilingual === 'EN' ? 'Submit this draft on the official portal below.' : 'ఈ డ్రాఫ్ట్‌ను క్రింది అధికారిక పోర్టల్‌లో సమర్పించండి.',
    openPortalBtn: bilingual === 'EN' ? 'Open Grievance Portal' : 'గ్రీవెన్స్ పోర్టల్ తెరువు',
    instructionsTitle: bilingual === 'EN' ? 'Step-by-Step Submission Process Guide:' : 'ఫిర్యాదును సమర్పించే విధానం:',
    instructionsStep1: bilingual === 'EN' ? 'Copy Draft: Click the Copy button (Clipboard icon) above to copy this letter.' : 'డ్రాఫ్ట్‌ను కాపీ చేయండి: ఈ లేఖను కాపీ చేయడానికి పైన ఉన్న కాపీ బటన్ (క్లిప్‌బోర్డ్ ఐకాన్) క్లిక్ చేయండి.',
    instructionsStep2: bilingual === 'EN' ? 'Open Portal: Click "Open Grievance Portal" below to go to the secure government page.' : 'పోర్టల్ తెరవండి: నేరుగా అధికారిక ప్రభుత్వ పేజీకి వెళ్ళడానికి క్రింది "గ్రీవెన్స్ పోర్టల్ తెరువు" క్లిక్ చేయండి.',
    instructionsStep3: bilingual === 'EN' ? 'Secure Login: Log in using your Aadhaar card OTP or Mobile number.' : 'లాగిన్ అవ్వండి: మీ ఆధార్ OTP లేదా మొబైల్ నంబర్ ఉపయోగించి లాగిన్ అవ్వండి.',
    instructionsStep4: bilingual === 'EN' ? 'Paste & Submit: Paste the draft into the description field, upload documents (if any), and submit.' : 'సమర్పించండి: కాపీ చేసిన డ్రాఫ్ట్‌ను వివరణ పెట్టెలో పేస్ట్ చేసి, అవసరమైన పత్రాలను అప్‌లోడ్ చేసి సమర్పించండి.',
    noDraftTitle: bilingual === 'EN' ? 'No Draft Generated' : 'ఎటువంటి డ్రాఫ్ట్ రూపొందించబడలేదు',
    noDraftSubtitle: bilingual === 'EN' ? 'Fill out the required citizen details on the left form panel and click "Generate Complaint Letter Draft" to render a formal, printable letter.' : 'ఎడమ ఫారమ్ ప్యానెల్‌లో అవసరమైన పౌరుల వివరాలను పూరించి, అధికారిక, ముద్రించదగిన లేఖను రూపొందించడానికి "ఫిర్యాదు లేఖ డ్రాఫ్ట్‌ను రూపొందించు" క్లిక్ చేయండి.',
    categoriesList: {
      'Electricity': 'విద్యుత్',
      'Water Supply': 'నీటి సరఫరా',
      'Roads': 'రోడ్లు',
      'Sanitation': 'పారిశుధ్యం',
      'Pension': 'పింఛన్',
      'Scholarship': 'స్కాలర్‌షిప్',
      'Agriculture': 'వ్యవసాయం',
      'Healthcare': 'ఆరోగ్య సంరక్షణ',
      'Banking': 'బ్యాంకింగ్',
      'Public Services': 'పౌర సేవలు',
      'Revenue Issues': 'రెవెన్యూ సమస్యలు',
      'Welfare Scheme Issues': 'సంక్షేమ పథకాల సమస్యలు'
    },
    departmentsList: {
      'Municipal Administration and Urban Development Department': 'మున్సిపల్ అడ్మినిస్ట్రేషన్ & పట్టణాభివృద్ధి శాఖ',
      'Panchayat Raj and Rural Development Department': 'పంచాయతీ రాజ్ & గ్రామీణాభివృద్ధి శాఖ',
      'School Education Department': 'పాఠశాల విద్యా శాఖ',
      'Agriculture and Cooperation Department': 'వ్యవసాయ & సహకార శాఖ',
      'Health, Medical and Family Welfare Department': 'ఆరోగ్య, వైద్య & కుటుంబ సంక్షేమ శాఖ',
      'Finance Department': 'ఆర్థిక శాఖ',
      'Revenue Department': 'రెవెన్యూ శాఖ'
    }
  };

  // Fetch grievance categories on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/grievances`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching grievances', err));
  }, []);

  const handleGenerateDraft = async (e) => {
    e.preventDefault();
    if (!selectedCatId) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/grievances/draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: parseInt(selectedCatId),
          citizenName,
          citizenPhone,
          citizenAadhaar,
          citizenLocality,
          citizenWard,
          citizenDistrict,
          complaintDetails,
          consumerId
        })
      });

      if (response.ok) {
        const data = await response.json();
        setDraftResult(data);
      } else {
        console.error('Failed to generate draft');
      }
    } catch (error) {
      console.error('Error generating grievance draft', error);
    } finally {
      setLoading(false);
    }
  };

  const getTeluguDraftText = (catName, deptName) => {
    const teluguCat = t.categoriesList[catName] || catName;
    const teluguDept = t.departmentsList[deptName] || deptName;

    return `గౌరవనీయులైన కమిషనర్ / పబ్లిక్ రిలేషన్స్ ఆఫీసర్ గారికి,
${teluguDept},
ఆంధ్రప్రదేశ్ / భారత ప్రభుత్వం.

విషయం: మా స్థానిక ప్రాంతంలో ${teluguCat} సమస్యపై ఫిర్యాదు

గౌరవనీయులైన అయ్యా/అమ్మా,

మా నివాస ప్రాంతంలో ${teluguCat} సేవలకు సంబంధించిన ఒక తీవ్రమైన సమస్యను మీ దృష్టికి తీసుకురావడానికి నేను ఈ లేఖ రాస్తున్నాను. ఈ సమస్య గత కొన్ని రోజులుగా పరిష్కరించబడలేదు, దీనివల్ల స్థానిక నివాసితులు చాలా ఇబ్బందులు పడుతున్నారు.

ముఖ్యంగా: ${complaintDetails || '__________________________________________________________________'}

స్థలం వివరాలు:
గ్రామం/పట్టణం: ${citizenLocality || '__________________'}
సచివాలయం/వార్డు: ${citizenWard || '__________________'}
జిల్లా: ${citizenDistrict || '__________________'}
వినియోగదారు ID / ఖాతా ID (వర్తిస్తే): ${consumerId || 'N/A'}

దయచేసి ఈ సమస్యను వీలైనంత త్వరగా పరిశీలించి పరిష్కరించాల్సిందిగా సంబంధిత సిబ్బందిని ఆదేశించవలసిందిగా కోరుతున్నాను. మీ పరిశీలన కొరకు అవసరమైన పత్రాలు మరియు ఛాయాచిత్రాలను జత చేసాను.

ధన్యవాదములు.

భవదీయుడు/భవదీయురాలూ,
పేరు: ${citizenName || '__________________'}
మొబైల్ నంబర్: ${citizenPhone || '__________________'}
ఆధార్ నంబర్: ${citizenAadhaar || '__________________'}`;
  };

  const displayDraftText = (bilingual === 'TE' && draftResult)
    ? getTeluguDraftText(draftResult.categoryName, draftResult.recommendedDepartment)
    : (draftResult ? draftResult.draftText : '');

  const handleCopy = () => {
    if (displayDraftText) {
      navigator.clipboard.writeText(displayDraftText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrintDraft = () => {
    if (displayDraftText) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>${bilingual === 'EN' ? 'Official Complaint Draft' : 'అధికారిక ఫిర్యాదు లేఖ ప్రతులు'}</title>
            <style>
              body { font-family: monospace; white-space: pre-wrap; padding: 40px; line-height: 1.5; font-size: 14px; }
              @media print { body { padding: 0; } }
            </style>
          </head>
          <body>${displayDraftText}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getMailSubject = () => {
    if (!draftResult) return 'Grievance Complaint';
    const cat = bilingual === 'TE' 
      ? (t.categoriesList[draftResult.categoryName] || draftResult.categoryName)
      : draftResult.categoryName;
    const location = citizenLocality || '';
    return bilingual === 'TE'
      ? `గ్రీవెన్స్: ${cat} - ${location}`
      : `Grievance regarding ${cat} - ${location}`;
  };

  const handleSendGmail = () => {
    if (displayDraftText) {
      const subject = getMailSubject();
      const body = displayDraftText;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank');
    }
  };

  const selectedCategoryData = categories.find(c => c.id === parseInt(selectedCatId));

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-8 bg-gov-blue rounded-full"></span>
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* Safety alert message */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 text-gov-blue dark:text-blue-300 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-xs flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 flex-shrink-0 text-gov-blue" />
        <span><strong>{t.privacyWarning}</strong> {t.privacyText}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-white text-base pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gov-blue" />
            {t.formTitle}
          </h2>

          <form onSubmit={handleGenerateDraft} className="space-y-4 text-xs sm:text-sm">
            {/* Category selection */}
            <div className="space-y-1">
              <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.complaintCategory}</label>
              <select
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                required
                value={selectedCatId}
                onChange={(e) => { setSelectedCatId(e.target.value); setDraftResult(null); }}
              >
                <option value="">{t.selectCategoryPlaceholder}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {bilingual === 'TE' ? (t.categoriesList[c.category_name] || c.category_name) : c.category_name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategoryData && (
              <div className="bg-gov-lightBlue dark:bg-slate-800/40 p-4 rounded-xl space-y-2 text-xs border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">{t.recommendedDept}</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    {bilingual === 'TE' ? (t.departmentsList[selectedCategoryData.department_name] || selectedCategoryData.department_name) : selectedCategoryData.department_name}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">{t.requiredProofDocs}</span>
                  <span className="text-slate-600 dark:text-slate-400 font-light">
                    {selectedCategoryData.required_documents || t.defaultProofDocs}
                  </span>
                </div>
              </div>
            )}

            {/* Sub-inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.citizenName}</label>
                <input
                  type="text"
                  placeholder={t.enterNamePlaceholder}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.mobileNumber}</label>
                <input
                  type="tel"
                  placeholder={t.enterMobilePlaceholder}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.aadhaarNumber}</label>
                <input
                  type="text"
                  maxLength="12"
                  placeholder={t.enterAadhaarPlaceholder}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                  value={citizenAadhaar}
                  onChange={(e) => setCitizenAadhaar(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.consumerId}</label>
                <input
                  type="text"
                  placeholder={t.consumerIdPlaceholder}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                  value={consumerId}
                  onChange={(e) => setConsumerId(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.villageTown}</label>
                <input
                  type="text"
                  placeholder={t.villageTown}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                  value={citizenLocality}
                  onChange={(e) => setCitizenLocality(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.wardSecretariat}</label>
                <input
                  type="text"
                  placeholder={t.wardSecretariat}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 rounded-xl p-2.5 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                  value={citizenWard}
                  onChange={(e) => setCitizenWard(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.district}</label>
                <input
                  type="text"
                  placeholder={t.district}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 rounded-xl p-2.5 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                  value={citizenDistrict}
                  onChange={(e) => setCitizenDistrict(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.problemDescription}</label>
                {startListening && (
                  <button
                    type="button"
                    onClick={() => startListening(bilingual === 'EN' ? 'Problem Details' : 'సమస్య వివరాలు', (text) => {
                      setComplaintDetails(prev => prev ? (prev.trim() + ' ' + text) : text);
                    })}
                    className="inline-flex items-center gap-1.5 text-xs text-gov-blue hover:text-gov-navy dark:text-blue-400 dark:hover:text-blue-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg transition"
                    title={bilingual === 'EN' ? 'Voice input' : 'వాయిస్ ఇన్పుట్'}
                  >
                    <Mic className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span className="font-bold">{bilingual === 'EN' ? 'Dictate' : 'మాట్లాడండి'}</span>
                  </button>
                )}
              </div>
              <textarea
                rows="4"
                placeholder={t.problemPlaceholder}
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                value={complaintDetails}
                onChange={(e) => setComplaintDetails(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !selectedCatId}
              className="w-full bg-gov-blue hover:bg-gov-navy disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition duration-150 flex items-center justify-center gap-1.5"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {t.generateBtn}
            </button>
          </form>
        </div>

        {/* Output panel */}
        <div className="flex flex-col h-full min-h-[400px]">
          {draftResult ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col flex-1 justify-between animate-fadeIn">
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-slate-950 dark:text-white text-base">
                    {t.draftTitle}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSendGmail}
                      className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-300 transition flex items-center gap-1.5"
                      title={bilingual === 'EN' ? 'Send via Gmail' : 'జిమెయిల్ ద్వారా పంపండి'}
                    >
                      <Mail className="w-4 h-4 text-rose-500" />
                      <span className="text-[11px] font-semibold hidden sm:inline">{bilingual === 'EN' ? 'Gmail' : 'జిమెయిల్'}</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-300 transition"
                      title="Copy to clipboard"
                    >
                      <Clipboard className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handlePrintDraft}
                      className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-300 transition"
                      title="Print letter"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {copied && (
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-lg self-end animate-fadeIn">
                    {t.copiedText}
                  </span>
                )}

                {/* Text box with draft */}
                <textarea
                  className="flex-1 w-full bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-mono leading-relaxed text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-0 resize-none h-[250px] sm:h-auto"
                  readOnly
                  value={displayDraftText}
                />

                {/* Step-by-step submission instructions */}
                <div className="mt-4 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl text-xs space-y-2">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    {t.instructionsTitle}
                  </h4>
                  <ul className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400 font-light">
                    <li>{t.instructionsStep1}</li>
                    <li>{t.instructionsStep2}</li>
                    <li>{t.instructionsStep3}</li>
                    <li>{t.instructionsStep4}</li>
                  </ul>
                </div>
              </div>

              {/* Redirection Links */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-semibold">
                <div className="text-slate-500">
                  {t.submitInstruction}
                </div>
                {draftResult.officialPortalUrl && (
                  <a
                    href={draftResult.officialPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gov-blue hover:bg-gov-navy text-white py-2.5 px-5 rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    {t.openPortalBtn} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-100/40 dark:bg-slate-900/30 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center flex-1 min-h-[300px]">
              <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                {t.noDraftTitle}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
                {t.noDraftSubtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
