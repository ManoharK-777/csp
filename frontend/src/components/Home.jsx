import React, { useState, useRef, useEffect } from 'react';
import { Search, Sprout, GraduationCap, HeartPulse, Briefcase, FileText, HelpCircle, Landmark, ChevronRight, Sparkles } from 'lucide-react';

export default function Home({ stats, schemes, services, setPage, setSelectedScheme, setGlobalSearch, setCategoryFilter, bilingual }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSdg, setActiveSdg] = useState(null);
  const [hoveredScheme, setHoveredScheme] = useState(null);
  const [backdropActive, setBackdropActive] = useState(false);
  const hoverTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (hoveredScheme) {
      setBackdropActive(false);
    }
  }, [hoveredScheme]);

  const isTelugu = bilingual === 'TE';

  // SDGs defined in the requirements
  const sdgs = [
    { 
      code: 'SDG_1', 
      title: isTelugu ? 'SDG 1: పేదరిక నిర్మూలన' : 'SDG 1: No Poverty', 
      desc: isTelugu ? 'అన్ని రూపాల్లో ఉన్న పేదరికాన్ని నిర్మూలించడం.' : 'End poverty in all its forms everywhere.', 
      color: 'bg-[#E5243B]', 
      text: 'text-white' 
    },
    { 
      code: 'SDG_3', 
      title: isTelugu ? 'SDG 3: ఆరోగ్యం & శ్రేయస్సు' : 'SDG 3: Good Health', 
      desc: isTelugu ? 'ఆరోగ్యకరమైన జీవితాలను నిర్ధారించడం మరియు శ్రేయస్సును ప్రోత్సహించడం.' : 'Ensure healthy lives & promote well-being.', 
      color: 'bg-[#4C9F38]', 
      text: 'text-white' 
    },
    { 
      code: 'SDG_4', 
      title: isTelugu ? 'SDG 4: నాణ్యమైన విద్య' : 'SDG 4: Quality Education', 
      desc: isTelugu ? 'అందరికీ సమగ్రమైన మరియు నాణ్యమైన విద్యను అందించడం.' : 'Ensure inclusive & equitable quality education.', 
      color: 'bg-[#C7212F]', 
      text: 'text-white' 
    },
    { 
      code: 'SDG_8', 
      title: isTelugu ? 'SDG 8: ఉపాధి & ఆర్థిక వృద్ధి' : 'SDG 8: Decent Work', 
      desc: isTelugu ? 'ఉపాధి అవకాశాలను మరియు స్థిరమైన ఆర్థిక వృద్ధిని ప్రోత్సహించడం.' : 'Promote sustained, inclusive economic growth.', 
      color: 'bg-[#A21942]', 
      text: 'text-white' 
    },
    { 
      code: 'SDG_10', 
      title: isTelugu ? 'SDG 10: అసమానతల తగ్గింపు' : 'SDG 10: Reduced Inequalities', 
      desc: isTelugu ? 'వివిధ వర్గాల మధ్య అసమానతలను తగ్గించడం.' : 'Reduce inequality within & among countries.', 
      color: 'bg-[#DD1367]', 
      text: 'text-white' 
    },
    { 
      code: 'SDG_16', 
      title: isTelugu ? 'SDG 16: శాంతి & న్యాయం' : 'SDG 16: Peace & Justice', 
      desc: isTelugu ? 'శాంతియుత మరియు సమ్మిళిత సమాజాలను పెంపొందించడం.' : 'Promote peaceful & inclusive societies.', 
      color: 'bg-[#00689D]', 
      text: 'text-white' 
    }
  ];

  // Quick modules mapping
  const modules = [
    { 
      title: isTelugu ? 'ప్రభుత్వ పథకాలు' : 'Government Schemes', 
      desc: isTelugu ? 'కేంద్ర మరియు రాష్ట్ర సంక్షేమ పథకాల శోధన.' : 'Search and discover central & state welfare schemes.', 
      icon: Sprout, 
      page: 'schemes', 
      color: 'border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' 
    },
    { 
      title: isTelugu ? 'స్మార్ట్ అర్హత పరిశీలన' : 'Smart Eligibility Checker', 
      desc: isTelugu ? 'మీ అర్హతలను కనుగొనడానికి మీ ప్రొఫైల్ నమోదు చేయండి.' : 'Enter your profile details to see what you qualify for.', 
      icon: HelpCircle, 
      page: 'checker', 
      color: 'border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' 
    },
    { 
      title: isTelugu ? 'సేవల డైరెక్టరీ' : 'Service Directory', 
      desc: isTelugu ? 'మీసేవ మరియు జాతీయ సేవలకు నేరుగా యాక్సెస్.' : 'Direct access to official MeeSeva and national services.', 
      icon: Briefcase, 
      page: 'services', 
      color: 'border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-950/20' 
    },
    { 
      title: isTelugu ? 'గ్రీవెన్స్ సహాయకురాలు' : 'Grievance Assistant', 
      desc: isTelugu ? 'ఫిర్యాదు పత్రాల డ్రాఫ్ట్ రాయండి మరియు లింకులు కనుగొనండి.' : 'Generate complaint drafts & find official portals.', 
      icon: FileText, 
      page: 'grievance', 
      color: 'border-l-4 border-rose-500 bg-rose-50/50 dark:bg-rose-950/20' 
    },
    { 
      title: isTelugu ? 'పత్రాల నిధి' : 'Document Center', 
      desc: isTelugu ? 'కావలసిన పత్రాలు, సమయం మరియు దరఖాస్తు విధానం.' : 'Find documents needed, timelines & application steps.', 
      icon: GraduationCap, 
      page: 'documents', 
      color: 'border-l-4 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' 
    }
  ];

  // Featured schemes (top 4 prominent ones)
  const featuredSchemes = schemes.filter(s => 
    ['Thalliki Vandanam', 'PM Kisan Samman Nidhi', 'NTR Aarogyaseva', 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)'].includes(s.name)
  ).slice(0, 4);

  // Popular services (first 4)
  const popularServices = services.slice(0, 4);

  // Search execution
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setGlobalSearch(searchTerm);
      setPage('schemes');
    }
  };

  const handleQuickSearch = (term) => {
    setGlobalSearch(term);
    setPage('schemes');
  };

  // Get schemes mapped to active SDG
  const getSdgSchemes = () => {
    if (!activeSdg) return [];
    return schemes.filter(s => {
      if (!s) return false;
      const cat = s.category_name || '';
      if (activeSdg === 'SDG_1') return cat === 'Agriculture' || cat === 'Pension' || cat === 'Financial Inclusion';
      if (activeSdg === 'SDG_3') return cat === 'Health';
      if (activeSdg === 'SDG_4') return cat === 'Education' || cat === 'Skill Development';
      if (activeSdg === 'SDG_8') return cat === 'Employment' || cat === 'Entrepreneurship';
      if (activeSdg === 'SDG_10') return cat === 'Women Welfare' || cat === 'Social Welfare';
      if (activeSdg === 'SDG_16') return s.type === 'Central';
      return false;
    }).slice(0, 6);
  };

  // Unified helper for low-brightness pastel theme mapping
  const getSchemeTheme = (scheme) => {
    if (!scheme) {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-955 dark:text-blue-100',
        descText: 'text-blue-800/80 dark:text-blue-300/80',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-800 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-700 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-800 dark:bg-blue-800/60 dark:text-blue-200',
        hoverStyle: 'hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10'
      };
    }

    const cat = scheme.category_name || '';
    const isCentral = scheme.type === 'Central';

    if (cat.includes('Health')) {
      return {
        grad: 'from-rose-50/90 via-pink-50/70 to-fuchsia-50/85 dark:from-rose-950/30 dark:via-pink-950/20 dark:to-fuchsia-950/30',
        titleText: 'text-rose-950 dark:text-rose-100',
        descText: 'text-rose-800/80 dark:text-rose-300/85',
        deptText: 'text-rose-900/70 dark:text-rose-400/70',
        badge: 'bg-rose-100/80 text-rose-700 border-rose-200/50 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800/40',
        catText: 'text-rose-700 dark:text-rose-300 font-semibold',
        newBadge: 'bg-rose-200/80 text-rose-800 dark:bg-rose-800/60 dark:text-rose-200',
        hoverStyle: 'hover:border-rose-400 dark:hover:border-rose-500/40 hover:shadow-lg hover:shadow-rose-500/10'
      };
    }
    if (cat.includes('Education')) {
      return {
        grad: 'from-violet-50/90 via-purple-50/70 to-indigo-50/85 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-indigo-950/30',
        titleText: 'text-violet-950 dark:text-violet-100',
        descText: 'text-violet-800/80 dark:text-violet-300/85',
        deptText: 'text-violet-900/70 dark:text-violet-400/70',
        badge: 'bg-violet-100/80 text-violet-700 border-violet-200/50 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-800/40',
        catText: 'text-violet-700 dark:text-violet-300 font-semibold',
        newBadge: 'bg-violet-200/80 text-violet-800 dark:bg-violet-800/60 dark:text-violet-200',
        hoverStyle: 'hover:border-violet-400 dark:hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10'
      };
    }
    if (cat.includes('Agriculture')) {
      return {
        grad: 'from-emerald-50/90 via-teal-50/70 to-cyan-50/85 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30',
        titleText: 'text-emerald-950 dark:text-emerald-100',
        descText: 'text-emerald-800/80 dark:text-emerald-300/85',
        deptText: 'text-emerald-900/70 dark:text-emerald-400/70',
        badge: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800/40',
        catText: 'text-emerald-700 dark:text-emerald-300 font-semibold',
        newBadge: 'bg-emerald-200/80 text-emerald-800 dark:bg-emerald-800/60 dark:text-emerald-200',
        hoverStyle: 'hover:border-emerald-400 dark:hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10'
      };
    }
    if (cat.includes('Pension')) {
      return {
        grad: 'from-amber-50/90 via-orange-50/70 to-red-50/85 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-red-950/30',
        titleText: 'text-amber-950 dark:text-amber-100',
        descText: 'text-amber-800/80 dark:text-amber-300/85',
        deptText: 'text-amber-900/70 dark:text-amber-400/70',
        badge: 'bg-amber-100/80 text-amber-700 border-amber-200/50 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800/40',
        catText: 'text-amber-700 dark:text-amber-300 font-semibold',
        newBadge: 'bg-amber-200/80 text-amber-800 dark:bg-amber-800/60 dark:text-amber-200',
        hoverStyle: 'hover:border-amber-400 dark:hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10'
      };
    }
    if (cat.includes('Women Welfare')) {
      return {
        grad: 'from-pink-50/90 via-rose-50/70 to-red-50/85 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-red-950/30',
        titleText: 'text-pink-950 dark:text-pink-100',
        descText: 'text-pink-800/80 dark:text-pink-300/85',
        deptText: 'text-pink-900/70 dark:text-pink-400/70',
        badge: 'bg-pink-100/80 text-pink-700 border-pink-200/50 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-800/40',
        catText: 'text-pink-700 dark:text-pink-300 font-semibold',
        newBadge: 'bg-pink-200/80 text-pink-800 dark:bg-pink-800/60 dark:text-pink-200',
        hoverStyle: 'hover:border-pink-400 dark:hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/10'
      };
    }
    if (cat.includes('Financial Inclusion')) {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-955 dark:text-blue-100',
        descText: 'text-blue-800/80 dark:text-blue-300/85',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-800 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-700 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-800 dark:bg-blue-800/60 dark:text-blue-200',
        hoverStyle: 'hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10'
      };
    }
    if (cat.includes('Employment')) {
      return {
        grad: 'from-sky-50/90 via-blue-50/70 to-indigo-50/85 dark:from-sky-950/30 dark:via-blue-950/20 dark:to-indigo-950/30',
        titleText: 'text-sky-950 dark:text-sky-100',
        descText: 'text-sky-800/80 dark:text-sky-300/85',
        deptText: 'text-sky-900/70 dark:text-sky-400/70',
        badge: 'bg-sky-100/80 text-sky-700 border-sky-200/50 dark:bg-sky-900/40 dark:text-sky-300 dark:border-sky-800/40',
        catText: 'text-sky-700 dark:text-sky-300 font-semibold',
        newBadge: 'bg-sky-200/80 text-sky-800 dark:bg-sky-800/60 dark:text-sky-200',
        hoverStyle: 'hover:border-sky-400 dark:hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10'
      };
    }
    if (cat.includes('Social Welfare')) {
      return {
        grad: 'from-teal-50/90 via-emerald-50/70 to-green-50/85 dark:from-teal-950/30 dark:via-emerald-950/20 dark:to-green-950/30',
        titleText: 'text-teal-950 dark:text-teal-100',
        descText: 'text-teal-800/80 dark:text-teal-300/85',
        deptText: 'text-teal-900/70 dark:text-teal-400/70',
        badge: 'bg-teal-100/80 text-teal-700 border-teal-200/50 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800/40',
        catText: 'text-teal-700 dark:text-teal-300 font-semibold',
        newBadge: 'bg-teal-200/80 text-teal-800 dark:bg-teal-800/60 dark:text-teal-200',
        hoverStyle: 'hover:border-teal-400 dark:hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10'
      };
    }
    if (cat.includes('Skill Development')) {
      return {
        grad: 'from-orange-50/90 via-amber-50/70 to-yellow-50/85 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/30',
        titleText: 'text-orange-950 dark:text-orange-100',
        descText: 'text-orange-800/80 dark:text-orange-300/85',
        deptText: 'text-orange-900/70 dark:text-orange-400/70',
        badge: 'bg-orange-100/80 text-orange-700 border-orange-200/50 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/40',
        catText: 'text-orange-700 dark:text-orange-300 font-semibold',
        newBadge: 'bg-orange-200/80 text-orange-800 dark:bg-orange-800/60 dark:text-orange-200',
        hoverStyle: 'hover:border-orange-400 dark:hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10'
      };
    }
    if (cat.includes('Entrepreneurship')) {
      return {
        grad: 'from-fuchsia-50/90 via-violet-50/70 to-purple-50/85 dark:from-fuchsia-950/30 dark:via-violet-950/20 dark:to-purple-950/30',
        titleText: 'text-fuchsia-950 dark:text-fuchsia-100',
        descText: 'text-fuchsia-800/80 dark:text-fuchsia-300/85',
        deptText: 'text-fuchsia-900/70 dark:text-fuchsia-400/70',
        badge: 'bg-fuchsia-100/80 text-fuchsia-700 border-fuchsia-200/50 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:border-fuchsia-800/40',
        catText: 'text-fuchsia-700 dark:text-fuchsia-300 font-semibold',
        newBadge: 'bg-fuchsia-200/80 text-fuchsia-800 dark:bg-fuchsia-800/60 dark:text-fuchsia-200',
        hoverStyle: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-500/40 hover:shadow-lg hover:shadow-fuchsia-500/10'
      };
    }
    if (cat.includes('Housing')) {
      return {
        grad: 'from-slate-100 via-slate-100 to-slate-200/70 dark:from-slate-900 dark:via-slate-800/70 dark:to-slate-900/90',
        titleText: 'text-slate-950 dark:text-slate-100',
        descText: 'text-slate-700/90 dark:text-slate-300/90',
        deptText: 'text-slate-800/70 dark:text-slate-400/70',
        badge: 'bg-slate-200 text-slate-750 border-slate-300/55 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/40',
        catText: 'text-slate-750 dark:text-slate-300 font-semibold',
        newBadge: 'bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
        hoverStyle: 'hover:border-slate-400 dark:hover:border-slate-500/40 hover:shadow-lg hover:shadow-slate-500/10'
      };
    }

    if (isCentral) {
      return {
        grad: 'from-orange-50/90 via-amber-50/70 to-yellow-50/85 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/30',
        titleText: 'text-orange-950 dark:text-orange-100',
        descText: 'text-orange-800/80 dark:text-orange-300/85',
        deptText: 'text-orange-900/70 dark:text-orange-400/70',
        badge: 'bg-orange-100/80 text-orange-700 border-orange-200/50 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/40',
        catText: 'text-orange-700 dark:text-orange-300 font-semibold',
        newBadge: 'bg-orange-200/80 text-orange-800 dark:bg-orange-800/60 dark:text-orange-200',
        hoverStyle: 'hover:border-orange-400 dark:hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10'
      };
    } else {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-950 dark:text-blue-100',
        descText: 'text-blue-800/80 dark:text-blue-300/85',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-800 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-700 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-800 dark:bg-blue-800/60 dark:text-blue-200',
        hoverStyle: 'hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10'
      };
    }
  };

  const getSrvColorStyle = (srv) => {
    if (!srv) return { border: 'hover:border-l-gov-blue', icon: 'text-gov-blue bg-gov-lightBlue dark:bg-slate-800' };
    const cat = srv.category_name || '';
    const map = {
      'Education': { border: 'hover:border-l-4 hover:border-l-violet-500', icon: 'text-violet-600 bg-violet-50 dark:bg-violet-950/20' },
      'Health': { border: 'hover:border-l-4 hover:border-l-rose-500', icon: 'text-rose-600 bg-rose-50 dark:bg-rose-950/20' },
      'Agriculture': { border: 'hover:border-l-4 hover:border-l-emerald-500', icon: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' },
      'Citizen': { border: 'hover:border-l-4 hover:border-l-blue-500', icon: 'text-blue-600 bg-blue-50 dark:bg-blue-950/20' },
      'Employment': { border: 'hover:border-l-4 hover:border-l-sky-500', icon: 'text-sky-600 bg-sky-50 dark:bg-sky-950/20' },
      'Banking': { border: 'hover:border-l-4 hover:border-l-fuchsia-500', icon: 'text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-950/20' },
      'Pension': { border: 'hover:border-l-4 hover:border-l-amber-500', icon: 'text-amber-600 bg-amber-50 dark:bg-amber-950/20' },
      'Utility': { border: 'hover:border-l-4 hover:border-l-teal-500', icon: 'text-teal-600 bg-teal-50 dark:bg-teal-950/20' },
      'Revenue': { border: 'hover:border-l-4 hover:border-l-slate-500', icon: 'text-slate-600 bg-slate-50 dark:bg-slate-900/40' },
    };
    const key = Object.keys(map).find(k => cat.includes(k));
    return map[key] || { border: 'hover:border-l-4 hover:border-l-gov-blue', icon: 'text-gov-blue bg-gov-lightBlue dark:bg-slate-800' };
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071330] via-[#0f2b5e] to-[#1a4a8a] text-white py-12 px-6 sm:px-12 rounded-3xl shadow-2xl">
        {/* Decorative background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.12),transparent_50%)] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        {/* Floating orbs */}
        <div className="absolute top-8 right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-12 left-12 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-1">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold uppercase tracking-widest text-orange-200 border border-white/15 shadow-lg shadow-black/10">
            <svg width="16" height="12" viewBox="0 0 3 2" className="rounded-sm shadow-sm inline-block mr-1 align-middle">
              <rect width="3" height="2" fill="#008A00" />
              <rect width="3" height="1.33" fill="#FFF" />
              <rect width="3" height="0.67" fill="#FF9933" />
              <circle cx="1.5" cy="1" r="0.16" fill="#000080" />
            </svg>
            {isTelugu 
              ? 'ఆంధ్రప్రదేశ్ మరియు భారత ప్రభుత్వాల ఉమ్మడి ప్రయత్నం' 
              : 'Government of Andhra Pradesh & India Initiative'
            }
          </span>

          <h1 className="text-[2rem] sm:text-[2.8rem] font-black tracking-tight leading-[1.15] mt-4 mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 inline mr-2">
              {isTelugu ? 'సమన్వయ' : 'Unified'}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
              {isTelugu ? 'ప్రభుత్వ సేవల పోర్టల్' : 'Government Services Portal'}
            </span>
          </h1>

          <p className="text-sm sm:text-[15px] text-slate-300/90 font-normal leading-relaxed tracking-wide text-center max-w-2xl flex flex-wrap items-center justify-center gap-1.5 mb-5">
            {isTelugu ? (
              <>
                <span className="inline-flex items-center gap-1 bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-amber-200 font-semibold border border-white/[0.08] text-xs">🏛️ కేంద్ర &amp; రాష్ట్ర పథకాలు</span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-emerald-200 font-semibold border border-white/[0.08] text-xs">✅ అర్హత తనిఖీ</span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-sky-200 font-semibold border border-white/[0.08] text-xs">💻 డిజిటల్ సేవలు</span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-rose-200 font-semibold border border-white/[0.08] text-xs">📝 గ్రీవెన్స్ సహాయం</span>
              </>
            ) : (
              <>
                {'A single platform for '}
                <span className="inline-flex items-center gap-1 bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-amber-200 font-semibold border border-white/[0.08] text-xs">🏛️ Welfare Schemes</span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-emerald-200 font-semibold border border-white/[0.08] text-xs">✅ Eligibility Check</span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-sky-200 font-semibold border border-white/[0.08] text-xs">💻 Digital Services</span>
                <span className="text-slate-400">•</span>
                <span className="inline-flex items-center gap-1 bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-rose-200 font-semibold border border-white/[0.08] text-xs">📝 Grievance Assist</span>
              </>
            )}
          </p>

          {/* Hero Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mx-auto relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-blue-400/20 to-amber-400/20 rounded-2xl blur-md pointer-events-none"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl border-2 border-transparent focus-within:border-gov-gold overflow-hidden">
              <Search className="absolute left-4 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder={isTelugu ? 'పథకం పేరు, విభాగం లేదా సేవను శోధించండి (ఉదా. రైతు, మీసేవ, పెన్షన్)...' : 'Search schemes, departments, or services (e.g. Kisan, MeeSeva, Pension)...'}
                className="w-full pl-12 pr-32 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none text-sm bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 bg-gradient-to-r from-gov-blue to-indigo-600 hover:from-gov-navy hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {isTelugu ? 'శోధించు' : 'Search'}
              </button>
            </div>
          </form>

          {/* Quick Search Tag Recommendations */}
          <div className="flex flex-wrap justify-center gap-2 pt-3 text-sm text-slate-300">
            <span className="font-semibold text-white/80 text-xs">{isTelugu ? 'ప్రముఖమైనవి:' : 'Popular:'}</span>
            {['PM Kisan', 'Thalliki Vandanam', 'NTR Aarogyaseva', 'MeeSeva Land Records', 'Scholarship'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickSearch(tag)}
                className="bg-white/[0.07] hover:bg-white/15 text-white/90 px-3 py-1 rounded-full text-[11px] transition duration-200 hover:scale-105 border border-white/[0.06]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Dashboard Widget */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: isTelugu ? 'మొత్తం అందుబాటులో ఉన్న పథకాలు' : 'Total Schemes Available', value: stats.summary?.totalSchemes || schemes.length || '116+', color: 'text-emerald-600 dark:text-emerald-400' },
          { label: isTelugu ? 'పౌర డిజిటల్ సేవలు' : 'Citizen Digital Services', value: stats.summary?.totalServices || services.length || '105+', color: 'text-blue-600 dark:text-blue-400' },
          { label: isTelugu ? 'క్రియాశీల విభాగాలు' : 'Active Departments', value: stats.summary?.totalDepts || 10, color: 'text-amber-600 dark:text-amber-400' },
          { label: isTelugu ? 'గ్రీవెన్స్ వర్గాలు' : 'Grievance Categories', value: stats.summary?.totalGrievanceCats || 12, color: 'text-rose-600 dark:text-rose-400' }
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center transform transition duration-200 hover:-translate-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              {item.label}
            </span>
            <span className={`text-3xl font-extrabold ${item.color}`}>
              {item.value}
            </span>
          </div>
        ))}
      </section>

      {/* Quick Access Modules grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gov-blue rounded-full"></span>
          {isTelugu ? 'ద్వారాల ముఖ్య విభాగాలు' : 'Quick Access Portal Modules'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <button
                key={i}
                onClick={() => setPage(m.page)}
                className={`flex flex-col items-start text-left p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${m.color}`}
              >
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 mb-4">
                  <Icon className="w-6 h-6 text-gov-blue" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm sm:text-base leading-tight">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
                <ChevronRight className="w-4 h-4 text-gov-blue mt-4 self-end transition-transform duration-200 hover:translate-x-1" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Schemes & Latest Services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Schemes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gov-blue rounded-full"></span>
              {isTelugu ? 'ప్రముఖ సంక్షేమ పథకాలు' : 'Featured Welfare Schemes'}
            </h2>
            <button
              onClick={() => { setCategoryFilter(''); setPage('schemes'); }}
              className="text-xs font-semibold text-gov-blue hover:text-gov-navy dark:text-blue-400"
            >
              {isTelugu ? 'అన్ని పథకాలను చూడండి' : 'View All Schemes'} &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredSchemes.map((scheme) => {
              const theme = getSchemeTheme(scheme);
              return (
              <div
                key={scheme.id}
                className={`bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer ${theme.hoverStyle}`}
              >
                {/* === VIVID GRADIENT HEADER BAND === */}
                <div 
                  className={`relative bg-gradient-to-br ${theme.grad} px-5 pt-5 pb-6 overflow-hidden`}
                  onMouseEnter={() => {
                    clearTimeout(hoverTimerRef.current);
                    clearTimeout(closeTimerRef.current);
                    hoverTimerRef.current = setTimeout(() => {
                      setHoveredScheme(scheme);
                    }, 300);
                  }}
                  onMouseLeave={() => {
                    clearTimeout(hoverTimerRef.current);
                    closeTimerRef.current = setTimeout(() => {
                      setHoveredScheme(null);
                    }, 800);
                  }}
                >
                  {/* Decorative blobs */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/5 rounded-full blur-lg pointer-events-none" />

                  <div className="relative flex justify-between items-start">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.badge}`}>
                      {scheme.type === 'Central' 
                        ? (isTelugu ? 'కేంద్ర పథకం' : 'Central Scheme') 
                        : (isTelugu ? 'రాష్ట్ర పథకం' : 'State Scheme')
                      }
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.catText}`}>
                      {scheme.category_name}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedScheme(scheme)}
                    className={`font-extrabold text-base mt-3 line-clamp-1 leading-snug cursor-pointer hover:opacity-80 transition-opacity drop-shadow-sm ${theme.titleText}`}
                  >
                    {scheme.name}
                  </h3>
                  <p className={`text-[11px] mt-1 truncate font-medium ${theme.deptText}`}>
                    {scheme.department_name || 'Government Department'}
                  </p>
                </div>

                {/* Body / Description */}
                <div 
                  className="p-6 flex-1 flex flex-col justify-between space-y-4"
                  onMouseEnter={() => {
                    clearTimeout(hoverTimerRef.current);
                    setHoveredScheme(null);
                  }}
                >
                  <p className="text-xs text-slate-700 dark:text-slate-355 leading-relaxed line-clamp-3 font-light">
                    {scheme.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="font-bold text-gov-blue dark:text-blue-400">
                      {isTelugu ? 'సహాయం' : 'Aid'}: {scheme.financial_assistance_amount && scheme.financial_assistance_amount > 0 ? `₹${Number(scheme.financial_assistance_amount).toLocaleString('en-IN')}` : (isTelugu ? 'సబ్సిడీలు' : 'Subsidies')}
                    </span>
                    <button
                      onClick={() => { setSelectedScheme(scheme); }}
                      className="bg-slate-100 hover:bg-gov-blue hover:text-white dark:bg-slate-800 dark:hover:bg-gov-blue dark:hover:text-white text-slate-700 dark:text-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition duration-150"
                    >
                      {isTelugu ? 'వివరాలు చూడండి' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Latest Services Side Panel */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gov-blue rounded-full"></span>
              {isTelugu ? 'ప్రముఖ సేవలు' : 'Popular Services'}
            </h2>
            <button onClick={() => setPage('services')} className="text-xs font-semibold text-gov-blue hover:text-gov-navy dark:text-blue-400">
              {isTelugu ? 'అన్నీ చూడండి' : 'See All'} &rarr;
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            {popularServices.map((srv) => {
              const colors = getSrvColorStyle(srv);
              return (
                <div 
                  key={srv.id} 
                  className={`group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition duration-150 border-l-4 border-l-transparent hover:shadow-sm ${colors.border}`}
                >
                  <div className={`p-2.5 rounded-lg transition-colors duration-150 ${colors.icon}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-gov-blue dark:group-hover:text-blue-400 transition-colors truncate">
                      {srv.name}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {srv.department_name}
                    </p>
                    <a
                      href={srv.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-gov-blue hover:underline mt-1 inline-block"
                    >
                      {isTelugu ? 'అధికారిక వెబ్‌సైట్ తెరవండి' : 'Open Official Portal'} &rarr;
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SDG Mapping Interactive Section */}
      <section className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gov-blue rounded-full"></span>
            {isTelugu ? 'సుస్థిర అభివృద్ధి లక్ష్యాల (SDG) అనుసంధానం' : 'Sustainable Development Goals (SDG) Alignment'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            {isTelugu
              ? 'మా పాలనా పథకాలు ఐక్యరాజ్యసమితి సుస్థిర అభివృద్ధి లక్ష్యాలతో అనుసంధానించబడి ఉన్నాయి. ఈ క్రింది లక్ష్యాలపై క్లిక్ చేసి అనుసంధానించబడిన పథకాలను చూడండి.'
              : 'Our governance schemes map to the United Nations Sustainable Development Goals. Click any card below to dynamically filter schemes aligned with that developmental target.'
            }
          </p>
        </div>

        {/* SDG Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {sdgs.map((sdg) => (
            <button
              key={sdg.code}
              onClick={() => setActiveSdg(activeSdg === sdg.code ? null : sdg.code)}
              className={`p-4 rounded-xl flex flex-col justify-between text-left transition duration-200 border-2 ${
                activeSdg === sdg.code
                  ? 'border-gov-gold scale-105 shadow-md shadow-slate-200 dark:shadow-none'
                  : 'border-transparent hover:scale-[1.02] hover:shadow-sm'
              } ${sdg.color} ${sdg.text} min-h-[140px]`}
            >
              <div className="font-bold text-sm leading-tight">{sdg.title}</div>
              <div className="text-[11px] font-light leading-relaxed mt-2 opacity-90">{sdg.desc}</div>
              <div className="self-end mt-4 text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                {activeSdg === sdg.code 
                  ? (isTelugu ? 'ఎంపిక చేయబడింది' : 'Selected') 
                  : (isTelugu ? 'పథకాలను చూడండి' : 'View Schemes')
                }
              </div>
            </button>
          ))}
        </div>

        {/* SDG Mapped Schemes Display */}
        {activeSdg && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
              {isTelugu ? 'అనుసంధానించబడిన పథకాలు:' : 'Mapped Schemes for'} {sdgs.find(s => s.code === activeSdg)?.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getSdgSchemes().map((scheme) => (
                <div
                  key={scheme.id}
                  onClick={() => setSelectedScheme(scheme)}
                  className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 cursor-pointer flex flex-col justify-between hover:shadow-sm transition duration-150"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">
                      {scheme.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {scheme.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-gov-blue dark:text-blue-400 mt-4">
                    <span>{scheme.type === 'Central' ? (isTelugu ? 'కేంద్రం' : 'Central') : (isTelugu ? 'రాష్ట్రం' : 'State')}</span>
                    <span>{isTelugu ? 'వివరాలు' : 'Details'} &rarr;</span>
                  </div>
                </div>
              ))}
              {getSdgSchemes().length === 0 && (
                <p className="text-xs text-slate-400">{isTelugu ? 'ప్రస్తుతం దీనికి అనుసంధానించబడిన పథకాలు లేవు.' : 'No schemes currently mapped for this goal.'}</p>
              )}
            </div>
          </div>
        )}
        </section>

      {/* 5. CENTERED HOVER PREVIEW MODAL */}
      {hoveredScheme && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all ${backdropActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ background: 'rgba(15,23,42,0.50)', backdropFilter: 'blur(8px)' }}
          onClick={() => setHoveredScheme(null)}
          onMouseMove={() => {
            if (backdropActive) {
              setHoveredScheme(null);
            }
          }}
        >
          <div 
            className="w-full max-w-lg mx-4 animate-scaleUp pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => {
              clearTimeout(closeTimerRef.current);
              setBackdropActive(true);
            }}
            onMouseLeave={() => {
              setHoveredScheme(null);
            }}
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_32px_80px_-10px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">

              {/* Gradient Header */}
              <div className={`relative bg-gradient-to-br ${getSchemeTheme(hoveredScheme).grad} px-7 pt-7 pb-10 overflow-hidden`}>
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black/5 rounded-full blur-xl" />
                <div className="absolute top-4 right-8 w-6 h-6 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full border ${getSchemeTheme(hoveredScheme).badge}`}>
                      {hoveredScheme.type === 'Central' 
                        ? (isTelugu ? 'కేంద్ర పథకం' : 'Central Scheme') 
                        : (isTelugu ? 'రాష్ట్ర పథకం' : 'State Scheme')
                      }
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${getSchemeTheme(hoveredScheme).catText}`}>
                      {hoveredScheme.category_name}
                    </span>
                  </div>
                  <h2 className={`text-xl font-extrabold leading-tight line-clamp-2 ${getSchemeTheme(hoveredScheme).titleText}`}>
                    {hoveredScheme.name}
                  </h2>
                  <p className={`text-xs mt-1.5 font-medium ${getSchemeTheme(hoveredScheme).deptText}`}>{hoveredScheme.department_name}</p>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="relative -mt-5 mx-6 grid grid-cols-3 gap-3 z-10">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-emerald-100 dark:border-slate-700 p-3 text-center">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">💰 {isTelugu ? 'సహాయం' : 'Aid'}</p>
                  <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                    {hoveredScheme.financial_assistance_amount > 0
                      ? `₹${Number(hoveredScheme.financial_assistance_amount).toLocaleString('en-IN')}`
                      : (isTelugu ? 'సబ్సిడీ' : 'Subsidy')}
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-blue-100 dark:border-slate-700 p-3 text-center">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">🎂 {isTelugu ? 'వయస్సు' : 'Age'}</p>
                  <p className="text-sm font-extrabold text-blue-700 dark:text-blue-300">
                    {hoveredScheme.min_age}–{hoveredScheme.max_age} <span className="text-[10px]">{isTelugu ? 'సం' : 'yrs'}</span>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-violet-100 dark:border-slate-700 p-3 text-center">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">⏱ {isTelugu ? 'సమయం' : 'Time'}</p>
                  <p className="text-[11px] font-extrabold text-violet-700 dark:text-violet-300">
                    {hoveredScheme.processing_time || (isTelugu ? '15–30 రోజులు' : '15–30 days')}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="px-7 pb-7 pt-5 space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {hoveredScheme.description}
                </p>
                <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4">
                  <span className="text-xl flex-shrink-0">✅</span>
                  <div>
                    <p className="text-[10px] font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">
                      {isTelugu ? 'అర్హత ప్రమాణాలు' : 'Eligibility Criteria'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {hoveredScheme.eligibility_criteria || (isTelugu ? 'అన్ని అర్హులైన భారత పౌరులకు.' : 'Open to all eligible citizens of India.')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4">
                  <span className="text-xl flex-shrink-0">📋</span>
                  <div>
                    <p className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                      {isTelugu ? 'అవసరమైన పత్రాలు' : 'Required Documents'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {hoveredScheme.required_documents || (isTelugu ? 'ఆధార్ కార్డ్, రేషన్ కార్డ్, బ్యాంక్ పాస్‌బుక్.' : 'Aadhaar Card, BPL Ration Card, Bank Passbook.')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-base">👇</span>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                    {isTelugu
                      ? '"వివరాలు చూడండి" నొక్కి పూర్తి వివరాలు & దరఖాస్తు చేసుకోండి'
                      : 'Click "View Details" on the card for full info & apply'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
