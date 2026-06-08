import React, { useState, useRef } from 'react';
import { Search, Filter, Bookmark, Plus, Check, ArrowUpDown, ExternalLink, Phone, Calendar, Clock, Landmark, ShieldAlert, Award, Mic, Send, ShieldCheck } from 'lucide-react';

export default function Schemes({
  bilingual,
  schemes,
  categories,
  bookmarks,
  toggleBookmark,
  compareList,
  toggleCompare,
  setSelectedScheme,
  selectedScheme,
  globalSearch,
  setGlobalSearch,
  categoryFilter,
  setCategoryFilter,
  startListening
}) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [applyChatQuery, setApplyChatQuery] = useState('');
  const [applyChatMessages, setApplyChatMessages] = useState([]);
  const [applyChatTyping, setApplyChatTyping] = useState(false);
  // Hover preview popup state
  const [hoveredScheme, setHoveredScheme] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const hoverTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const cancelClose = () => clearTimeout(closeTimerRef.current);
  const scheduleClose = (delay = 200) => {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setHoveredScheme(null), delay);
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

    if (cat.includes('Health')) {
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
        primaryBtn: 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700'
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
        hoverStyle: 'hover:border-violet-400 dark:hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10',
        modalHeaderBg: 'bg-violet-50/40 dark:bg-violet-950/15',
        modalHighlightBg: 'bg-violet-50/60 dark:bg-violet-950/20',
        modalHighlightBorder: 'border-violet-100 dark:border-violet-900/40',
        modalBlockBg: 'bg-violet-50/20 dark:bg-violet-950/5',
        modalBlockBorder: 'border-violet-100/40 dark:border-violet-900/20',
        iconColor: 'text-violet-600 dark:text-violet-400',
        primaryBtn: 'bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700'
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
        hoverStyle: 'hover:border-emerald-400 dark:hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10',
        modalHeaderBg: 'bg-emerald-50/40 dark:bg-emerald-950/15',
        modalHighlightBg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
        modalHighlightBorder: 'border-emerald-100 dark:border-emerald-900/40',
        modalBlockBg: 'bg-emerald-50/20 dark:bg-emerald-950/5',
        modalBlockBorder: 'border-emerald-100/40 dark:border-emerald-900/20',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        primaryBtn: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700'
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
        hoverStyle: 'hover:border-amber-400 dark:hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10',
        modalHeaderBg: 'bg-amber-50/40 dark:bg-amber-950/15',
        modalHighlightBg: 'bg-amber-50/60 dark:bg-amber-950/20',
        modalHighlightBorder: 'border-amber-100 dark:border-amber-900/40',
        modalBlockBg: 'bg-amber-50/20 dark:bg-amber-950/5',
        modalBlockBorder: 'border-amber-100/40 dark:border-amber-900/20',
        iconColor: 'text-amber-600 dark:text-amber-400',
        primaryBtn: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700'
      };
    }
    if (cat.includes('Women Welfare') || cat.includes('Women')) {
      return {
        grad: 'from-pink-50/90 via-rose-50/70 to-red-50/85 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-red-950/30',
        titleText: 'text-pink-950 dark:text-pink-100',
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
        primaryBtn: 'bg-pink-600 hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700'
      };
    }
    if (cat.includes('Financial Inclusion')) {
      return {
        grad: 'from-blue-50/90 via-indigo-50/70 to-violet-50/85 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30',
        titleText: 'text-blue-950 dark:text-blue-100',
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
        primaryBtn: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
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
        hoverStyle: 'hover:border-sky-400 dark:hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10',
        modalHeaderBg: 'bg-sky-50/40 dark:bg-sky-950/15',
        modalHighlightBg: 'bg-sky-50/60 dark:bg-sky-950/20',
        modalHighlightBorder: 'border-sky-100 dark:border-sky-900/40',
        modalBlockBg: 'bg-sky-50/20 dark:bg-sky-950/5',
        modalBlockBorder: 'border-sky-100/40 dark:border-sky-900/20',
        iconColor: 'text-sky-600 dark:text-sky-400',
        primaryBtn: 'bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700'
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
        hoverStyle: 'hover:border-teal-400 dark:hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10',
        modalHeaderBg: 'bg-teal-50/40 dark:bg-teal-950/15',
        modalHighlightBg: 'bg-teal-50/60 dark:bg-teal-950/20',
        modalHighlightBorder: 'border-teal-100 dark:border-teal-900/40',
        modalBlockBg: 'bg-teal-50/20 dark:bg-teal-950/5',
        modalBlockBorder: 'border-teal-100/40 dark:border-teal-900/20',
        iconColor: 'text-teal-600 dark:text-teal-400',
        primaryBtn: 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700'
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
        hoverStyle: 'hover:border-orange-400 dark:hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10',
        modalHeaderBg: 'bg-orange-50/40 dark:bg-orange-950/15',
        modalHighlightBg: 'bg-orange-50/60 dark:bg-orange-950/20',
        modalHighlightBorder: 'border-orange-100 dark:border-orange-900/40',
        modalBlockBg: 'bg-orange-50/20 dark:bg-orange-950/5',
        modalBlockBorder: 'border-orange-100/40 dark:border-orange-900/20',
        iconColor: 'text-orange-600 dark:text-orange-400',
        primaryBtn: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700'
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
        hoverStyle: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-500/40 hover:shadow-lg hover:shadow-fuchsia-500/10',
        modalHeaderBg: 'bg-fuchsia-50/40 dark:bg-fuchsia-950/15',
        modalHighlightBg: 'bg-fuchsia-50/60 dark:bg-fuchsia-950/20',
        modalHighlightBorder: 'border-fuchsia-100 dark:border-fuchsia-900/40',
        modalBlockBg: 'bg-fuchsia-50/20 dark:bg-fuchsia-950/5',
        modalBlockBorder: 'border-fuchsia-100/40 dark:border-fuchsia-900/20',
        iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
        primaryBtn: 'bg-fuchsia-600 hover:bg-fuchsia-700 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700'
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
        hoverStyle: 'hover:border-slate-400 dark:hover:border-slate-500/40 hover:shadow-lg hover:shadow-slate-500/10',
        modalHeaderBg: 'bg-slate-100/60 dark:bg-slate-800/30',
        modalHighlightBg: 'bg-slate-100 dark:bg-slate-800/40',
        modalHighlightBorder: 'border-slate-200 dark:border-slate-700',
        modalBlockBg: 'bg-slate-50 dark:bg-slate-800/10',
        modalBlockBorder: 'border-slate-200/50 dark:border-slate-800',
        iconColor: 'text-slate-600 dark:text-slate-400',
        primaryBtn: 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600'
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
        hoverStyle: 'hover:border-orange-400 dark:hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10',
        modalHeaderBg: 'bg-orange-50/40 dark:bg-orange-950/15',
        modalHighlightBg: 'bg-orange-50/60 dark:bg-orange-950/20',
        modalHighlightBorder: 'border-orange-100 dark:border-orange-900/40',
        modalBlockBg: 'bg-orange-50/20 dark:bg-orange-950/5',
        modalBlockBorder: 'border-orange-100/40 dark:border-orange-900/20',
        iconColor: 'text-orange-600 dark:text-orange-400',
        primaryBtn: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700'
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
        hoverStyle: 'hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10',
        modalHeaderBg: 'bg-blue-50/40 dark:bg-blue-950/15',
        modalHighlightBg: 'bg-blue-50/60 dark:bg-blue-950/20',
        modalHighlightBorder: 'border-blue-100 dark:border-blue-900/40',
        modalBlockBg: 'bg-blue-50/20 dark:bg-blue-950/5',
        modalBlockBorder: 'border-blue-100/40 dark:border-blue-900/20',
        iconColor: 'text-blue-600 dark:text-blue-400',
        primaryBtn: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
      };
    }
  };

  // Dictionary for translations
  const t = {
    title: bilingual === 'EN' ? 'Government Welfare Schemes Database' : 'ప్రభుత్వ సంక్షేమ పథకాల డేటాబేస్',
    subtitle: bilingual === 'EN' ? 'Browse, search, bookmark, and compare over 100+ Central and Andhra Pradesh welfare programs.' : '100+ పైగా కేంద్ర మరియు ఆంధ్రప్రదేశ్ సంక్షేమ పథకాలను బ్రౌజ్ చేయండి, శోధించండి, బుక్‌మార్క్ చేయండి మరియు పోల్చండి.',
    searchPlaceholder: bilingual === 'EN' ? 'Search scheme name, description, eligibility...' : 'పథకం పేరు, వివరణ, అర్హతలతో శోధించండి...',
    allCategories: bilingual === 'EN' ? 'All Categories' : 'అన్ని విభాగాలు',
    allTypes: bilingual === 'EN' ? 'All Types' : 'అన్ని రకాలు',
    centralGov: bilingual === 'EN' ? 'Central Govt Schemes' : 'కేంద్ర ప్రభుత్వ పథకాలు',
    stateGov: bilingual === 'EN' ? 'Andhra Pradesh State Schemes' : 'ఆంధ్రప్రదేశ్ రాష్ట్ర పథకాలు',
    showBookmarks: bilingual === 'EN' ? 'Show Bookmarked Only' : 'బుక్‌మార్క్ చేసినవి మాత్రమే చూపు',
    updatedBanner: bilingual === 'EN' ? 'All schemes updated for fiscal year 2026-2027' : 'అన్ని పథకాలు ఆర్థిక సంవత్సరం 2026-2027 కొరకు నవీకరించబడ్డాయి',
    sortByLabel: bilingual === 'EN' ? 'Sort by:' : 'వరుస క్రమం:',
    schemeName: bilingual === 'EN' ? 'Scheme Name' : 'పథకం పేరు',
    financialAidAmt: bilingual === 'EN' ? 'Financial Aid Amount' : 'ఆర్థిక సహాయం మొత్తం',
    showing: bilingual === 'EN' ? 'Showing' : 'చూపిస్తున్నవి',
    schemesCount: bilingual === 'EN' ? 'schemes' : 'పథకాలు',
    newBadge: bilingual === 'EN' ? 'New' : 'కొత్త',
    assistanceLabel: bilingual === 'EN' ? 'Assistance:' : 'సహాయం:',
    subsidiesLabel: bilingual === 'EN' ? 'Subsidies/Services' : 'సబ్సిడీలు/సేవలు',
    viewDetails: bilingual === 'EN' ? 'View Details' : 'వివరాలు చూడు',
    removeBookmark: bilingual === 'EN' ? 'Remove Bookmark' : 'బుక్‌మార్క్ తీసివేయి',
    bookmarkScheme: bilingual === 'EN' ? 'Bookmark Scheme' : 'బుక్‌మార్క్ చేయి',
    removeFromCompare: bilingual === 'EN' ? 'Remove from Comparison' : 'పోలిక నుండి తీసివేయి',
    addToCompare: bilingual === 'EN' ? 'Add to Comparison' : 'పోలికకు జోడించు',
    noSchemes: bilingual === 'EN' ? 'No schemes found matching your search and filter criteria.' : 'మీ శోధన మరియు ఫిల్టర్ ప్రమాణాలకు సరిపోయే పథకాలు కనుగొనబడలేదు.',
    resetFilters: bilingual === 'EN' ? 'Reset All Filters' : 'అన్ని ఫిల్టర్‌లను రీసెట్ చేయి',
    centralScheme: bilingual === 'EN' ? 'Central Scheme' : 'కేంద్ర పథకం',
    stateScheme: bilingual === 'EN' ? 'State Scheme' : 'రాష్ట్ర పథకం',
    financialAid: bilingual === 'EN' ? 'Financial Aid' : 'ఆర్థిక సహాయం',
    processingTime: bilingual === 'EN' ? 'Processing Time' : 'ప్రక్రియ సమయం',
    eligibilityAge: bilingual === 'EN' ? 'Eligibility Age' : 'అర్హత వయస్సు',
    years: bilingual === 'EN' ? 'Years' : 'సంవత్సరాలు',
    description: bilingual === 'EN' ? 'Description' : 'వివరణ',
    keyBenefits: bilingual === 'EN' ? 'Key Benefits & Support' : 'కీలక ప్రయోజనాలు & మద్దతు',
    detailedEligibility: bilingual === 'EN' ? 'Detailed Eligibility Criteria' : 'వివరణాత్మక అర్హత ప్రమాణాలు',
    requiredDocs: bilingual === 'EN' ? 'Required Documents' : 'అవసరమైన పత్రాలు',
    defaultDocs: bilingual === 'EN' ? 'Aadhaar Card, BPL Ration Card, Bank Passbook, Passport photos.' : 'ఆధార్ కార్డ్, బిపిఎల్ రేషన్ కార్డ్, బ్యాంక్ పాస్‌బుక్, పాస్‌పోర్ట్ సైజు ఫోటోలు.',
    appProcess: bilingual === 'EN' ? 'Application Process Overview' : 'దరఖాస్తు విధానం అవలోకనం',
    defaultProcess: bilingual === 'EN' ? 'Submit physical files in Ward Sachivalayam or register on official portal.' : 'వార్డు సచివాలయంలో భౌతిక పత్రాలను సమర్పించండి లేదా అధికారిక పోర్టల్‌లో నమోదు చేసుకోండి.',
    helpline: bilingual === 'EN' ? 'Helpline:' : 'సహాయ కేంద్రం:',
    officialPortal: bilingual === 'EN' ? 'Official Portal:' : 'అధికారిక వెబ్‌సైట్:',
    addedToCompare: bilingual === 'EN' ? 'Added to Compare' : 'పోలికకు జోడించబడింది',
    applyOnPortal: bilingual === 'EN' ? 'Apply on Portal' : 'పోర్టల్‌లో దరఖాస్తు చేయండి',
    compareSimilar: bilingual === 'EN' ? 'Compare with Similar Schemes' : 'సరిపోయే ఇతర పథకాలతో పోల్చండి',
    aid: bilingual === 'EN' ? 'Aid:' : 'సహాయం:',
    subsidies: bilingual === 'EN' ? 'Subsidies' : 'సబ్సిడీలు'
  };

  // Filter schemes
  const filteredSchemes = schemes.filter(s => {
    if (!s) return false;
    // 1. Search text
    const searchLower = (globalSearch || '').toLowerCase();
    const nameLower = (s.name || '').toLowerCase();
    const descLower = (s.description || '').toLowerCase();
    const eligLower = (s.eligibility_criteria || '').toLowerCase();

    const matchesSearch = !searchLower || 
      nameLower.includes(searchLower) ||
      descLower.includes(searchLower) ||
      eligLower.includes(searchLower);

    // 2. Category
    const matchesCategory = !categoryFilter || s.category_id === parseInt(categoryFilter);

    // 3. Type
    const matchesType = typeFilter === 'All' || s.type === typeFilter;

    // 4. Bookmarks Only
    const matchesBookmarks = !showBookmarksOnly || (bookmarks && bookmarks.includes(s.id));

    return matchesSearch && matchesCategory && matchesType && matchesBookmarks;
  });

  // Sort schemes
  const sortedSchemes = [...filteredSchemes].sort((a, b) => {
    let fieldA = a[sortBy];
    let fieldB = b[sortBy];

    if (sortBy === 'financial_assistance_amount') {
      fieldA = parseFloat(fieldA) || 0;
      fieldB = parseFloat(fieldB) || 0;
    } else {
      fieldA = String(fieldA || '').toLowerCase();
      fieldB = String(fieldB || '').toLowerCase();
    }

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSortOrder = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const isBookmarked = (id) => bookmarks.includes(id);
  const isInCompare = (id) => compareList.some(item => item.id === id);

  const handleSendApplyChat = (queryText) => {
    // Add user message
    setApplyChatMessages(prev => [...prev, { sender: 'user', text: queryText }]);
    setApplyChatQuery('');
    setApplyChatTyping(true);

    setTimeout(() => {
      const qLower = queryText.toLowerCase();
      let responseText = '';

      if (bilingual === 'EN') {
        if (qLower.includes('elig') || qLower.includes('qualified') || qLower.includes('who can') || /\bfit\b/.test(qLower) || qLower.includes('am i')) {
          responseText = `To be eligible for **${selectedScheme.name}**, you must satisfy:\n\n` + 
                         `• Age: ${selectedScheme.min_age} to ${selectedScheme.max_age} years.\n` +
                         `• Income: ${selectedScheme.max_income < 99999999 ? `Annual income below ₹${Number(selectedScheme.max_income).toLocaleString('en-IN')}` : 'No income ceiling'}.\n` +
                         `• Criteria: ${selectedScheme.eligibility_criteria || 'General public scheme.'}`;
        } else if (qLower.includes('doc') || qLower.includes('paper') || qLower.includes('file') || qLower.includes('need')) {
          responseText = `You will need to submit these documents for **${selectedScheme.name}**:\n\n${selectedScheme.required_documents || t.defaultDocs}`;
        } else if (qLower.includes('benefit') || qLower.includes('money') || qLower.includes('financial') || qLower.includes('give') || qLower.includes('how much')) {
          responseText = `The benefits of **${selectedScheme.name}** are:\n\n` +
                         `• **Support Details**: ${selectedScheme.benefits || 'Welfare assistance and support services.'}\n` +
                         `• **Assistance Amount**: ${selectedScheme.financial_assistance_amount && selectedScheme.financial_assistance_amount > 0 ? `₹${Number(selectedScheme.financial_assistance_amount).toLocaleString('en-IN')} per year` : 'Service benefit / Subsidy'}.`;
        } else if (qLower.includes('how') || qLower.includes('apply') || qLower.includes('process') || qLower.includes('where') || qLower.includes('submit')) {
          responseText = `Here is how you apply for **${selectedScheme.name}**:\n\n` +
                         `1. Go to: ${selectedScheme.official_website}\n` +
                         `2. Prepare documents: Aadhaar card, income certificate, ration card.\n` +
                         `3. ${selectedScheme.application_process || 'Submit details at the local ward secretariat office.'}`;
        } else {
          responseText = `I can help you with specific details about **${selectedScheme.name}**. Try asking:\n` +
                         `• "Am I eligible?"\n` +
                         `• "What documents are required?"\n` +
                         `• "What are the benefits?"\n` +
                         `• "How do I apply?"`;
        }
      } else {
        // Telugu responses
        if (qLower.includes('అర్హత') || qLower.includes('అర్హుడినా') || qLower.includes('qualified') || qLower.includes('who can')) {
          responseText = `**${selectedScheme.name}** పథకం అర్హతలు:\n\n` +
                         `• వయస్సు: ${selectedScheme.min_age} నుండి ${selectedScheme.max_age} సంవత్సరాలు.\n` +
                         `• ఆదాయ పరిమితి: ${selectedScheme.max_income < 99999999 ? `సంవత్సర ఆదాయం ₹${Number(selectedScheme.max_income).toLocaleString('en-IN')} లోపు` : 'ఆదాయ పరిమితి లేదు'}.\n` +
                         `• నిబంధనలు: ${selectedScheme.eligibility_criteria || 'సాధారణ సంక్షేమ పథకం.'}`;
        } else if (qLower.includes('పత్రాలు') || qLower.includes('కాగితాలు') || qLower.includes('docs') || qLower.includes('documents')) {
          responseText = `**${selectedScheme.name}** పథకానికి కావలసిన పత్రాలు:\n\n${selectedScheme.required_documents || t.defaultDocs}`;
        } else if (qLower.includes('లాభం') || qLower.includes('డబ్బులు') || qLower.includes('సహాయం') || qLower.includes('ప్రయోజనం')) {
          responseText = `**${selectedScheme.name}** పథకం ప్రయోజనాలు:\n\n` +
                         `• **వివరాలు**: ${selectedScheme.benefits || 'సంక్షేమ సహాయం మరియు మద్దతు సేవలు.'}\n` +
                         `• **ఆర్థిక సహాయం**: ${selectedScheme.financial_assistance_amount && selectedScheme.financial_assistance_amount > 0 ? `₹${Number(selectedScheme.financial_assistance_amount).toLocaleString('en-IN')} సంవత్సరానికి` : 'సబ్సిడీ / సేవలు'}.`;
        } else if (qLower.includes('ఎలా') || qLower.includes('దరఖాస్తు') || qLower.includes('ఎక్కడ') || qLower.includes('apply')) {
          responseText = `**${selectedScheme.name}** దరఖాస్తు విధానం:\n\n` +
                         `1. వెబ్‌సైట్: ${selectedScheme.official_website}\n` +
                         `2. ఆధార్ కార్డ్, ఆదాయ ధృవీకరణ పత్రం, రేషన్ కార్డ్ సిద్ధం చేసుకోండి.\n` +
                         `3. ${selectedScheme.application_process || 'సచివాలయం లేదా పోర్టల్‌లో ఆన్‌లైన్ ద్వారా దరఖాస్తు చేసుకోండి.'}`;
        } else {
          responseText = `నేను మీకు **${selectedScheme.name}** గురించి సహాయం చేయగలను. దయచేసి అడగండి:\n` +
                         `• "నేను అర్హుడినా?"\n` +
                         `• "కావలసిన పత్రాలు ఏమిటి?"\n` +
                         `• "డబ్బులు ఎంత వస్తాయి?"\n` +
                         `• "దరఖాస్తు ఎలా చేయాలి?"`;
        }
      }

      setApplyChatMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
      setApplyChatTyping(false);
    }, 1000);
  };

  const handleApplyFaqClick = (faqText) => {
    handleSendApplyChat(faqText);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-8 bg-gov-blue rounded-full"></span>
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="md:col-span-2 relative flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-3">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent focus:outline-none p-3 text-sm text-slate-900 dark:text-white"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
            {startListening && (
              <button
                type="button"
                onClick={() => startListening(bilingual === 'EN' ? 'Search schemes' : 'పథకాలను శోధించండి', setGlobalSearch)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 hover:text-gov-blue dark:hover:text-blue-400 transition flex-shrink-0"
                title={bilingual === 'EN' ? 'Voice Search' : 'వాయిస్ శోధన'}
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-3">
            <Filter className="w-5 h-5 text-slate-400 mr-2" />
            <select
              className="w-full bg-transparent focus:outline-none py-3 text-sm text-slate-700 dark:text-slate-200"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">{t.allCategories}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Dropdown (Central vs State) */}
          <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-3">
            <Landmark className="w-5 h-5 text-slate-400 mr-2" />
            <select
              className="w-full bg-transparent focus:outline-none py-3 text-sm text-slate-700 dark:text-slate-200"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">{t.allTypes}</option>
              <option value="Central">{t.centralGov}</option>
              <option value="State">{t.stateGov}</option>
            </select>
          </div>
        </div>

        {/* Bookmarks Filter and Fiscal Year Banner */}
        <div className="flex flex-wrap gap-4 items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-slate-800/55 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 select-none hover:bg-slate-100 transition duration-150">
            <input
              type="checkbox"
              className="rounded text-gov-blue focus:ring-gov-blue w-4 h-4"
              checked={showBookmarksOnly}
              onChange={(e) => setShowBookmarksOnly(e.target.checked)}
            />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.showBookmarks}</span>
          </label>

          <span className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/30 px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            {t.updatedBanner}
          </span>
        </div>

        {/* Sorting Tools */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>{t.sortByLabel}</span>
            <button
              onClick={() => toggleSortOrder('name')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition duration-150 ${
                sortBy === 'name' ? 'bg-gov-blue/5 border-gov-blue text-gov-blue dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.schemeName} <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => toggleSortOrder('financial_assistance_amount')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition duration-150 ${
                sortBy === 'financial_assistance_amount' ? 'bg-gov-blue/5 border-gov-blue text-gov-blue dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.financialAidAmt} <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
          <div>
            {t.showing} <span className="font-semibold text-slate-900 dark:text-white">{sortedSchemes.length}</span> {t.schemesCount}
          </div>
        </div>
      </div>

      {/* ================================================================
           CENTERED HOVER PREVIEW MODAL
           ================================================================ */}
      {hoveredScheme && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center animate-fadeIn cursor-pointer"
          style={{ background: 'rgba(15,23,42,0.50)', backdropFilter: 'blur(8px)' }}
          onClick={() => setHoveredScheme(null)}
        >
          <div 
            className="w-full max-w-lg mx-4 pointer-events-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => cancelClose()}
            onMouseLeave={() => setHoveredScheme(null)}
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_32px_80px_-10px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">

              {/* Gradient Header */}
              <div className={`relative bg-gradient-to-br ${getSchemeTheme(hoveredScheme).grad} px-7 pt-7 pb-10 overflow-hidden`}>
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black/5 rounded-full blur-xl" />
                <div className="absolute top-4 right-8 w-6 h-6 bg-white/10 rounded-full" />
                <div className="absolute bottom-8 right-16 w-4 h-4 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full border ${getSchemeTheme(hoveredScheme).badge}`}>
                        {hoveredScheme.type === 'Central' ? t.centralScheme : t.stateScheme}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-sm ${getSchemeTheme(hoveredScheme).newBadge}`}>
                        ✨ {t.newBadge}
                      </span>
                    </div>
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
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">💰 {bilingual === 'EN' ? 'Aid' : 'సహాయం'}</p>
                  <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                    {hoveredScheme.financial_assistance_amount > 0
                      ? `₹${Number(hoveredScheme.financial_assistance_amount).toLocaleString('en-IN')}`
                      : (bilingual === 'EN' ? 'Subsidy' : 'సబ్సిడీ')}
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-blue-100 dark:border-slate-700 p-3 text-center">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">🎂 {bilingual === 'EN' ? 'Age' : 'వయస్సు'}</p>
                  <p className="text-sm font-extrabold text-blue-700 dark:text-blue-300">
                    {hoveredScheme.min_age}–{hoveredScheme.max_age} <span className="text-[10px]">{bilingual === 'EN' ? 'yrs' : 'సం'}</span>
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-violet-100 dark:border-slate-700 p-3 text-center">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">⏱ {bilingual === 'EN' ? 'Time' : 'సమయం'}</p>
                  <p className="text-[11px] font-extrabold text-violet-700 dark:text-violet-300">
                    {hoveredScheme.processing_time || (bilingual === 'EN' ? '15–30 days' : '15–30 రోజులు')}
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
                      {bilingual === 'EN' ? 'Eligibility Criteria' : 'అర్హత ప్రమాణాలు'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {hoveredScheme.eligibility_criteria || (bilingual === 'EN' ? 'Open to all eligible citizens of India.' : 'అన్ని అర్హులైన భారత పౌరులకు.')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4">
                  <span className="text-xl flex-shrink-0">📋</span>
                  <div>
                    <p className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                      {bilingual === 'EN' ? 'Required Documents' : 'అవసరమైన పత్రాలు'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {hoveredScheme.required_documents || (bilingual === 'EN' ? 'Aadhaar Card, BPL Ration Card, Bank Passbook.' : 'ఆధార్ కార్డ్, రేషన్ కార్డ్, బ్యాంక్ పాస్‌బుక్.')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-base">👇</span>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                    {bilingual === 'EN'
                      ? 'Click "View Details" on the card for full info & apply'
                      : '"వివరాలు చూడు" నొక్కి పూర్తి వివరాలు & దరఖాస్తు చేసుకోండి'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Schemes Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSchemes.map((scheme) => {
          const theme = getSchemeTheme(scheme);
          return (
          <div
            key={scheme.id}
            className={`relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer ${theme.hoverStyle}`}
            style={{ boxShadow: undefined }}
          >
            {/* === VIVID GRADIENT HEADER BAND === */}
            <div 
              className={`relative bg-gradient-to-br ${theme.grad} px-5 pt-5 pb-8 overflow-hidden`}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                clearTimeout(hoverTimerRef.current);
                clearTimeout(closeTimerRef.current);
                hoverTimerRef.current = setTimeout(() => {
                  setHoveredScheme(scheme);
                  setHoverPos({ x: rect.right, y: rect.top + window.scrollY });
                }, 300);
              }}
              onMouseLeave={() => {
                clearTimeout(hoverTimerRef.current);
                scheduleClose(200);
              }}
            >
              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/5 rounded-full blur-lg pointer-events-none" />

              <div className="relative flex justify-between items-start">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.badge}`}>
                    {scheme.type === 'Central' ? t.centralScheme : t.stateScheme}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${theme.newBadge}`}>
                    ✨ {t.newBadge}
                  </span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.catText}`}>
                  {scheme.category_name}
                </span>
              </div>

              <h3
                onClick={() => setSelectedScheme(scheme)}
                className={`font-extrabold text-base mt-3 line-clamp-2 leading-snug cursor-pointer hover:opacity-80 transition-opacity ${theme.titleText}`}
              >
                {scheme.name}
              </h3>
              <p className={`text-[11px] mt-1 truncate font-medium ${theme.deptText}`}>
                {scheme.department_name}
              </p>
              <p className={`text-xs mt-3 line-clamp-3 leading-relaxed font-light ${theme.descText}`}>
                {scheme.description}
              </p>
            </div>

            {/* Bottom details & actions */}
            <div 
              className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-950/10 transition-colors duration-205 flex flex-col gap-3"
              onMouseEnter={() => {
                clearTimeout(hoverTimerRef.current);
                scheduleClose(300);
              }}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">{t.assistanceLabel}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {scheme.financial_assistance_amount && scheme.financial_assistance_amount > 0 ? `₹${Number(scheme.financial_assistance_amount).toLocaleString('en-IN')}` : t.subsidiesLabel}
                </span>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedScheme(scheme)}
                  className="flex-1 bg-gov-blue hover:bg-gov-navy text-white text-xs font-semibold py-2 rounded-xl text-center transition-colors"
                >
                  {t.viewDetails}
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(scheme.id)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isBookmarked(scheme.id)
                      ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-500 border-amber-200 dark:border-amber-900/55'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-400'
                  }`}
                  title={isBookmarked(scheme.id) ? t.removeBookmark : t.bookmarkScheme}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked(scheme.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Compare Button */}
                <button
                  onClick={() => toggleCompare(scheme)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isInCompare(scheme.id)
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border-emerald-200 dark:border-emerald-900/55'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-400'
                  }`}
                  title={isInCompare(scheme.id) ? t.removeFromCompare : t.addToCompare}
                >
                  {isInCompare(scheme.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
               </div>
             </div>
           </div>
          );
        })}


        {sortedSchemes.length === 0 && (
          <div className="col-span-full bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 text-sm">{t.noSchemes}</p>
            <button
              onClick={() => { setGlobalSearch(''); setCategoryFilter(''); setTypeFilter('All'); }}
              className="text-xs font-bold text-gov-blue mt-4 hover:underline"
            >
              {t.resetFilters}
            </button>
          </div>
        )}
      </div>

      {/* DETAILED VIEW DIALOG MODAL */}
      {selectedScheme && (
        <div 
          onClick={() => setSelectedScheme(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleUp"
          >
            {(() => {
              const theme = getSchemeTheme(selectedScheme);
              return (
                <>
                  {/* Modal Header */}
                  <div className={`p-6 ${theme.modalHeaderBg} border-b ${theme.modalHighlightBorder} flex justify-between items-start`}>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.badge}`}>
                          {selectedScheme.type === 'Central' 
                            ? (bilingual === 'EN' ? 'Central Scheme' : 'కేంద్ర పథకం') 
                            : (bilingual === 'EN' ? 'State Scheme' : 'రాష్ట్ర పథకం')
                          }
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme.catText}`}>{selectedScheme.category_name}</span>
                      </div>
                      <h2 className={`text-lg sm:text-xl font-black ${theme.titleText}`}>
                        {selectedScheme.name}
                      </h2>
                      <p className={`text-xs font-semibold ${theme.deptText} mt-0.5`}>{selectedScheme.department_name}</p>
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
                          {selectedScheme.financial_assistance_amount && selectedScheme.financial_assistance_amount > 0 
                            ? `₹${Number(selectedScheme.financial_assistance_amount).toLocaleString('en-IN')}` 
                            : (bilingual === 'EN' ? 'Subsidies/Services' : 'సబ్సిడీలు/సేవలు')
                          }
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 block uppercase font-bold tracking-wider">
                          {bilingual === 'EN' ? 'Processing SLA' : 'ప్రక్రియ సమయం'}
                        </span>
                        <span className={`text-sm font-bold ${theme.titleText}`}>
                          {selectedScheme.processing_time || (bilingual === 'EN' ? '15-30 days' : '15-30 రోజులు')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-455 dark:text-slate-500 block uppercase font-bold tracking-wider">
                          {bilingual === 'EN' ? 'Age Limit' : 'వయస్సు పరిమితి'}
                        </span>
                        <span className={`text-sm font-bold ${theme.titleText}`}>
                          {selectedScheme.min_age} - {selectedScheme.max_age} {bilingual === 'EN' ? 'Years' : 'సంవత్సరాలు'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider`}>
                        {bilingual === 'EN' ? 'Description' : 'పథకం వివరణ'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-305 leading-relaxed font-light">{selectedScheme.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider`}>
                        {bilingual === 'EN' ? 'Benefits' : 'ప్రయోజనాలు'}
                      </h3>
                      <p className={`text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed ${theme.modalBlockBg} p-4 rounded-xl border ${theme.modalBlockBorder}`}>{selectedScheme.benefits}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider`}>
                        {bilingual === 'EN' ? 'Eligibility Criteria' : 'అర్హత ప్రమాణాలు'}
                      </h3>
                      <p className={`text-xs sm:text-sm text-slate-655 dark:text-slate-300 leading-relaxed ${theme.modalBlockBg} p-4 rounded-xl border ${theme.modalBlockBorder}`}>{selectedScheme.eligibility_criteria}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className={`font-bold ${theme.catText} text-xs uppercase tracking-wider flex items-center gap-1.5`}>
                          <Bookmark className={`w-4 h-4 ${theme.iconColor}`} />
                          {bilingual === 'EN' ? 'Required Documents' : 'అవసరమైన పత్రాలు'}
                        </h3>
                        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800 leading-relaxed">
                          {selectedScheme.required_documents ? (
                            <ul className="list-disc pl-4 space-y-1">
                              {selectedScheme.required_documents.split(',').map((doc, idx) => <li key={idx}>{doc.trim()}</li>)}
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
                          {selectedScheme.application_process || (bilingual === 'EN' ? 'Apply online or visit Gram/Ward Sachivalayam.' : 'ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి లేదా సచివాలయాన్ని సందర్శించండి.')}
                        </div>
                      </div>
                    </div>

                    {/* Automatic suggestions panel */}
                    {selectedScheme.related && selectedScheme.related.length > 0 && (
                      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                        <h4 className="font-bold text-slate-950 dark:text-white text-xs sm:text-sm uppercase tracking-wide">
                          {t.compareSimilar}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {selectedScheme.related.map((rel) => (
                            <div
                              key={rel.id}
                              onClick={() => {
                                const fullRel = schemes.find(item => item.id === rel.id);
                                if (fullRel) setSelectedScheme(fullRel);
                              }}
                              className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/60 p-4 rounded-xl cursor-pointer hover:-translate-y-0.5 transition duration-150 flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[9px] uppercase tracking-wider font-semibold text-gov-blue dark:text-blue-400 block mb-1">
                                  {rel.type === 'Central' ? t.centralScheme : t.stateScheme}
                                </span>
                                <h5 className="font-bold text-slate-900 dark:text-white text-xs truncate">
                                  {rel.name}
                                </h5>
                                <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                                  {rel.description}
                                </p>
                              </div>
                              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mt-2 block">
                                {t.aid} {rel.financial_assistance_amount > 0 ? `₹${rel.financial_assistance_amount.toLocaleString('en-IN')}` : t.subsidies}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className={`p-6 border-t ${theme.modalHighlightBorder} flex justify-end gap-3 bg-slate-50/20 dark:bg-slate-950/20`}>
                    <button onClick={() => toggleCompare(selectedScheme)} className="border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                      {compareList.some(item => item.id === selectedScheme.id) 
                        ? (bilingual === 'EN' ? 'Added to Compare' : 'పోలికకు చేర్చబడింది') 
                        : (bilingual === 'EN' ? 'Add to Compare' : 'పోలికకు జోడించు')
                      }
                    </button>
                    <button
                      onClick={() => {
                        setShowIframe(false);
                        setShowApplyModal(true);
                      }}
                      className="bg-gov-blue hover:bg-gov-navy text-white px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition"
                    >
                      {t.applyOnPortal} <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* PROCESS AND AI GUIDANCE MODAL */}
      {showApplyModal && selectedScheme && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleUp">
            {/* Header */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/35 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-bold text-gov-blue dark:text-blue-400 block mb-0.5">
                  {bilingual === 'EN' ? 'Application Assistance Portal' : 'దరఖాస్తు సహాయ పోర్టల్'}
                </span>
                <h3 className="font-extrabold text-slate-950 dark:text-white text-base sm:text-lg">
                  {selectedScheme.name}
                </h3>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition duration-150"
              >
                &times;
              </button>
            </div>

            {/* Content (Two columns: Left = Process or Live Portal, Right = AI Chat) */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
              
              {/* Left Column */}
              {!showIframe ? (
                /* Left Column: Application Process Guide */
                <div className="md:w-1/2 p-6 border-r border-slate-100 dark:border-slate-800 overflow-y-auto space-y-6">
                  
                  {/* 1. Requirements Summary */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-gov-blue" />
                      {bilingual === 'EN' ? 'Eligibility & Assistance Details' : 'అర్హత & సహాయ వివరాలు'}
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                      <p><strong>{bilingual === 'EN' ? 'Financial Assistance:' : 'ఆర్థిక సహాయం:'}</strong> {selectedScheme.financial_assistance_amount && selectedScheme.financial_assistance_amount > 0 ? `₹${Number(selectedScheme.financial_assistance_amount).toLocaleString('en-IN')} per annum` : 'Subsidies/Welfare Services'}</p>
                      <p><strong>{bilingual === 'EN' ? 'Target Age Group:' : 'అర్హత వయస్సు:'}</strong> {selectedScheme.min_age} - {selectedScheme.max_age} {bilingual === 'EN' ? 'years' : 'సంవత్సరాలు'}</p>
                      <p><strong>{bilingual === 'EN' ? 'Income Limit:' : 'గరిష్ట ఆదాయం:'}</strong> {selectedScheme.max_income < 99999999 ? `Below ₹${Number(selectedScheme.max_income).toLocaleString('en-IN')} / year` : 'No specific income restriction'}</p>
                    </div>
                  </div>

                  {/* 2. Step-by-Step Instructions */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-gov-blue" />
                      {bilingual === 'EN' ? 'Process to Apply' : 'దరఖాస్తు విధానం'}
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-3">
                      <div className="flex gap-2">
                        <span className="bg-gov-blue text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</span>
                        <p className="text-slate-600 dark:text-slate-400 font-light">
                          {bilingual === 'EN' 
                            ? 'Collect all required documents: Aadhaar, Ration Card, Bank Passbook, and specific scheme proofs.' 
                            : 'అవసరమైన ఆధార్, రేషన్ కార్డ్, బ్యాంక్ పాస్‌బుక్ మొదలైన పత్రాలను సిద్ధంగా ఉంచుకోండి.'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-gov-blue text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</span>
                        <p className="text-slate-600 dark:text-slate-400 font-light">
                          {bilingual === 'EN' 
                            ? 'Click the "Proceed to Official Portal" button below to navigate directly to the secure government page.' 
                            : 'నేరుగా అధికారిక ప్రభుత్వ పోర్టల్‌కు వెళ్ళడానికి క్రింది "అధికారిక వెబ్‌సైట్‌కు వెళ్ళు" బటన్ క్లిక్ చేయండి.'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-gov-blue text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</span>
                        <p className="text-slate-600 dark:text-slate-400 font-light">
                          {selectedScheme.application_process || (bilingual === 'EN' ? 'Submit files or apply online on portal.' : 'వార్డు సచివాలయంలో లేదా పోర్టల్‌లో ఆన్‌లైన్ ద్వారా దరఖాస్తు చేసుకోండి.')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3. Required Documents */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                      <Bookmark className="w-4 h-4 text-gov-blue" />
                      {t.requiredDocs}
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
                      <p className="text-slate-600 dark:text-slate-400 font-light whitespace-pre-line leading-relaxed">
                        {selectedScheme.required_documents || t.defaultDocs}
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                /* Left Column: Live Embedded Portal Iframe */
                <div className="md:w-1/2 flex flex-col border-r border-slate-100 dark:border-slate-800 min-h-0 h-full bg-slate-50 dark:bg-slate-950/20">
                  {/* Address bar simulator */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex gap-1.5 mr-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    </div>
                    <div className="flex-1 flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-[10px] text-slate-500 dark:text-slate-400 font-mono select-none truncate">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0">https://</span>
                      <span className="truncate">{selectedScheme.official_website.replace(/^https?:\/\//i, '')}</span>
                    </div>
                    <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex-shrink-0">
                      Secure
                    </span>
                  </div>

                  {/* Live Iframe container */}
                  <div className="flex-1 relative min-h-0 bg-white dark:bg-slate-900 flex flex-col justify-between">
                    <iframe
                      src={selectedScheme.official_website}
                      title={`${selectedScheme.name} Application Portal`}
                      className="w-full flex-1 border-0"
                    />
                    
                    {/* Connection Help Helper Banner */}
                    <div className="bg-blue-50/70 dark:bg-slate-800/80 border-t border-blue-100 dark:border-slate-700 p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600 dark:text-slate-300">
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-gov-blue dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="text-[10px] leading-tight">
                          <p className="font-semibold">{bilingual === 'EN' ? 'Connection Status Help' : 'కనెక్షన్ స్థితి సహాయం'}</p>
                          <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                            {bilingual === 'EN'
                              ? 'If the official website is blank or blocked, it may be due to government security policies restricting embedded frames.'
                              : 'అధికారిక వెబ్‌సైట్ ఖాళీగా ఉంటే లేదా బ్లాక్ చేయబడితే, అది ఎంబెడెడ్ ఫ్రేమ్‌లను నిరోధించే ప్రభుత్వ భద్రతా విధానాల వల్ల కావచ్చు.'}
                          </p>
                        </div>
                      </div>
                      <a
                        href={selectedScheme.official_website}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gov-blue hover:bg-gov-navy text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0 transition"
                      >
                        {bilingual === 'EN' ? 'Open in New Tab' : 'కొత్త ట్యాబ్‌లో తెరువు'}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Column: AI Chat Assistant for Portal */}
              <div className="md:w-1/2 p-6 flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-900/10">
                <div className="flex-shrink-0 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400">
                    {bilingual === 'EN' ? 'AI Portal Assistant' : 'AI పోర్టల్ సహాయకుడు'}
                  </h4>
                </div>

                {/* Chat Message Box */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3 text-xs min-h-[200px]">
                  {applyChatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-gov-blue text-white rounded-br-none' 
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700/60 rounded-bl-none shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {applyChatTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700/60 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Quick Buttons */}
                <div className="flex flex-wrap gap-1.5 pb-3">
                  {[
                    bilingual === 'EN' ? 'Am I eligible?' : 'నేను అర్హుడినా?',
                    bilingual === 'EN' ? 'What documents?' : 'ఏ పత్రాలు కావాలి?',
                    bilingual === 'EN' ? 'What benefits?' : 'ప్రయోజనాలు ఏమిటి?',
                  ].map((faqText) => (
                    <button
                      key={faqText}
                      onClick={() => handleApplyFaqClick(faqText)}
                      className="bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full text-[10px] text-slate-600 dark:text-slate-300 transition"
                    >
                      {faqText}
                    </button>
                  ))}
                </div>

                {/* Input form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (applyChatQuery.trim()) {
                      handleSendApplyChat(applyChatQuery.trim());
                    }
                  }} 
                  className="relative flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:border-gov-blue"
                >
                  <input
                    type="text"
                    placeholder={bilingual === 'EN' ? 'Ask a question about this scheme...' : 'ఈ పథకం గురించి ఒక ప్రశ్న అడగండి...'}
                    className="w-full pl-3 pr-10 py-3 text-xs bg-transparent text-slate-900 dark:text-white focus:outline-none"
                    value={applyChatQuery}
                    onChange={(e) => setApplyChatQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-1 text-gov-blue hover:text-gov-navy p-2 rounded-lg"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/35 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4">
              <button
                onClick={() => setShowApplyModal(false)}
                className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {bilingual === 'EN' ? 'Close' : 'మూసివేయి'}
              </button>
              
              <div className="flex items-center gap-2">
                <a
                  href={selectedScheme.official_website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-gov-blue dark:text-blue-400 rounded-xl font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1"
                >
                  {bilingual === 'EN' ? 'Open in New Tab' : 'కొత్త ట్యాబ్‌లో తెరువు'} <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {!showIframe ? (
                  <button
                    onClick={() => setShowIframe(true)}
                    className="bg-gov-blue hover:bg-gov-navy text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    {bilingual === 'EN' ? 'Proceed to Official Portal' : 'అధికారిక వెబ్‌సైట్‌కు వెళ్ళు'} <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowIframe(false)}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    {bilingual === 'EN' ? 'Show Process Instructions' : 'విధాన సూచనలను చూపు'}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
