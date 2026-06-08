import React, { useState, useEffect } from 'react';
import { API_BASE } from '../utils/api';
import { Search, FolderOpen, Calendar, Clock, Landmark, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function Documents({ bilingual }) {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Translations dictionary
  const t = {
    title: bilingual === 'EN' ? 'Document Requirement Center' : 'పత్రాల నిధి & అర్హత నిబంధనలు',
    subtitle: bilingual === 'EN' ? 'Search document specifications, processing timelines, issuing departments, and detailed application steps.' : 'పత్రాల వివరాలు, ప్రాసెసింగ్ సమయాలు, జారీ చేసే విభాగాలు మరియు దరఖాస్తు విధానాలను శోధించండి.',
    searchPlaceholder: bilingual === 'EN' ? 'Search document name, authority, or eligibility...' : 'పత్రం పేరు, అధికార జారీ సంస్థ లేదా అర్హతలతో శోధించండి...',
    authority: bilingual === 'EN' ? 'Authority:' : 'జారీ సంస్థ:',
    time: bilingual === 'EN' ? 'Time:' : 'సమయం:',
    days: (d) => bilingual === 'EN' ? `${d} days` : `${d} రోజులు`,
    defaultTime: bilingual === 'EN' ? '7 days' : '7 రోజులు',
    description: bilingual === 'EN' ? 'Description' : 'వివరణ',
    defaultDesc: (name) => bilingual === 'EN'
      ? `Official government issued certificate validating ${name.toLowerCase()} for eligibility across central and state welfare programs.`
      : `కేంద్ర మరియు రాష్ట్ర సంక్షేమ పథకాలకు అర్హతను ధృవీకరించడానికి ప్రభుత్వం జారీ చేసే అధికారిక ${name} పత్రం.`,
    eligibilityReqs: bilingual === 'EN' ? 'Eligibility Requirements' : 'అర్హత ప్రమాణాలు',
    defaultEligibility: bilingual === 'EN' ? 'Indian citizen residing in the state of Andhra Pradesh with valid identity proof.' : 'చెల్లుబాటు అయ్యే గుర్తింపు కార్డు కలిగి ఉండి ఆంధ్రప్రదేశ్‌లో నివసిస్తున్న భారతీయ పౌరుడు.',
    processingSla: bilingual === 'EN' ? 'Processing SLA' : 'ప్రాసెసింగ్ సమయం (SLA)',
    slaText: (time) => bilingual === 'EN'
      ? `This document is officially scheduled to be issued within ${time || '7 days'} of submission, subject to verification.`
      : `ఈ పత్రం ధృవీకరణకు లోబడి, సమర్పించిన తేదీ నుండి ${time || '7 రోజులు'} లోపు జారీ చేయడానికి అధికారికంగా షెడ్యూల్ చేయబడింది.`,
    appGuide: bilingual === 'EN' ? 'Application Step-by-Step Guide' : 'దరఖాస్తు విధానం దశలవారీ మార్గదర్శి',
    noDocs: bilingual === 'EN' ? 'No documents found matching your search term.' : 'మీ శోధనకు సరిపోయే పత్రాలు ఏవీ కనుగొనబడలేదు.',
    resetSearch: bilingual === 'EN' ? 'Reset Search' : 'శోధనను రీసెట్ చేయి',
    step1: bilingual === 'EN' ? 'Visit the nearest Gram/Ward Sachivalayam or MeeSeva Center.' : 'సమీపంలోని గ్రామ/వార్డు సచివాలయం లేదా మీసేవ కేంద్రాన్ని సందర్శించండి.',
    step2: bilingual === 'EN' ? 'Fill out the prescribed physical application form with correct details.' : 'సూచించిన దరఖాస్తు ఫారమ్‌ను సరైన వివరాలతో పూరించండి.',
    step3: bilingual === 'EN' ? 'Attach copy of Aadhaar Card and address proof.' : 'ఆధార్ కార్డ్ మరియు చిరునామా ధృవీకరణ పత్రం యొక్క నకలును జత చేయండి.',
    step4: bilingual === 'EN' ? 'Submit to the secretariat assistant and collect the biometric/signed acknowledgment receipt.' : 'సచివాలయ సహాయకుడికి సమర్పించి బయోమెట్రిక్/సంతకం చేసిన రసీదును పొందండి.',
    step5: bilingual === 'EN' ? 'Track application status online and download the digitally signed certificate when approved.' : 'దరఖాస్తు స్థితిని ఆన్‌లైన్‌లో ట్రాక్ చేయండి మరియు ఆమోదించబడిన తర్వాత డిజిటల్ సంతకం చేసిన సర్టిఫికెట్‌ను డౌన్‌లోడ్ చేసుకోండి.'
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/documents`)
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
        if (data.length > 0) {
          // Expand first document by default
          setExpandedId(data[0].id);
        }
      })
      .catch(err => console.error('Error fetching documents', err));
  }, []);

  const filteredDocs = documents.filter(doc => {
    const searchLower = searchTerm.toLowerCase();
    return !searchTerm ||
      doc.document_name.toLowerCase().includes(searchLower) ||
      doc.issuing_authority.toLowerCase().includes(searchLower) ||
      doc.description.toLowerCase().includes(searchLower);
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent focus:outline-none p-3 text-sm text-slate-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => {
          const isExpanded = expandedId === doc.id;
          return (
            <div
              key={doc.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition duration-150 hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Header tab */}
              <button
                onClick={() => toggleExpand(doc.id)}
                className="w-full p-6 text-left flex justify-between items-center bg-slate-50/20 dark:bg-slate-800/10 focus:outline-none"
              >
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {doc.document_name}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5 text-gov-blue" />
                      {t.authority} {doc.issuing_authority}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gov-blue" />
                      {t.time} {doc.processing_time || t.defaultTime}
                    </span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {/* Collapsible content */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 animate-fadeIn">
                  {/* Summary */}
                  <div className="space-y-1">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">{t.description}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {doc.description || t.defaultDesc(doc.document_name)}
                    </p>
                  </div>

                  {/* Details block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-bold text-gov-blue dark:text-blue-400 tracking-wider flex items-center gap-1">
                        <FolderOpen className="w-4 h-4" /> {t.eligibilityReqs}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        {doc.eligibility_criteria || t.defaultEligibility}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-bold text-gov-blue dark:text-blue-400 tracking-wider flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {t.processingSla}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        {t.slaText(doc.processing_time)}
                      </p>
                    </div>
                  </div>

                  {/* Application steps */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-gov-blue" />
                      {t.appGuide}
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-800/35 p-5 rounded-xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
                      {doc.application_steps ? (
                        <div className="space-y-2 whitespace-pre-wrap font-sans">
                          {doc.application_steps}
                        </div>
                      ) : (
                        <ol className="list-decimal pl-4 space-y-2">
                          <li>{t.step1}</li>
                          <li>{t.step2}</li>
                          <li>{t.step3}</li>
                          <li>{t.step4}</li>
                          <li>{t.step5}</li>
                        </ol>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredDocs.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center rounded-2xl">
            <p className="text-slate-400 text-sm">{t.noDocs}</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-bold text-gov-blue mt-4 hover:underline"
            >
              {t.resetSearch}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
