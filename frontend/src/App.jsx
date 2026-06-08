import React, { useState, useEffect } from 'react';
import { Sprout, GraduationCap, HeartPulse, Briefcase, FileText, HelpCircle, Landmark, TrendingUp, Sun, Moon, Sparkles, BookOpen, AlertCircle, Phone, RefreshCw, Bookmark } from 'lucide-react';
import Home from './components/Home';
import Schemes from './components/Schemes';
import Checker from './components/Checker';
import Comparison from './components/Comparison';
import Services from './components/Services';
import Grievances from './components/Grievances';
import Documents from './components/Documents';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import AiAssistant from './components/AiAssistant';
import VoiceOverlay from './components/VoiceOverlay';
import { translateScheme, translateService, translateText } from './utils/translations';
import { API_BASE } from './utils/api';

export default function App() {
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('normal'); // 'normal', 'large', 'xlarge'
  const [bilingual, setBilingual] = useState('EN'); // 'EN' or 'TE' (Telugu)

  // Global Loaded Data
  const [schemes, setSchemes] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Voice Recognition Global State
  const [voiceTarget, setVoiceTarget] = useState(null); // { placeholder: string, callback: (text) => void }

  // States managed globally
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('gov_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareList, setCompareList] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Fetch all database records on mount
  const fetchAllData = async () => {
    try {
      const [schemesRes, servicesRes, categoriesRes, departmentsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/api/schemes`),
        fetch(`${API_BASE}/api/services`),
        fetch(`${API_BASE}/api/categories`),
        fetch(`${API_BASE}/api/departments`),
        fetch(`${API_BASE}/api/stats`)
      ]);

      if (schemesRes.ok && servicesRes.ok && categoriesRes.ok && departmentsRes.ok && statsRes.ok) {
        const [schemesData, servicesData, categoriesData, departmentsData, statsData] = await Promise.all([
          schemesRes.json(),
          servicesRes.json(),
          categoriesRes.json(),
          departmentsRes.json(),
          statsRes.json()
        ]);

        setSchemes(schemesData);
        setServices(servicesData);
        setCategories(categoriesData);
        setDepartments(departmentsData);
        setStats(statsData);
      }
    } catch (error) {
      console.error('Failed to load database records', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Update body dark class
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Apply accessibility text size to document element
  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'large') {
      root.style.fontSize = '18px';
    } else if (textSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [textSize]);

  // Save bookmarks to localStorage
  const toggleBookmark = (id) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter(bId => bId !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    localStorage.setItem('gov_bookmarks', JSON.stringify(updated));
  };

  // Compare schemes list management (max 3)
  const toggleCompare = (scheme) => {
    const exists = compareList.some(item => item.id === scheme.id);
    if (exists) {
      setCompareList(compareList.filter(item => item.id !== scheme.id));
    } else {
      if (compareList.length >= 3) {
        alert(bilingual === 'EN' 
          ? 'You can compare a maximum of 3 schemes side-by-side. Please remove one first.'
          : 'మీరు ఒకేసారి గరిష్టంగా 3 పథకాలను మాత్రమే పోల్చగలరు. దయచేసి ఒక పథకాన్ని తీసివేయండి.'
        );
        return;
      }
      setCompareList([...compareList, scheme]);
    }
  };

  // Accessibility Font Sizing Styles
  const getTextSizeClass = () => {
    if (textSize === 'large') return 'text-base md:text-lg';
    if (textSize === 'xlarge') return 'text-lg md:text-xl';
    return 'text-sm md:text-base';
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

    const cat = scheme.category_name || '';
    const isCentral = scheme.type === 'Central';

    if (cat.includes('Health') || cat.includes('ఆరోగ్య')) {
      return {
        grad: 'from-rose-50/90 via-pink-50/70 to-fuchsia-50/85 dark:from-rose-950/30 dark:via-pink-950/20 dark:to-fuchsia-950/30',
        titleText: 'text-rose-950 dark:text-rose-100',
        descText: 'text-rose-800/80 dark:text-rose-300/85',
        deptText: 'text-rose-900/70 dark:text-rose-400/70',
        badge: 'bg-rose-100/80 text-rose-700 border-rose-200/50 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800/40',
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
    if (cat.includes('Education') || cat.includes('విద్యా')) {
      return {
        grad: 'from-violet-50/90 via-purple-50/70 to-indigo-50/85 dark:from-violet-950/30 dark:via-purple-950/20 dark:to-indigo-950/30',
        titleText: 'text-violet-955 dark:text-violet-100',
        descText: 'text-violet-800/80 dark:text-violet-300/85',
        deptText: 'text-violet-900/70 dark:text-violet-400/70',
        badge: 'bg-violet-100/80 text-violet-700 border-violet-200/50 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-800/40',
        catText: 'text-violet-700 dark:text-violet-300 font-semibold',
        newBadge: 'bg-violet-200/80 text-violet-850 dark:bg-violet-800/60 dark:text-violet-200',
        hoverStyle: 'hover:border-violet-400 dark:hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10',
        
        modalHeaderBg: 'bg-violet-50/40 dark:bg-violet-950/15',
        modalHighlightBg: 'bg-violet-50/60 dark:bg-violet-950/20',
        modalHighlightBorder: 'border-violet-100 dark:border-violet-900/40',
        modalBlockBg: 'bg-violet-50/20 dark:bg-violet-950/5',
        modalBlockBorder: 'border-violet-100/40 dark:border-violet-900/20',
        iconColor: 'text-violet-600 dark:text-violet-400',
        primaryBtn: 'bg-violet-600 hover:bg-violet-750 dark:bg-violet-600 dark:hover:bg-violet-700'
      };
    }
    if (cat.includes('Agriculture') || cat.includes('వ్యవసాయ')) {
      return {
        grad: 'from-emerald-50/90 via-teal-50/70 to-cyan-50/85 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30',
        titleText: 'text-emerald-955 dark:text-emerald-100',
        descText: 'text-emerald-800/80 dark:text-emerald-300/85',
        deptText: 'text-emerald-900/70 dark:text-emerald-400/70',
        badge: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800/40',
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
    if (cat.includes('Pension') || cat.includes('పింఛన్')) {
      return {
        grad: 'from-amber-50/90 via-orange-50/70 to-red-50/85 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-red-950/30',
        titleText: 'text-amber-955 dark:text-amber-100',
        descText: 'text-amber-800/80 dark:text-amber-300/85',
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
    if (cat.includes('Women') || cat.includes('మహిళా')) {
      return {
        grad: 'from-pink-50/90 via-rose-50/70 to-red-50/85 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-red-950/30',
        titleText: 'text-pink-955 dark:text-pink-100',
        descText: 'text-pink-800/80 dark:text-pink-300/85',
        deptText: 'text-pink-900/70 dark:text-pink-400/70',
        badge: 'bg-pink-100/80 text-pink-700 border-pink-200/50 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-800/40',
        catText: 'text-pink-700 dark:text-pink-300 font-semibold',
        newBadge: 'bg-pink-200/80 text-pink-800 dark:bg-pink-800/60 dark:text-pink-200',
        hoverStyle: 'hover:border-pink-400 dark:hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/10',
        
        modalHeaderBg: 'bg-pink-50/40 dark:bg-pink-950/15',
        modalHighlightBg: 'bg-pink-50/60 dark:bg-pink-950/20',
        modalHighlightBorder: 'border-pink-100 dark:border-pink-900/40',
        modalBlockBg: 'bg-pink-50/20 dark:bg-pink-950/5',
        modalBlockBorder: 'border-pink-100/40 dark:border-pink-900/20',
        iconColor: 'text-pink-600 dark:text-pink-400',
        primaryBtn: 'bg-pink-600 hover:bg-pink-750 dark:bg-pink-600 dark:hover:bg-pink-700'
      };
    }
    if (cat.includes('Finance') || cat.includes('ఆర్థిక') || cat.includes('Financial')) {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-955 dark:text-blue-100',
        descText: 'text-blue-800/80 dark:text-blue-300/85',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-800 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-700 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-800 dark:bg-blue-800/60 dark:text-blue-200',
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
    if (cat.includes('Employment') || cat.includes('ఉపాధి')) {
      return {
        grad: 'from-sky-50/90 via-blue-50/70 to-indigo-50/85 dark:from-sky-950/30 dark:via-blue-950/20 dark:to-indigo-950/30',
        titleText: 'text-sky-955 dark:text-sky-100',
        descText: 'text-sky-800/80 dark:text-sky-300/85',
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
    if (cat.includes('Social') || cat.includes('సామాజిక')) {
      return {
        grad: 'from-teal-50/90 via-emerald-50/70 to-green-50/85 dark:from-teal-950/30 dark:via-emerald-950/20 dark:to-green-950/30',
        titleText: 'text-teal-955 dark:text-teal-100',
        descText: 'text-teal-800/80 dark:text-teal-300/85',
        deptText: 'text-teal-900/70 dark:text-teal-400/70',
        badge: 'bg-teal-100/80 text-teal-700 border-teal-200/50 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800/40',
        catText: 'text-teal-700 dark:text-teal-300 font-semibold',
        newBadge: 'bg-teal-200/80 text-teal-800 dark:bg-teal-800/60 dark:text-teal-200',
        hoverStyle: 'hover:border-teal-400 dark:hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10',
        
        modalHeaderBg: 'bg-teal-50/40 dark:bg-teal-950/15',
        modalHighlightBg: 'bg-teal-50/60 dark:bg-teal-950/20',
        modalHighlightBorder: 'border-teal-100 dark:border-teal-900/40',
        modalBlockBg: 'bg-teal-50/20 dark:bg-teal-950/5',
        modalBlockBorder: 'border-teal-100/40 dark:border-teal-900/20',
        iconColor: 'text-teal-600 dark:text-teal-400',
        primaryBtn: 'bg-teal-600 hover:bg-teal-750 dark:bg-teal-600 dark:hover:bg-teal-700'
      };
    }
    if (cat.includes('Skill') || cat.includes('నైపుణ్యాలు')) {
      return {
        grad: 'from-orange-50/90 via-amber-50/70 to-yellow-50/85 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/30',
        titleText: 'text-orange-955 dark:text-orange-100',
        descText: 'text-orange-800/80 dark:text-orange-300/85',
        deptText: 'text-orange-900/70 dark:text-orange-400/70',
        badge: 'bg-orange-100/80 text-orange-700 border-orange-200/50 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/40',
        catText: 'text-orange-700 dark:text-orange-300 font-semibold',
        newBadge: 'bg-orange-200/80 text-orange-800 dark:bg-orange-800/60 dark:text-orange-200',
        hoverStyle: 'hover:border-orange-400 dark:hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10',
        
        modalHeaderBg: 'bg-orange-50/40 dark:bg-orange-950/15',
        modalHighlightBg: 'bg-orange-50/60 dark:bg-orange-950/20',
        modalHighlightBorder: 'border-orange-100 dark:border-orange-900/40',
        modalBlockBg: 'bg-orange-50/20 dark:bg-orange-950/5',
        modalBlockBorder: 'border-orange-100/40 dark:border-orange-900/20',
        iconColor: 'text-orange-600 dark:text-orange-400',
        primaryBtn: 'bg-orange-600 hover:bg-orange-750 dark:bg-orange-600 dark:hover:bg-orange-700'
      };
    }
    if (cat.includes('Entrepreneurship') || cat.includes('వ్యాపారాలు')) {
      return {
        grad: 'from-fuchsia-50/90 via-violet-50/70 to-purple-50/85 dark:from-fuchsia-950/30 dark:via-violet-950/20 dark:to-purple-950/30',
        titleText: 'text-fuchsia-955 dark:text-fuchsia-100',
        descText: 'text-fuchsia-800/80 dark:text-fuchsia-300/85',
        deptText: 'text-fuchsia-900/70 dark:text-fuchsia-400/70',
        badge: 'bg-fuchsia-100/80 text-fuchsia-700 border-fuchsia-200/50 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:border-fuchsia-800/40',
        catText: 'text-fuchsia-700 dark:text-fuchsia-300 font-semibold',
        newBadge: 'bg-fuchsia-200/80 text-fuchsia-800 dark:bg-fuchsia-800/60 dark:text-fuchsia-200',
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
    if (cat.includes('Housing') || cat.includes('గృహ')) {
      return {
        grad: 'from-slate-100 via-slate-100 to-slate-200/70 dark:from-slate-900 dark:via-slate-800/70 dark:to-slate-900/90',
        titleText: 'text-slate-950 dark:text-slate-100',
        descText: 'text-slate-700/90 dark:text-slate-300/90',
        deptText: 'text-slate-800/70 dark:text-slate-400/70',
        badge: 'bg-slate-200 text-slate-750 border-slate-300/55 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/40',
        catText: 'text-slate-750 dark:text-slate-300 font-semibold',
        newBadge: 'bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
        hoverStyle: 'hover:border-slate-400 dark:hover:border-slate-500/40 hover:shadow-lg hover:shadow-slate-500/10',
        
        modalHeaderBg: 'bg-slate-100/60 dark:bg-slate-800/30',
        modalHighlightBg: 'bg-slate-100 dark:bg-slate-800/40',
        modalHighlightBorder: 'border-slate-200 dark:border-slate-700',
        modalBlockBg: 'bg-slate-50 dark:bg-slate-800/10',
        modalBlockBorder: 'border-slate-200/50 dark:border-slate-850',
        iconColor: 'text-slate-600 dark:text-slate-400',
        primaryBtn: 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600'
      };
    }

    if (isCentral) {
      return {
        grad: 'from-orange-50/90 via-amber-50/70 to-yellow-50/85 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/30',
        titleText: 'text-orange-955 dark:text-orange-100',
        descText: 'text-orange-800/80 dark:text-orange-300/85',
        deptText: 'text-orange-900/70 dark:text-orange-400/70',
        badge: 'bg-orange-100/80 text-orange-700 border-orange-200/50 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/40',
        catText: 'text-orange-700 dark:text-orange-300 font-semibold',
        newBadge: 'bg-orange-200/80 text-orange-800 dark:bg-orange-800/60 dark:text-orange-200',
        hoverStyle: 'hover:border-orange-400 dark:hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10',
        
        modalHeaderBg: 'bg-orange-50/40 dark:bg-orange-950/15',
        modalHighlightBg: 'bg-orange-50/60 dark:bg-orange-950/20',
        modalHighlightBorder: 'border-orange-100 dark:border-orange-900/40',
        modalBlockBg: 'bg-orange-50/20 dark:bg-orange-950/5',
        modalBlockBorder: 'border-orange-100/40 dark:border-orange-900/20',
        iconColor: 'text-orange-600 dark:text-orange-400',
        primaryBtn: 'bg-orange-600 hover:bg-orange-750 dark:bg-orange-600 dark:hover:bg-orange-700'
      };
    } else {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-955 dark:text-blue-100',
        descText: 'text-blue-800/80 dark:text-blue-300/85',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-800 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-700 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-800 dark:bg-blue-800/60 dark:text-blue-200',
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


  // Speech Recognition Starter Function
  const startListening = (placeholder, callback) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(bilingual === 'EN'
        ? 'Speech recognition is not supported in your browser. Please use Google Chrome, Edge, or Safari.'
        : 'మీ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ సపోర్ట్ లేదు. దయచేసి క్రోమ్, ఎడ్జ్ లేదా సఫారీని ఉపయోగించండి.'
      );
      return;
    }
    setVoiceTarget({ placeholder, callback });
  };

  // Translate lists if bilingual is 'TE'
  const translatedSchemes = schemes.map(s => translateScheme(s, bilingual));
  const translatedServices = services.map(srv => translateService(srv, bilingual));
  const translatedCategories = categories.map(c => ({
    ...c,
    name: translateText(c.name, bilingual)
  }));
  const translatedDepartments = departments.map(d => ({
    ...d,
    name: translateText(d.name, bilingual)
  }));
  const translatedSelectedScheme = selectedScheme ? translateScheme(selectedScheme, bilingual) : null;

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} ${getTextSizeClass()}`}>
      
      {/* 1. TOP AERIAL ACCESSIBILITY RIBBON (NO-PRINT) */}
      <div className="no-print bg-gradient-to-r from-[#0d1f3c] via-[#162d50] to-[#0d1f3c] text-white text-[11px] font-semibold py-2.5 px-4 sm:px-8 flex justify-between items-center border-b-[3px] border-b-transparent" style={{ borderImage: 'linear-gradient(to right, #FF9933, #FFFFFF, #138808) 1' }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 sm:gap-4">
            {/* Andhra Pradesh Government Emblem + Label */}
            <span className="flex items-center gap-1.5 sm:gap-2.5 bg-white/[0.06] backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-1.5 rounded-lg border border-white/10 group cursor-default hover:bg-white/[0.1] transition-all duration-300">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-green-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Government of Andhra Pradesh" className="w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-300">
                  <circle cx="50" cy="50" r="48" fill="white" stroke="#1a6b1a" strokeWidth="3"/>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1a6b1a" strokeWidth="2"/>
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#f5a623" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="22" fill="#f5a623" stroke="#1a6b1a" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="14" fill="#1a6b1a"/>
                  <circle cx="50" cy="50" r="8" fill="#f5a623"/>
                  <rect x="38" y="62" width="24" height="4" rx="2" fill="#8B2500"/>
                  <rect x="44" y="55" width="4" height="10" fill="#c0392b"/>
                  <rect x="52" y="55" width="4" height="10" fill="#f5a623"/>
                  <rect x="48" y="52" width="4" height="13" fill="#333"/>
                  <circle cx="50" cy="71" r="5" fill="none" stroke="#000080" strokeWidth="1.2"/>
                  <circle cx="50" cy="71" r="1" fill="#000080"/>
                  <path id="arcAP" d="M 18,50 A 32,32 0 0,1 82,50" fill="none"/>
                  <text fontSize="7" fill="#1a6b1a" fontWeight="bold" fontFamily="serif">
                    <textPath href="#arcAP" startOffset="5%">GOVT OF ANDHRA PRADESH</textPath>
                  </text>
                </svg>
              </div>
              <span className="hidden sm:inline text-[13px] font-extrabold text-white whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {bilingual === 'EN' ? 'Government of Andhra Pradesh' : 'ఆంధ్రప్రదేశ్ ప్రభుత్వం'}
              </span>
            </span>

            <span className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent"></span>

            {/* Ashoka Emblem - India + Label */}
            <span className="flex items-center gap-1.5 sm:gap-2.5 bg-white/[0.06] backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-1.5 rounded-lg border border-white/10 group cursor-default hover:bg-white/[0.1] transition-all duration-300">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" role="img" aria-label="Emblem of India" className="h-[30px] sm:h-[38px] w-auto relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-300">
                  <g fill="white" stroke="white" strokeWidth="1">
                    {/* Center lion (front facing) */}
                    <ellipse cx="100" cy="52" rx="22" ry="28"/>
                    {/* Lion head */}
                    <circle cx="100" cy="30" r="18"/>
                    {/* Mane */}
                    <ellipse cx="100" cy="38" rx="26" ry="20"/>
                    {/* Lion ears */}
                    <ellipse cx="84" cy="18" rx="6" ry="8"/>
                    <ellipse cx="116" cy="18" rx="6" ry="8"/>
                    {/* Eyes */}
                    <circle cx="92" cy="28" r="3" fill="#0d1f3c"/>
                    <circle cx="108" cy="28" r="3" fill="#0d1f3c"/>
                    <circle cx="92" cy="28" r="1.5" fill="white"/>
                    <circle cx="108" cy="28" r="1.5" fill="white"/>
                    {/* Nose & mouth */}
                    <ellipse cx="100" cy="36" rx="5" ry="3" fill="#e0e0e0" stroke="none"/>
                    <line x1="100" y1="39" x2="100" y2="43" stroke="#0d1f3c" strokeWidth="1"/>
                    {/* Left lion (side view) */}
                    <ellipse cx="62" cy="58" rx="18" ry="24"/>
                    <circle cx="55" cy="38" r="14"/>
                    <ellipse cx="58" cy="46" rx="20" ry="16"/>
                    <ellipse cx="46" cy="28" rx="5" ry="7"/>
                    {/* Right lion (side view) */}
                    <ellipse cx="138" cy="58" rx="18" ry="24"/>
                    <circle cx="145" cy="38" r="14"/>
                    <ellipse cx="142" cy="46" rx="20" ry="16"/>
                    <ellipse cx="154" cy="28" rx="5" ry="7"/>
                    {/* Front legs */}
                    <rect x="80" y="65" width="8" height="30" rx="3"/>
                    <rect x="112" y="65" width="8" height="30" rx="3"/>
                    {/* Side legs */}
                    <rect x="50" y="70" width="7" height="25" rx="3"/>
                    <rect x="143" y="70" width="7" height="25" rx="3"/>
                    {/* Abacus / Capital band */}
                    <rect x="38" y="92" width="124" height="14" rx="3"/>
                    {/* Decorative band details */}
                    <line x1="38" y1="96" x2="162" y2="96" stroke="#0d1f3c" strokeWidth="0.8"/>
                    <line x1="38" y1="100" x2="162" y2="100" stroke="#0d1f3c" strokeWidth="0.8"/>
                    {/* Dharma Chakra on abacus */}
                    <circle cx="100" cy="99" r="6" fill="#0d1f3c" stroke="white" strokeWidth="1.2"/>
                    <circle cx="100" cy="99" r="2" fill="white"/>
                    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
                      <line key={i}
                        x1={100 + 2.5*Math.cos(a*Math.PI/180)}
                        y1={99 + 2.5*Math.sin(a*Math.PI/180)}
                        x2={100 + 5.5*Math.cos(a*Math.PI/180)}
                        y2={99 + 5.5*Math.sin(a*Math.PI/180)}
                        stroke="white" strokeWidth="0.7"/>
                    ))}
                    {/* Bull (left of chakra) */}
                    <ellipse cx="68" cy="99" rx="10" ry="5" fill="#0d1f3c" stroke="white" strokeWidth="0.8"/>
                    <ellipse cx="60" cy="97" rx="4" ry="3" fill="#0d1f3c" stroke="white" strokeWidth="0.6"/>
                    {/* Horse (right of chakra) */}
                    <ellipse cx="132" cy="99" rx="10" ry="5" fill="#0d1f3c" stroke="white" strokeWidth="0.8"/>
                    <ellipse cx="140" cy="97" rx="4" ry="3" fill="#0d1f3c" stroke="white" strokeWidth="0.6"/>
                    {/* Lotus bell capital */}
                    <path d="M 42,106 Q 50,130 100,135 Q 150,130 158,106 Z"/>
                    {/* Lotus petals */}
                    <path d="M 55,118 Q 62,112 70,118" fill="none" stroke="#0d1f3c" strokeWidth="0.8"/>
                    <path d="M 70,118 Q 78,112 86,118" fill="none" stroke="#0d1f3c" strokeWidth="0.8"/>
                    <path d="M 86,118 Q 94,112 100,118" fill="none" stroke="#0d1f3c" strokeWidth="0.8"/>
                    <path d="M 100,118 Q 106,112 114,118" fill="none" stroke="#0d1f3c" strokeWidth="0.8"/>
                    <path d="M 114,118 Q 122,112 130,118" fill="none" stroke="#0d1f3c" strokeWidth="0.8"/>
                    <path d="M 130,118 Q 138,112 145,118" fill="none" stroke="#0d1f3c" strokeWidth="0.8"/>
                    {/* Base */}
                    <rect x="55" y="132" width="90" height="6" rx="2"/>
                    {/* Pedestal */}
                    <path d="M 60,138 L 50,155 L 150,155 L 140,138 Z"/>
                    <line x1="55" y1="145" x2="145" y2="145" stroke="#0d1f3c" strokeWidth="0.6"/>
                    <line x1="52" y1="150" x2="148" y2="150" stroke="#0d1f3c" strokeWidth="0.6"/>
                  </g>
                  {/* Satyamev Jayate text */}
                  <text x="100" y="178" textAnchor="middle" fontSize="18" fill="white" fontFamily="serif" fontWeight="bold">सत्यమేవ జయతే</text>
                </svg>
              </div>
              <span className="hidden sm:inline text-[13px] font-extrabold text-white whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {bilingual === 'EN' ? 'Government of India' : 'భారత ప్రభుత్వం'}
              </span>
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Font Sizing Controls */}
          <div className="flex items-center gap-1 border-r border-slate-700 pr-3">
            <span className="hidden sm:inline text-slate-400 mr-1.5">
              {bilingual === 'EN' ? 'Text Size:' : 'అక్షరాల పరిమాణం:'}
            </span>
            <button onClick={() => setTextSize('normal')} className={`px-2 py-0.5 rounded transition ${textSize === 'normal' ? 'bg-gov-blue text-white' : 'hover:bg-white/10'}`}>A</button>
            <button onClick={() => setTextSize('large')} className={`px-2 py-0.5 rounded transition ${textSize === 'large' ? 'bg-gov-blue text-white font-bold' : 'hover:bg-white/10'}`}>A+</button>
            <button onClick={() => setTextSize('xlarge')} className={`px-2 py-0.5 rounded transition ${textSize === 'xlarge' ? 'bg-gov-blue text-white font-black' : 'hover:bg-white/10'}`}>A++</button>
          </div>

          {/* Bilingual selection */}
          <div className="flex items-center gap-1 border-r border-slate-700 pr-3">
            <button onClick={() => setBilingual('EN')} className={`px-2 py-0.5 rounded transition ${bilingual === 'EN' ? 'bg-orange-600 text-white' : 'hover:bg-white/10'}`}>English</button>
            <button onClick={() => setBilingual('TE')} className={`px-2 py-0.5 rounded transition ${bilingual === 'TE' ? 'bg-orange-600 text-white' : 'hover:bg-white/10'}`}>తెలుగు</button>
          </div>

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-1 hover:text-orange-200 transition"
            title="Toggle Contrast"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {darkMode 
                ? (bilingual === 'EN' ? 'Light' : 'వెలుగు') 
                : (bilingual === 'EN' ? 'Contrast' : 'రాత్రి థీమ్')
              }
            </span>
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER (NATIONAL EMBLEM & WEB TITLE) */}
      <header className="relative bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800/80 shadow-sm py-3 px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500"></div>

        <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
          {/* Emblem Icon / Logo placeholder */}
          <div className="flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-md shadow-blue-500/10 dark:shadow-blue-500/5 border border-blue-400/20 hover:rotate-6 transition-transform duration-300 group cursor-pointer">
            <Landmark className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 mb-0.5">
              <Sparkles className="w-2.5 h-2.5 text-orange-500 animate-pulse" />
              {bilingual === 'EN' ? 'Sachivalayam & CSP Digital Hub' : 'సచివాలయం & సిఎస్పి డిజిటల్ కేంద్రం'}
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-0.5 leading-snug tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-200">
              {bilingual === 'EN' ? 'Unified Government Services Portal' : 'సమన్వయ ప్రభుత్వ సేవల పోర్టల్'}
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 mt-2.5 max-w-xl font-semibold leading-relaxed text-center sm:text-left border border-orange-500/15 sm:border-0 sm:border-l-2 border-orange-500/80 px-4 py-2 sm:py-1.5 sm:pl-3 sm:pr-0 bg-orange-500/[0.04] sm:bg-gradient-to-r sm:from-orange-500/[0.06] sm:to-transparent dark:bg-orange-500/[0.02] dark:sm:from-orange-500/[0.03] rounded-lg sm:rounded-none sm:rounded-r-md">
              {bilingual === 'EN' 
                ? 'Single window for schemes discovery, citizen services directory, and grievance drafting.'
                : 'పథకాలు, పౌర సేవలు మరియు గ్రీవెన్స్ కొరకు ఒకే ఒక వేదిక.'
              }
            </p>
          </div>
        </div>

        {/* Contact Numbers banner */}
        <div className="no-print hidden lg:flex items-center gap-2.5 bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-800/30 dark:to-slate-900/30 border border-slate-100 dark:border-slate-800/80 py-2 px-3 rounded-xl shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.02] group">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-sm group-hover:animate-bounce">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs">
            <span className="text-slate-400 dark:text-slate-500 block uppercase font-bold text-[8px] tracking-wider">
              {bilingual === 'EN' ? 'Sachivalayam Help desk' : 'సచివాలయం సహాయ కేంద్రం'}
            </span>
            <span className="font-extrabold text-[11px] text-slate-800 dark:text-slate-200">
              {bilingual === 'EN' ? 'Toll-Free: 1902 / 155251' : 'టోల్-ఫ్రీ: 1902 / 155251'}
            </span>
          </div>
        </div>
      </header>

      {/* 3. NAVIGATION TAB BAR (NO-PRINT) */}
      <nav className="no-print bg-[#0a1e38] text-white sticky top-0 z-40 shadow-md overflow-x-auto flex scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 w-full flex">
          {[
            { id: 'home', label: bilingual === 'EN' ? 'Home' : 'హోమ్', icon: Sprout },
            { id: 'schemes', label: bilingual === 'EN' ? 'Schemes Database' : 'పథకాల వివరాలు', icon: BookOpen },
            { id: 'checker', label: bilingual === 'EN' ? 'Eligibility Checker' : 'అర్హత పరిశీలన', icon: HelpCircle },
            { id: 'comparison', label: bilingual === 'EN' ? `Scheme Comparison (${compareList.length})` : `పోలిక పరికరం (${compareList.length})`, icon: Sparkles, badge: compareList.length > 0 },
            { id: 'services', label: bilingual === 'EN' ? 'Citizen Services' : 'డిజిటల్ సేవలు', icon: Briefcase },
            { id: 'grievance', label: bilingual === 'EN' ? 'Grievance Assistant' : 'గ్రీవెన్స్ సహాయకురాలు', icon: FileText },
            { id: 'documents', label: bilingual === 'EN' ? 'Document Center' : 'పత్రాల నిధి', icon: GraduationCap },
            { id: 'dashboard', label: bilingual === 'EN' ? 'Welfare Dashboard' : 'విశ్లేషణలు', icon: TrendingUp },
            { id: 'admin', label: bilingual === 'EN' ? 'Admin Panel' : 'అడ్మిన్ ప్యానెల్', icon: Landmark },
            { id: 'ai-assistant', label: bilingual === 'EN' ? 'AI Assistant' : 'AI సహాయకుడు', icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = page === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setPage(tab.id)}
                className={`py-3.5 px-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition border-b-4 ${
                  active 
                    ? 'border-orange-500 bg-white/10 text-white font-extrabold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-orange-400" />
                {tab.label}
                {tab.badge && (
                  <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1 animate-pulse">
                    {compareList.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 4. MAIN BODY CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        
        {loading ? (
          <div className="py-24 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-8 h-8 text-gov-blue animate-spin" />
            <span>
              {bilingual === 'EN' 
                ? 'Connecting to local secure database, fetching e-Governance records...'
                : 'డేటాబేస్కు కనెక్ట్ అవుతోంది, సమాచారాన్ని సేకరిస్తోంది...'
              }
            </span>
          </div>
        ) : (
          <>
            {page === 'home' && (
              <Home
                bilingual={bilingual}
                stats={stats}
                schemes={translatedSchemes}
                services={translatedServices}
                setPage={setPage}
                setSelectedScheme={setSelectedScheme}
                setGlobalSearch={setGlobalSearch}
                setCategoryFilter={setCategoryFilter}
              />
            )}
            
            {page === 'schemes' && (
              <Schemes
                bilingual={bilingual}
                schemes={translatedSchemes}
                categories={translatedCategories}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
                compareList={compareList}
                toggleCompare={toggleCompare}
                setSelectedScheme={setSelectedScheme}
                selectedScheme={translatedSelectedScheme}
                globalSearch={globalSearch}
                setGlobalSearch={setGlobalSearch}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                startListening={startListening}
              />
            )}

            {page === 'checker' && (
              <Checker
                bilingual={bilingual}
                schemes={translatedSchemes}
                toggleCompare={toggleCompare}
                compareList={compareList}
                setSelectedScheme={setSelectedScheme}
                startListening={startListening}
              />
            )}

            {page === 'comparison' && (
              <Comparison
                bilingual={bilingual}
                compareList={compareList.map(s => translateScheme(s, bilingual))}
                toggleCompare={toggleCompare}
                schemes={translatedSchemes}
                setPage={setPage}
              />
            )}

            {page === 'services' && (
              <Services
                bilingual={bilingual}
                services={translatedServices}
                categories={translatedCategories}
                departments={translatedDepartments}
              />
            )}

            {page === 'grievance' && (
              <Grievances 
                bilingual={bilingual} 
                startListening={startListening}
              />
            )}

            {page === 'documents' && (
              <Documents bilingual={bilingual} />
            )}

            {page === 'dashboard' && (
              <Dashboard
                bilingual={bilingual}
                stats={stats}
                schemes={translatedSchemes}
                services={translatedServices}
                setPage={setPage}
                setSelectedScheme={setSelectedScheme}
              />
            )}

            {page === 'admin' && (
              <Admin
                bilingual={bilingual}
                categories={translatedCategories}
                departments={translatedDepartments}
                fetchAllData={fetchAllData}
                startListening={startListening}
              />
            )}

            {page === 'ai-assistant' && (
              <AiAssistant
                bilingual={bilingual}
                schemes={translatedSchemes}
                services={translatedServices}
                categories={translatedCategories}
                departments={translatedDepartments}
                setSelectedScheme={setSelectedScheme}
                setPage={setPage}
                startListening={startListening}
              />
            )}
          </>
        )}
      </main>

      {/* 5. GLOBAL SCHEME DETAILS MODAL (ACCESSIBLE FROM EVERY PAGE) */}
      {translatedSelectedScheme && page !== 'schemes' && (
        <div 
          onClick={() => setSelectedScheme(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleUp"
          >
            {(() => {
              const theme = getSchemeTheme(translatedSelectedScheme);
              return (
                <>
                  {/* Modal Header */}
                  <div className={`p-6 ${theme.modalHeaderBg} border-b ${theme.modalHighlightBorder} flex justify-between items-start`}>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.badge}`}>
                          {translatedSelectedScheme.type === 'Central' 
                            ? (bilingual === 'EN' ? 'Central Scheme' : 'కేంద్ర పథకం') 
                            : (bilingual === 'EN' ? 'State Scheme' : 'రాష్ట్ర పథకం')
                          }
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme.catText}`}>{translatedSelectedScheme.category_name}</span>
                      </div>
                      <h2 className={`text-lg sm:text-xl font-black ${theme.titleText}`}>
                        {translatedSelectedScheme.name}
                      </h2>
                      <p className={`text-xs font-semibold ${theme.deptText} mt-0.5`}>{translatedSelectedScheme.department_name}</p>
                    </div>
                    <button
                      onClick={() => setSelectedScheme(null)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${theme.modalHighlightBg} p-5 rounded-2xl border ${theme.modalHighlightBorder}`}>
                      <div>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 block uppercase font-bold tracking-wider">
                          {bilingual === 'EN' ? 'Financial Aid' : 'ఆర్థిక సహాయం'}
                        </span>
                        <span className={`text-sm font-black ${theme.titleText}`}>
                          {translatedSelectedScheme.financial_assistance_amount && translatedSelectedScheme.financial_assistance_amount > 0 
                            ? `₹${Number(translatedSelectedScheme.financial_assistance_amount).toLocaleString('en-IN')}` 
                            : (bilingual === 'EN' ? 'Subsidies/Services' : 'సబ్సిడీలు/సేవలు')
                          }
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 block uppercase font-bold tracking-wider">
                          {bilingual === 'EN' ? 'Processing SLA' : 'ప్రక్రియ సమయం'}
                        </span>
                        <span className={`text-sm font-bold ${theme.titleText}`}>
                          {translatedSelectedScheme.processing_time || (bilingual === 'EN' ? '15-30 days' : '15-30 రోజులు')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-455 dark:text-slate-500 block uppercase font-bold tracking-wider">
                          {bilingual === 'EN' ? 'Age Limit' : 'వయస్సు పరిమితి'}
                        </span>
                        <span className={`text-sm font-bold ${theme.titleText}`}>
                          {translatedSelectedScheme.min_age} - {translatedSelectedScheme.max_age} {bilingual === 'EN' ? 'Years' : 'సంవత్సరాలు'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider`}>
                        {bilingual === 'EN' ? 'Description' : 'పథకం వివరణ'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-305 leading-relaxed font-light">{translatedSelectedScheme.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider`}>
                        {bilingual === 'EN' ? 'Benefits' : 'ప్రయోజనాలు'}
                      </h3>
                      <p className={`text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed ${theme.modalBlockBg} p-4 rounded-xl border ${theme.modalBlockBorder}`}>{translatedSelectedScheme.benefits}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider`}>
                        {bilingual === 'EN' ? 'Eligibility Criteria' : 'అర్హత ప్రమాణాలు'}
                      </h3>
                      <p className={`text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed ${theme.modalBlockBg} p-4 rounded-xl border ${theme.modalBlockBorder}`}>{translatedSelectedScheme.eligibility_criteria}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider flex items-center gap-1.5`}>
                          <Bookmark className={`w-4 h-4 ${theme.iconColor}`} />
                          {bilingual === 'EN' ? 'Required Documents' : 'అవసరమైన పత్రాలు'}
                        </h3>
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800 leading-relaxed">
                          {translatedSelectedScheme.required_documents ? (
                            <ul className="list-disc pl-4 space-y-1">
                              {translatedSelectedScheme.required_documents.split(',').map((doc, idx) => <li key={idx}>{doc.trim()}</li>)}
                            </ul>
                          ) : (bilingual === 'EN' ? 'Aadhaar Card, BPL Ration Card, Bank details.' : 'ఆధార్ కార్డ్, బిపిఎల్ రేషన్ కార్డ్, బ్యాంక్ వివరాలు.')}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider flex items-center gap-1.5`}>
                          <Landmark className={`w-4 h-4 ${theme.iconColor}`} />
                          {bilingual === 'EN' ? 'Application Steps' : 'దరఖాస్తు విధానం'}
                        </h3>
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800 leading-relaxed">
                          {translatedSelectedScheme.application_process || (bilingual === 'EN' ? 'Apply online or visit Gram/Ward Sachivalayam.' : 'ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి లేదా సచివాలయాన్ని సందర్శించండి.')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-6 border-t ${theme.modalHighlightBorder} flex justify-end gap-3 bg-slate-50/20 dark:bg-slate-950/20`}>
                    <button onClick={() => toggleCompare(translatedSelectedScheme)} className="border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                      {compareList.some(item => item.id === translatedSelectedScheme.id) 
                        ? (bilingual === 'EN' ? 'Added to Compare' : 'పోలికకు చేర్చబడింది') 
                        : (bilingual === 'EN' ? 'Add to Compare' : 'పోలికకు జోడించు')
                      }
                    </button>
                    <a href={translatedSelectedScheme.official_website} target="_blank" rel="noreferrer" className={`${theme.primaryBtn} text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition`}>
                      {bilingual === 'EN' ? 'Apply on Portal' : 'వెబ్‌సైట్‌లో దరఖాస్తు'} &rarr;
                    </a>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* 6. SYSTEM FOOTER */}
      <footer className="bg-[#0b172a] text-slate-400 text-xs py-12 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Emblem & Portal Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <Landmark className="w-8 h-8 text-gov-gold" />
              <div>
                <h4 className="font-bold text-white uppercase text-xs sm:text-sm tracking-wide">
                  {bilingual === 'EN' ? 'Unified Government Services Portal' : 'సమన్వయ ప్రభుత్వ సేవల పోర్టల్'}
                </h4>
                <span className="text-[10px] text-slate-500 font-semibold block">
                  {bilingual === 'EN' ? 'Sachivalayam Digital Governance, AP' : 'సచివాలయం డిజిటల్ గవర్నెన్స్, ఆంధ్రప్రదేశ్'}
                </span>
              </div>
            </div>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
              {bilingual === 'EN'
                ? 'Designed as a premium e-Governance solution to help rural and urban citizens discover schemes, access certificates, write formal grievances, and map SDGs. Suitable for CSP and administrative evaluation.'
                : 'గ్రామీణ మరియు పట్టణ పౌరులు పథకాలను కనుగొనడానికి, సర్టిఫికెట్లను పొందడానికి, గ్రీవెన్స్ దాఖలు చేయడానికి మరియు SDG लक्ष्यాలను మ్యాప్ చేయడానికి రూపొందించబడిన ప్రత్యేక ప్రభుత్వ పోర్టల్.'
              }
            </p>
          </div>

          {/* Quick Help Contacts */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              {bilingual === 'EN' ? 'Sachivalayam Help Desk' : 'సచివాలయం సహాయ కేంద్రం'}
            </h4>
            <div className="space-y-2 font-light">
              <p>📞 {bilingual === 'EN' ? 'General Helpline:' : 'సాధారణ హెల్ప్‌లైన్:'} <strong>1902</strong></p>
              <p>🌾 {bilingual === 'EN' ? 'Rythu Seva Kendra (RSK):' : 'రైతు సేవా కేంద్రం (RSK):'} <strong>155251</strong></p>
              <p>🏥 {bilingual === 'EN' ? 'NTR Aarogyaseva Medical:' : 'ఎన్టీఆర్ ఆరోగ్యసేవ హెల్ప్‌లైన్:'} <strong>104</strong></p>
              <p>💬 {bilingual === 'EN' ? 'CPGRAMS Central:' : 'కేంద్ర గ్రీవెన్స్ CPGRAMS:'} <strong>1800111979</strong></p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              {bilingual === 'EN' ? 'Disclaimer' : 'గమనిక'}
            </h4>
            <p className="text-slate-500 font-light leading-relaxed">
              {bilingual === 'EN'
                ? 'This platform provides aggregated links, requirements guidance, and complaint drafting services. Official applications are completed exclusively on official and secure government domains ending in .gov.in or .nic.in.'
                : 'ఈ వేదిక కేవలం పౌరుల అవగాహన కొరకు మరియు గ్రీవెన్స్ డ్రాఫ్టింగ్ కొరకు మాత్రమే. దరఖాస్తులు అధికారిక ప్రభుత్వ వెబ్‌సైట్‌లలో (.gov.in లేదా .nic.in) మాత్రమే పూర్తి చేయాల్సి ఉంటుంది.'
              }
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-6 border-t border-[#1e293b]/70 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-semibold">
          <p>
            {bilingual === 'EN'
              ? `&copy; ${new Date().getFullYear()} e-Governance Division. All Rights Reserved. Built for Sachivalayam CSP evaluation.`
              : `&copy; ${new Date().getFullYear()} ఇ-గవర్నెన్స్ విభాగం. సర్వ హక్కులూ ప్రత్యేకించబడినవి. సచివాలయం CSP మూల్యాంకనం కొరకు నిర్మించబడింది.`
            }
          </p>
          <div className="flex gap-4">
            <a href="https://ap.meeseva.gov.in" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition">MeeSeva AP</a>
            <span>&bull;</span>
            <a href="https://india.gov.in" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition">
              {bilingual === 'EN' ? 'National Portal of India' : 'భారత జాతీయ పోర్టల్'}
            </a>
          </div>
        </div>
      </footer>

      {/* Global Voice Input Overlay */}
      {voiceTarget && (
        <VoiceOverlay
          bilingual={bilingual}
          placeholder={voiceTarget.placeholder}
          onResult={voiceTarget.callback}
          onClose={() => setVoiceTarget(null)}
        />
      )}
    </div>
  );
}
