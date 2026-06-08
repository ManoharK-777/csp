import React, { useState, useRef } from 'react';
import { Search, ExternalLink, ChevronDown, ChevronUp, Landmark, FileText, ClipboardList, CheckCircle2 } from 'lucide-react';

export default function Services({ bilingual, services, categories, departments }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const hoverTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Unified helper for low-brightness pastel theme mapping
  const getServiceTheme = (srv) => {
    if (!srv) {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-955 dark:text-blue-100',
        descText: 'text-blue-800/80 dark:text-blue-300/80',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-800 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-700 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-800 dark:bg-blue-800/60 dark:text-blue-200',
        hoverStyle: 'hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10',
        
        modalHeaderBg: 'bg-blue-50/30 dark:bg-blue-950/15',
        modalHighlightBg: 'bg-blue-50/45 dark:bg-blue-950/20',
        modalHighlightBorder: 'border-blue-100 dark:border-blue-900/50',
        modalBlockBg: 'bg-blue-50/20 dark:bg-blue-950/5',
        modalBlockBorder: 'border-blue-100/50 dark:border-blue-900/20',
        iconColor: 'text-blue-600 dark:text-blue-400',
        primaryBtn: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
      };
    }

    const cat = srv.category_name || '';
    const isNational = srv.type === 'National';

    if (cat.includes('Education')) {
      return {
        grad: 'from-violet-50/90 via-purple-50/70 to-indigo-50/85 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-indigo-950/30',
        titleText: 'text-violet-955 dark:text-violet-100',
        descText: 'text-violet-850/85 dark:text-violet-305/85',
        deptText: 'text-violet-900/70 dark:text-violet-400/70',
        badge: 'bg-violet-100/80 text-violet-750 border-violet-200/50 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-800/40',
        catText: 'text-violet-700 dark:text-violet-300 font-semibold',
        newBadge: 'bg-violet-200/80 text-violet-800 dark:bg-violet-800/60 dark:text-violet-200',
        hoverStyle: 'hover:border-violet-400 dark:hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10',
        
        modalHeaderBg: 'bg-violet-50/40 dark:bg-violet-950/15',
        modalHighlightBg: 'bg-violet-50/60 dark:bg-violet-950/20',
        modalHighlightBorder: 'border-violet-100 dark:border-violet-900/40',
        modalBlockBg: 'bg-violet-50/20 dark:bg-violet-950/5',
        modalBlockBorder: 'border-violet-100/40 dark:border-violet-900/20',
        iconColor: 'text-violet-600 dark:text-violet-450',
        primaryBtn: 'bg-violet-600 hover:bg-violet-750 dark:bg-violet-600 dark:hover:bg-violet-700'
      };
    }
    if (cat.includes('Health')) {
      return {
        grad: 'from-rose-50/90 via-pink-50/70 to-fuchsia-50/85 dark:from-rose-950/30 dark:via-pink-950/20 dark:to-fuchsia-950/30',
        titleText: 'text-rose-950 dark:text-rose-100',
        descText: 'text-rose-850/85 dark:text-rose-305/85',
        deptText: 'text-rose-900/70 dark:text-rose-400/70',
        badge: 'bg-rose-100/80 text-rose-750 border-rose-200/50 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800/40',
        catText: 'text-rose-700 dark:text-rose-300 font-semibold',
        newBadge: 'bg-rose-200/80 text-rose-800 dark:bg-rose-800/60 dark:text-rose-200',
        hoverStyle: 'hover:border-rose-400 dark:hover:border-rose-500/40 hover:shadow-lg hover:shadow-rose-500/10',
        
        modalHeaderBg: 'bg-rose-50/40 dark:bg-rose-950/15',
        modalHighlightBg: 'bg-rose-50/60 dark:bg-rose-950/20',
        modalHighlightBorder: 'border-rose-100 dark:border-rose-900/40',
        modalBlockBg: 'bg-rose-50/20 dark:bg-rose-950/5',
        modalBlockBorder: 'border-rose-100/40 dark:border-rose-900/20',
        iconColor: 'text-rose-600 dark:text-rose-400',
        primaryBtn: 'bg-rose-600 hover:bg-rose-750 dark:bg-rose-600 dark:hover:bg-rose-700'
      };
    }
    if (cat.includes('Agriculture')) {
      return {
        grad: 'from-emerald-50/90 via-teal-50/70 to-cyan-50/85 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30',
        titleText: 'text-emerald-955 dark:text-emerald-100',
        descText: 'text-emerald-850/85 dark:emerald-305/85',
        deptText: 'text-emerald-900/70 dark:text-emerald-400/70',
        badge: 'bg-emerald-100/80 text-emerald-750 border-emerald-200/50 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800/40',
        catText: 'text-emerald-700 dark:text-emerald-300 font-semibold',
        newBadge: 'bg-emerald-200/80 text-emerald-800 dark:bg-emerald-800/60 dark:text-emerald-200',
        hoverStyle: 'hover:border-emerald-400 dark:hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10',
        
        modalHeaderBg: 'bg-emerald-50/40 dark:bg-emerald-950/15',
        modalHighlightBg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
        modalHighlightBorder: 'border-emerald-100 dark:border-emerald-900/40',
        modalBlockBg: 'bg-emerald-50/20 dark:bg-emerald-950/5',
        modalBlockBorder: 'border-emerald-100/40 dark:border-emerald-900/20',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        primaryBtn: 'bg-emerald-600 hover:bg-emerald-750 dark:bg-emerald-600 dark:hover:bg-emerald-700'
      };
    }
    if (cat.includes('Citizen')) {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-955 dark:text-blue-100',
        descText: 'text-blue-850/85 dark:text-blue-305/85',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-750 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-700 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-850 dark:bg-blue-800/60 dark:text-blue-200',
        hoverStyle: 'hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10',
        
        modalHeaderBg: 'bg-blue-50/40 dark:bg-blue-950/15',
        modalHighlightBg: 'bg-blue-50/60 dark:bg-blue-950/20',
        modalHighlightBorder: 'border-blue-100 dark:border-blue-900/40',
        modalBlockBg: 'bg-blue-50/20 dark:bg-blue-950/5',
        modalBlockBorder: 'border-blue-100/40 dark:border-blue-900/20',
        iconColor: 'text-blue-600 dark:text-blue-400',
        primaryBtn: 'bg-blue-600 hover:bg-blue-750 dark:bg-blue-600 dark:hover:bg-blue-700'
      };
    }
    if (cat.includes('Employment')) {
      return {
        grad: 'from-sky-50/90 via-blue-50/70 to-indigo-50/85 dark:from-sky-950/30 dark:via-blue-950/20 dark:to-indigo-950/30',
        titleText: 'text-sky-950 dark:text-sky-100',
        descText: 'text-sky-850/85 dark:text-sky-305/85',
        deptText: 'text-sky-900/70 dark:text-sky-400/70',
        badge: 'bg-sky-100/80 text-sky-750 border-sky-200/50 dark:bg-sky-900/40 dark:text-sky-300 dark:border-sky-800/40',
        catText: 'text-sky-700 dark:text-sky-300 font-semibold',
        newBadge: 'bg-sky-200/80 text-sky-800 dark:bg-sky-800/60 dark:text-sky-200',
        hoverStyle: 'hover:border-sky-400 dark:hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10',
        
        modalHeaderBg: 'bg-sky-50/40 dark:bg-sky-950/15',
        modalHighlightBg: 'bg-sky-50/60 dark:bg-sky-950/20',
        modalHighlightBorder: 'border-sky-100 dark:border-sky-900/40',
        modalBlockBg: 'bg-sky-50/20 dark:bg-sky-950/5',
        modalBlockBorder: 'border-sky-100/40 dark:border-sky-900/20',
        iconColor: 'text-sky-600 dark:text-sky-400',
        primaryBtn: 'bg-sky-600 hover:bg-sky-750 dark:bg-sky-600 dark:hover:bg-sky-700'
      };
    }
    if (cat.includes('Banking')) {
      return {
        grad: 'from-fuchsia-50/90 via-violet-50/70 to-purple-50/85 dark:from-fuchsia-950/30 dark:via-violet-950/20 dark:to-purple-950/30',
        titleText: 'text-fuchsia-950 dark:text-fuchsia-100',
        descText: 'text-fuchsia-850/85 dark:text-fuchsia-305/85',
        deptText: 'text-fuchsia-900/70 dark:text-fuchsia-400/70',
        badge: 'bg-fuchsia-100/80 text-fuchsia-750 border-fuchsia-200/50 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:border-fuchsia-800/40',
        catText: 'text-fuchsia-700 dark:text-fuchsia-300 font-semibold',
        newBadge: 'bg-fuchsia-200/80 text-fuchsia-805 dark:bg-fuchsia-800/60 dark:text-fuchsia-200',
        hoverStyle: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-500/40 hover:shadow-lg hover:shadow-fuchsia-500/10',
        
        modalHeaderBg: 'bg-fuchsia-50/40 dark:bg-fuchsia-950/15',
        modalHighlightBg: 'bg-fuchsia-50/60 dark:bg-fuchsia-950/20',
        modalHighlightBorder: 'border-fuchsia-100 dark:border-fuchsia-900/40',
        modalBlockBg: 'bg-fuchsia-50/20 dark:bg-fuchsia-950/5',
        modalBlockBorder: 'border-fuchsia-100/40 dark:border-fuchsia-900/20',
        iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
        primaryBtn: 'bg-fuchsia-600 hover:bg-fuchsia-750 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700'
      };
    }
    if (cat.includes('Pension')) {
      return {
        grad: 'from-amber-50/90 via-orange-50/70 to-red-50/85 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-red-950/30',
        titleText: 'text-amber-955 dark:text-amber-100',
        descText: 'text-amber-800/80 dark:text-amber-305/85',
        deptText: 'text-amber-900/70 dark:text-amber-400/70',
        badge: 'bg-amber-100/80 text-amber-700 border-amber-200/50 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800/40',
        catText: 'text-amber-700 dark:text-amber-300 font-semibold',
        newBadge: 'bg-amber-200/80 text-amber-800 dark:bg-amber-800/60 dark:text-amber-200',
        hoverStyle: 'hover:border-amber-400 dark:hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10',
        
        modalHeaderBg: 'bg-amber-50/40 dark:bg-amber-950/15',
        modalHighlightBg: 'bg-amber-50/60 dark:bg-amber-950/20',
        modalHighlightBorder: 'border-amber-100 dark:border-amber-900/40',
        modalBlockBg: 'bg-amber-50/20 dark:bg-amber-950/5',
        modalBlockBorder: 'border-amber-100/40 dark:border-amber-900/20',
        iconColor: 'text-amber-600 dark:text-amber-400',
        primaryBtn: 'bg-amber-600 hover:bg-amber-750 dark:bg-amber-600 dark:hover:bg-amber-700'
      };
    }
    if (cat.includes('Utility')) {
      return {
        grad: 'from-teal-50/90 via-emerald-50/70 to-green-50/85 dark:from-teal-950/30 dark:via-emerald-950/20 dark:to-green-950/30',
        titleText: 'text-teal-950 dark:text-teal-100',
        descText: 'text-teal-800/80 dark:text-teal-305/85',
        deptText: 'text-teal-900/70 dark:text-teal-400/70',
        badge: 'bg-teal-100/80 text-teal-800 border-teal-200/50 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800/40',
        catText: 'text-teal-700 dark:text-teal-300 font-semibold',
        newBadge: 'bg-teal-200/80 text-teal-800 dark:bg-teal-800/60 dark:text-teal-200',
        hoverStyle: 'hover:border-teal-400 dark:hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10',
        
        modalHeaderBg: 'bg-teal-50/40 dark:bg-teal-950/15',
        modalHighlightBg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
        modalHighlightBorder: 'border-emerald-100 dark:border-emerald-900/40',
        modalBlockBg: 'bg-teal-50/20 dark:bg-teal-950/5',
        modalBlockBorder: 'border-teal-100/40 dark:border-teal-900/20',
        iconColor: 'text-teal-600 dark:text-teal-400',
        primaryBtn: 'bg-teal-600 hover:bg-teal-750 dark:bg-teal-600 dark:hover:bg-teal-700'
      };
    }
    if (cat.includes('Revenue')) {
      return {
        grad: 'from-slate-100 via-slate-100 to-slate-200/70 dark:from-slate-900 dark:via-slate-800/70 dark:to-slate-900/90',
        titleText: 'text-slate-955 dark:text-slate-100',
        descText: 'text-slate-700/90 dark:text-slate-305/90',
        deptText: 'text-slate-800/70 dark:text-slate-400/70',
        badge: 'bg-slate-200 text-slate-755 border-slate-300/55 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/40',
        catText: 'text-slate-750 dark:text-slate-300 font-semibold',
        newBadge: 'bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
        hoverStyle: 'hover:border-slate-400 dark:hover:border-slate-500/40 hover:shadow-lg hover:shadow-slate-500/10',
        
        modalHeaderBg: 'bg-slate-100/60 dark:bg-slate-800/30',
        modalHighlightBg: 'bg-slate-100 dark:bg-slate-850',
        modalHighlightBorder: 'border-slate-200 dark:border-slate-700',
        modalBlockBg: 'bg-slate-50 dark:bg-slate-800/10',
        modalBlockBorder: 'border-slate-200/50 dark:border-slate-850',
        iconColor: 'text-slate-650 dark:text-slate-400',
        primaryBtn: 'bg-slate-850 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600'
      };
    }

    if (isNational) {
      return {
        grad: 'from-purple-50/90 via-fuchsia-50/70 to-pink-50/85 dark:from-purple-950/30 dark:via-fuchsia-950/20 dark:to-pink-950/30',
        titleText: 'text-purple-955 dark:text-purple-100',
        descText: 'text-purple-800/80 dark:text-purple-305/85',
        deptText: 'text-purple-900/70 dark:text-purple-400/70',
        badge: 'bg-purple-100/80 text-purple-750 border-purple-200/50 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800/40',
        catText: 'text-purple-750 dark:text-purple-300 font-semibold',
        newBadge: 'bg-purple-200/80 text-purple-800 dark:bg-purple-800/60 dark:text-purple-200',
        hoverStyle: 'hover:border-purple-400 dark:hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10',
        
        modalHeaderBg: 'bg-purple-50/40 dark:bg-purple-950/15',
        modalHighlightBg: 'bg-purple-50/60 dark:bg-purple-950/20',
        modalHighlightBorder: 'border-purple-100 dark:border-purple-900/40',
        modalBlockBg: 'bg-purple-50/20 dark:bg-purple-950/5',
        modalBlockBorder: 'border-purple-100/40 dark:border-purple-900/20',
        iconColor: 'text-purple-600 dark:text-purple-400',
        primaryBtn: 'bg-purple-600 hover:bg-purple-750 dark:bg-purple-600 dark:hover:bg-purple-700'
      };
    } else {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-955 dark:text-blue-100',
        descText: 'text-blue-800/80 dark:text-blue-305/85',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-750 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-750 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-850 dark:bg-blue-800/60 dark:text-blue-200',
        hoverStyle: 'hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10',
        
        modalHeaderBg: 'bg-blue-50/40 dark:bg-blue-950/15',
        modalHighlightBg: 'bg-blue-50/60 dark:bg-blue-950/20',
        modalHighlightBorder: 'border-blue-100 dark:border-blue-900/40',
        modalBlockBg: 'bg-blue-50/20 dark:bg-blue-950/5',
        modalBlockBorder: 'border-blue-100/40 dark:border-blue-900/20',
        iconColor: 'text-blue-600 dark:text-blue-400',
        primaryBtn: 'bg-blue-600 hover:bg-blue-750 dark:bg-blue-600 dark:hover:bg-blue-700'
      };
    }
  };

  const getCatColorClass = (cat) => {
    const map = {
      'Education Services': 'bg-violet-100 text-violet-850 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-850 shadow-sm shadow-violet-500/5',
      'Health Services': 'bg-rose-100 text-rose-850 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-850 shadow-sm shadow-rose-500/5',
      'Agriculture Services': 'bg-emerald-100 text-emerald-850 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-850 shadow-sm shadow-emerald-500/5',
      'Citizen Services': 'bg-blue-100 text-blue-850 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-850 shadow-sm shadow-blue-500/5',
      'Employment Services': 'bg-sky-100 text-sky-850 border-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:border-sky-850 shadow-sm shadow-sky-500/5',
      'Banking Services': 'bg-fuchsia-100 text-fuchsia-850 border-fuchsia-200 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:border-fuchsia-850 shadow-sm shadow-fuchsia-500/5',
      'Pension Services': 'bg-amber-100 text-amber-850 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-850 shadow-sm shadow-amber-500/5',
      'Utility Services': 'bg-teal-100 text-teal-850 border-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-850 shadow-sm shadow-teal-500/5',
      'Revenue Services': 'bg-slate-200 text-slate-805 border-slate-300 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700 shadow-sm shadow-slate-500/5',
    };
    return map[cat] || 'bg-blue-100 text-blue-805 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800 shadow-sm';
  };

  // Categories
  const serviceCategories = [
    'Education Services',
    'Health Services',
    'Agriculture Services',
    'Citizen Services',
    'Employment Services',
    'Banking Services',
    'Pension Services',
    'Utility Services',
    'Revenue Services'
  ];

  const isTelugu = bilingual === 'TE';

  // Translations dictionary
  const t = {
    title: isTelugu ? 'ప్రభుత్వ సేవల డైరెక్టరీ' : 'Government Services Directory',
    subtitle: isTelugu ? 'కేంద్ర విభాగాలు మరియు ఆంధ్రప్రదేశ్ మీసేవ ద్వారా అందించబడే 100+ పైగా డిజిటల్ ఇ-గవర్నెన్స్ సేవలకు తక్షణ ప్రాప్యత.' : 'Instant access to over 100+ digital e-Governance services provided by central departments and AP MeeSeva.',
    searchPlaceholder: isTelugu ? 'సేవ పేరు, విభాగం, దరఖాస్తు విధానంతో శోధించండి...' : 'Search service name, department, process...',
    allJurisdictions: isTelugu ? 'అన్ని అధికార పరిధులు' : 'All Jurisdictions',
    nationalServices: isTelugu ? 'జాతీయ సేవలు' : 'National Services',
    stateServices: isTelugu ? 'ఆంధ్రప్రదేశ్ సేవలు (మీసేవ)' : 'Andhra Pradesh Specific (MeeSeva)',
    serviceCategoriesLabel: isTelugu ? 'సేవల విభాగాలు:' : 'Service Categories:',
    allServices: isTelugu ? 'అన్ని సేవలు' : 'All Services',
    nationalBadge: isTelugu ? 'జాతీయ సేవ' : 'National Service',
    stateBadge: isTelugu ? 'రాష్ట్ర సేవ' : 'State Service',
    requiredDocs: isTelugu ? '📄 అవసరమైన పత్రాలు' : '📄 Required Documents',
    citizenProcess: isTelugu ? '📋 పౌర దరఖాస్తు విధానం (దశలవారీగా)' : '📋 Citizen Application Process (Step-by-Step)',
    accessPortal: isTelugu ? 'సేవా పోర్టల్ సందర్శించండి' : 'Access Service Portal',
    noServices: isTelugu ? 'మీ ప్రమాణాలకు సరిపోయే సేవలు కనుగొనబడలేదు.' : 'No services found matching your criteria.',
    resetFilters: isTelugu ? 'ఫిల్టర్‌లను రీసెట్ చేయి' : 'Reset Filters',
    showProcess: isTelugu ? 'దరఖాస్తు విధానం చూడు' : 'View Application Process',
    hideProcess: isTelugu ? 'దాచు' : 'Hide',
    categories: {
      'Education Services': isTelugu ? 'విద్యా సేవలు' : 'Education Services',
      'Health Services': isTelugu ? 'ఆరోగ్య సేవలు' : 'Health Services',
      'Agriculture Services': isTelugu ? 'వ్యవసాయ సేవలు' : 'Agriculture Services',
      'Citizen Services': isTelugu ? 'పౌర సేవలు' : 'Citizen Services',
      'Employment Services': isTelugu ? 'ఉపాధి సేవలు' : 'Employment Services',
      'Banking Services': isTelugu ? 'బ్యాంకింగ్ సేవలు' : 'Banking Services',
      'Pension Services': isTelugu ? 'పింఛన్ సేవలు' : 'Pension Services',
      'Utility Services': isTelugu ? 'యుటిలిటీ సేవలు' : 'Utility Services',
      'Revenue Services': isTelugu ? 'రెవెన్యూ సేవలు' : 'Revenue Services'
    }
  };

  // Parse process_overview into numbered steps
  const parseSteps = (processText) => {
    if (!processText) return [];
    // Split by period, numbered list markers, or sentence boundaries
    const raw = processText
      .split(/(?:\d+\.\s+|(?<=\.)(?=\s+[A-Z\u0C00-\u0C7F]))/g)
      .map(s => s.trim())
      .filter(s => s.length > 10);
    // If splitting didn't work well, split by '. '
    if (raw.length <= 1) {
      return processText
        .split('. ')
        .map(s => s.trim().replace(/^[\d]+\.\s*/, ''))
        .filter(s => s.length > 8)
        .map(s => s.endsWith('.') ? s : s + '.');
    }
    return raw.map(s => s.endsWith('.') ? s : s + '.');
  };

  // Filter services
  const filteredServices = services.filter(s => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      s.name.toLowerCase().includes(searchLower) ||
      s.description.toLowerCase().includes(searchLower) ||
      (s.process_overview || '').toLowerCase().includes(searchLower);

    const matchesCategory = !categoryFilter ||
      (s.category_name || '').toLowerCase().includes(categoryFilter.toLowerCase().replace(' services', '')) ||
      (categoryFilter === 'Revenue Services' && s.department_code === 'REV');

    const matchesType = typeFilter === 'All' || s.type === typeFilter;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gov-blue rounded-full"></span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gov-blue to-blue-500 dark:from-blue-400 dark:to-sky-400 mr-1">
            {isTelugu ? 'ప్రభుత్వ' : 'Government'}
          </span>
          <span className="text-slate-900 dark:text-white">
            {isTelugu ? 'సేవల డైరెక్టరీ' : 'Services Directory'}
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-light">{t.subtitle}</p>
      </div>

      {/* Filter panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent focus:outline-none p-3 text-sm text-slate-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Jurisdiction dropdown */}
          <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-3">
            <Landmark className="w-5 h-5 text-slate-400 mr-2" />
            <select
              className="w-full bg-transparent focus:outline-none py-3 text-sm text-slate-700 dark:text-slate-200"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">{t.allJurisdictions}</option>
              <option value="National">{t.nationalServices}</option>
              <option value="State">{t.stateServices}</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="pt-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 tracking-wider">{t.serviceCategoriesLabel}</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter('')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition duration-150 ${
                categoryFilter === ''
                  ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-900/60 dark:border-blue-850 dark:text-blue-200 shadow-sm shadow-blue-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:scale-105'
              }`}
            >
              {t.allServices}
            </button>
            {serviceCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition duration-150 ${
                  categoryFilter === cat
                    ? getCatColorClass(cat)
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:scale-105'
                }`}
              >
                {t.categories[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((srv) => {
          const steps = parseSteps(srv.process_overview);
          const isExpanded = expandedId === srv.id;
          const theme = getServiceTheme(srv);

          return (
            <div
              key={srv.id}
              className={`relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer ${theme.hoverStyle}`}
              onMouseEnter={(e) => {
                clearTimeout(hoverTimerRef.current);
                clearTimeout(closeTimerRef.current);
                hoverTimerRef.current = setTimeout(() => {
                  setHoveredService(srv);
                }, 300);
              }}
              onMouseLeave={() => {
                clearTimeout(hoverTimerRef.current);
                closeTimerRef.current = setTimeout(() => {
                  setHoveredService(null);
                }, 200);
              }}
            >
              {/* === VIVID GRADIENT HEADER BAND === */}
              <div className={`relative bg-gradient-to-br ${theme.grad} px-5 pt-5 pb-6 overflow-hidden`}>
                {/* Decorative blobs */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/5 rounded-full blur-lg pointer-events-none" />

                <div className="relative flex justify-between items-start">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.badge}`}>
                      {srv.type === 'National' ? t.nationalBadge : t.stateBadge}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.catText}`}>
                    {srv.department_code || 'GOVT'}
                  </span>
                </div>

                <h3 className={`font-extrabold text-base mt-3 line-clamp-2 leading-snug ${theme.titleText}`}>
                  {srv.name}
                </h3>
                <p className={`text-[11px] mt-1 truncate font-medium ${theme.deptText}`}>
                  {srv.department_name}
                </p>
              </div>

              {/* Card Top: description + docs */}
              <div className="p-6 pb-4 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-700 dark:text-slate-305 leading-relaxed line-clamp-2 font-light">
                  {srv.description}
                </p>

                {/* Required Documents pill row */}
                {srv.required_documents && (
                  <div className="mt-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                    <p className={`text-[10px] font-bold uppercase mb-1.5 tracking-wider ${theme.catText}`}>
                      {t.requiredDocs}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.required_documents.split(',').map((doc, di) => (
                        <span
                          key={di}
                          className={`inline-flex items-center gap-1 bg-white dark:bg-slate-800 border text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${theme.badge}`}
                        >
                          <FileText className="w-2.5 h-2.5 flex-shrink-0" />
                          {doc.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Expandable Step-by-Step Process Section */}
              <div className="border-t border-slate-100 dark:border-slate-800">
                {/* Toggle button */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : srv.id)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${theme.catText}`}
                >
                  <span className="flex items-center gap-2">
                    <ClipboardList className={`w-4 h-4 ${theme.iconColor}`} />
                    {t.citizenProcess}
                  </span>
                  {isExpanded
                    ? <ChevronUp className="w-4 h-4" />
                    : <ChevronDown className="w-4 h-4" />
                  }
                </button>

                {/* Expanded steps */}
                {isExpanded && (
                  <div className="px-6 pb-5 animate-fadeIn">
                    {steps.length > 0 ? (
                      <ol className="space-y-3 mt-1">
                        {steps.map((step, si) => (
                          <li key={si} className="flex items-start gap-3">
                            {/* Step number circle */}
                            <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                              si === steps.length - 1
                                ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                                : `${theme.modalHighlightBg} ${theme.iconColor}`
                            }`}>
                              {si === steps.length - 1
                                ? <CheckCircle2 className="w-3.5 h-3.5" />
                                : si + 1
                              }
                            </span>
                            {/* Connector line for all but last */}
                            <div className="flex-1">
                              <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed">{step}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-xs text-slate-400 italic mt-1">
                        {isTelugu ? 'విధానం వివరాలు అందుబాటులో లేవు.' : 'Process details not available.'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer: Portal button */}
              <div className="mt-auto px-6 py-4 bg-slate-50/50 dark:bg-slate-850/20 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center group-hover:bg-blue-50/20 dark:group-hover:bg-blue-950/10 transition-colors">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.catText}`}>
                  {srv.category_name}
                </span>
                <button
                  onClick={() => {
                    setSelectedService(srv);
                    setShowApplyModal(true);
                  }}
                  className={`${theme.primaryBtn} text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition shadow-sm hover:shadow-md`}
                >
                  {t.accessPortal} <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================================================
           CENTERED HOVER PREVIEW MODAL FOR SERVICES
           ================================================================ */}
      {hoveredService && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center animate-fadeIn cursor-pointer"
          style={{ background: 'rgba(15,23,42,0.50)', backdropFilter: 'blur(8px)' }}
          onClick={() => setHoveredService(null)}
        >
          <div 
            className="w-full max-w-lg mx-4 pointer-events-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => {
              clearTimeout(closeTimerRef.current);
            }}
            onMouseLeave={() => {
              setHoveredService(null);
            }}
          >
            {(() => {
              const theme = getServiceTheme(hoveredService);
              return (
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_32px_80px_-10px_rgba(0,0,0,0.5)] overflow-hidden border border-slate-100 dark:border-slate-800 animate-scaleUp">
                  {/* Gradient Header */}
                  <div className={`relative bg-gradient-to-br ${theme.grad} px-7 pt-7 pb-8 overflow-hidden`}>
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/5 rounded-full blur-lg pointer-events-none" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${theme.badge}`}>
                          {hoveredService.type === 'National' ? t.nationalBadge : t.stateBadge}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme.catText}`}>
                          {hoveredService.department_code || 'GOVT'}
                        </span>
                      </div>
                      <h2 className={`text-xl font-black leading-tight drop-shadow-sm line-clamp-2 ${theme.titleText}`}>
                        {hoveredService.name}
                      </h2>
                      <p className={`text-xs mt-1.5 font-semibold ${theme.deptText}`}>{hoveredService.department_name}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-7 pb-7 pt-6 space-y-4">
                    <p className="text-sm text-slate-655 dark:text-slate-305 leading-relaxed font-light">
                      {hoveredService.description}
                    </p>
                    {hoveredService.required_documents && (
                      <div className={`flex items-start gap-3 border rounded-2xl p-4 ${theme.modalBlockBg} ${theme.modalBlockBorder}`}>
                        <span className="text-xl flex-shrink-0">📋</span>
                        <div>
                          <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.catText}`}>
                            {t.requiredDocs}
                          </p>
                          <p className="text-xs text-slate-655 dark:text-slate-300 leading-relaxed font-light">
                            {hoveredService.required_documents}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setSelectedService(hoveredService);
                          setShowApplyModal(true);
                          setHoveredService(null);
                        }}
                        className={`w-full py-2.5 rounded-xl text-white font-bold text-xs ${theme.primaryBtn} transition shadow flex items-center justify-center gap-1.5`}
                      >
                        {isTelugu ? 'దరఖాస్తు విధానం చూడు' : 'View Application Process'} &rarr;
                      </button>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span>👇</span>
                        <span>{isTelugu ? 'లేదా వెనుక ఉన్న కార్డు పై క్లిక్ చేయండి' : 'or click card details for more info'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* SERVICE PROCESS AND AI GUIDANCE MODAL */}
      {showApplyModal && selectedService && (
        <div 
          onClick={() => { setShowApplyModal(false); setSelectedService(null); }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleUp"
          >
            {/* Header */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/35 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-bold text-gov-blue dark:text-blue-400 block mb-0.5">
                  {bilingual === 'EN' ? 'Service Application Assistance' : 'సేవల దరఖాస్తు సహాయ కేంద్రం'}
                </span>
                <h3 className="font-extrabold text-slate-950 dark:text-white text-base sm:text-lg">
                  {selectedService.name}
                </h3>
              </div>
              <button
                onClick={() => { setShowApplyModal(false); setSelectedService(null); }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition duration-150"
              >
                &times;
              </button>
            </div>

            {/* Content (Two columns: Left = Process, Right = AI Chat) */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
              
              {/* Left Column */}
              <div className="md:w-1/2 p-6 border-r border-slate-100 dark:border-slate-800 overflow-y-auto space-y-6">
                
                {/* 1. Required Documents */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-gov-blue" />
                    {t.requiredDocs}
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
                    {selectedService.required_documents ? (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedService.required_documents.split(',').map((doc, idx) => (
                          <span
                            key={idx}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-350 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
                          >
                            📄 {doc.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-550 dark:text-slate-400 font-light">{isTelugu ? 'ప్రత్యేక పత్రాలు ఏవీ అవసరం లేదు.' : 'No special documents required.'}</p>
                    )}
                  </div>
                </div>

                {/* 2. Step-by-Step Instructions */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-gov-blue" />
                    {t.citizenProcess}
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-3">
                    {parseSteps(selectedService.process_overview).length > 0 ? (
                      <ol className="space-y-3">
                        {parseSteps(selectedService.process_overview).map((step, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="bg-gov-blue text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">{idx + 1}</span>
                            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                              {step}
                            </p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-slate-550 dark:text-slate-400 font-light leading-relaxed">
                        {selectedService.process_overview || (isTelugu ? 'దరఖాస్తు విధానం వివరాలు అందుబాటులో లేవు.' : 'Process details not available.')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Assistant for the Service */}
              <div className="md:w-1/2 p-6 flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-900/10">
                <div className="flex-shrink-0 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400">
                    {isTelugu ? 'AI సేవ సహాయకుడు' : 'AI Service Assistant'}
                  </h4>
                </div>

                {/* Service Specific FAQ/Info panel */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs font-light leading-relaxed text-slate-650 dark:text-slate-300">
                  <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm space-y-2">
                    <p className="font-bold text-slate-800 dark:text-slate-200">ℹ️ {isTelugu ? 'సేవా వివరాలు' : 'Service Info'}</p>
                    <p>{selectedService.description}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm space-y-2">
                    <p className="font-bold text-slate-800 dark:text-slate-200">🏢 {isTelugu ? 'జారీ చేసే విభాగం' : 'Issuing Department'}</p>
                    <p>{selectedService.department_name} ({selectedService.department_code})</p>
                  </div>
                  <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm space-y-2">
                    <p className="font-bold text-slate-800 dark:text-slate-200">🔒 {isTelugu ? 'భద్రత & ధృవీకరణ' : 'Security & Verification'}</p>
                    <p>{isTelugu ? 'ఈ సేవ సురక్షితమైన ప్రభుత్వ డొమైన్ ద్వారా ప్రాసెస్ చేయబడుతుంది. అన్ని లావాదేవీలు తహశీల్దార్ లేదా సంబంధిత అధికారిక సంతకంతో సురక్షితంగా జారీ చేయబడతాయి.' : 'This service is processed via secure government portals. Certificates are issued with verified digital signatures of competent authorities.'}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/35 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4">
              <button
                onClick={() => { setShowApplyModal(false); setSelectedService(null); }}
                className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {bilingual === 'EN' ? 'Close' : 'మూసిвеయి'}
              </button>
              
              <a
                href={selectedService.website_url}
                target="_blank"
                rel="noreferrer"
                className="bg-gov-blue hover:bg-gov-navy text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition"
              >
                {bilingual === 'EN' ? 'Proceed to Official Portal' : 'అధికారిక వెబ్‌సైట్‌కు వెళ్ళు'} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
