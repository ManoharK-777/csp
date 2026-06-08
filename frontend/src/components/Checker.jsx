import React, { useState } from 'react';
import { API_BASE } from '../utils/api';
import { HelpCircle, Search, Landmark, Check, AlertCircle, ArrowRight, UserCheck, ShieldAlert, Mic } from 'lucide-react';

export default function Checker({ bilingual, schemes, toggleCompare, compareList, setSelectedScheme, startListening }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('All');
  const [occupation, setOccupation] = useState('Unemployed');
  const [income, setIncome] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [isFarmer, setIsFarmer] = useState(false);
  const [isSenior, setIsSenior] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

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
        titleText: 'text-rose-955 dark:text-rose-100', // wait, text-rose-950 is better
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
        titleText: 'text-violet-955 dark:text-violet-100', // wait, text-violet-950 is better
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
        titleText: 'text-emerald-955 dark:text-emerald-100', // wait, text-emerald-950 is better
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
        titleText: 'text-amber-955 dark:text-amber-100', // wait, text-amber-950 is better
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
        titleText: 'text-pink-955 dark:text-pink-100', // wait, text-pink-950 is better
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
        titleText: 'text-orange-955 dark:text-orange-100',
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
        titleText: 'text-blue-955 dark:text-blue-100',
        descText: 'text-blue-800/80 dark:text-blue-300/85',
        deptText: 'text-blue-900/70 dark:text-blue-400/70',
        badge: 'bg-blue-100/80 text-blue-800 border-blue-200/50 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/40',
        catText: 'text-blue-700 dark:text-blue-300 font-semibold',
        newBadge: 'bg-blue-200/80 text-blue-800 dark:bg-blue-800/60 dark:text-blue-200',
        hoverStyle: 'hover:border-blue-400 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10'
      };
    }
  };

  // Translations Dictionary
  const t = {
    title: bilingual === 'EN' ? 'Smart Scheme Eligibility Checker' : 'స్మార్ట్ పథకం అర్హత పరిశీలన',
    subtitle: bilingual === 'EN' ? 'Input your demographic profile to search which central and state government welfare schemes you qualify for.' : 'మీరు ఏ కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ సంక్షేమ పథకాలకు అర్హులో తెలుసుకోవడానికి మీ ప్రొఫైల్ వివరాలను నమోదు చేయండి.',
    formTitle: bilingual === 'EN' ? 'Citizen Profile Form' : 'పౌరుల ప్రొఫైల్ ఫారమ్',
    ageLabel: bilingual === 'EN' ? 'Age (in years)' : 'వయస్సు (సంవత్సరాలలో)',
    agePlaceholder: bilingual === 'EN' ? 'Enter age (e.g. 45)' : 'వయస్సు నమోదు చేయండి (ఉదా. 45)',
    genderLabel: bilingual === 'EN' ? 'Gender' : 'లింగం',
    genderAll: bilingual === 'EN' ? 'All/Other' : 'అన్నీ/ఇతర',
    genderMale: bilingual === 'EN' ? 'Male' : 'పురుషుడు',
    genderFemale: bilingual === 'EN' ? 'Female' : 'స్త్రీ',
    incomeLabel: bilingual === 'EN' ? 'Annual Family Income (₹)' : 'కుటుంబ వార్షిక ఆదాయం (₹)',
    incomePlaceholder: bilingual === 'EN' ? 'Enter annual income (e.g. 150000)' : 'వార్షిక ఆదాయాన్ని నమోదు చేయండి (ఉదా. 150000)',
    occupationLabel: bilingual === 'EN' ? 'Primary Occupation' : 'ప్రధాన వృత్తి',
    occUnemployed: bilingual === 'EN' ? 'Unemployed / Household' : 'నిరుద్యోగి / గృహిణి',
    occSalaried: bilingual === 'EN' ? 'Government/Private Employee' : 'ప్రభుత్వ / ప్రైవేట్ ఉద్యోగి',
    occBusiness: bilingual === 'EN' ? 'Self Employed / Vendor' : 'స్వయం ఉపాధి / వ్యాపారి',
    occLaborer: bilingual === 'EN' ? 'Daily Wage Labor / Artisan' : 'దినసరి కూలీ / చేతివృత్తిదారుడు',
    occRetired: bilingual === 'EN' ? 'Retired Pensioner' : 'రిటైర్డ్ పెన్షనర్',
    specialClass: bilingual === 'EN' ? 'Special Classifications' : 'ప్రత్యేక వర్గీకరణలు',
    isStudent: bilingual === 'EN' ? 'Are you currently a Student?' : 'మీరు ప్రస్తుతం విద్యార్థినా?',
    isFarmer: bilingual === 'EN' ? 'Are you a Land Farmer?' : 'మీరు భూమి ఉన్న రైతా?',
    isSenior: bilingual === 'EN' ? 'Are you a Senior Citizen (60+)?' : 'మీరు సీనియర్ సిటిజనా (60+)?',
    isDisabled: bilingual === 'EN' ? 'Are you Differently Abled?' : 'మీరు వికలాంగులా (దివ్యాంగులా)?',
    reset: bilingual === 'EN' ? 'Reset' : 'రీసెట్',
    findSchemes: bilingual === 'EN' ? 'Find Schemes' : 'పథకాలను కనుగొనండి',
    analyzing: bilingual === 'EN' ? 'Analyzing...' : 'విశ్లేషిస్తోంది...',
    resultsFound: bilingual === 'EN' ? 'Matching Results Found' : 'సరిపోయే ఫలితాలు కనుగొనబడ్డాయి',
    resultsSubtitle: bilingual === 'EN' ? 'Based on your profile, you qualify for the following programs.' : 'మీ ప్రొఫైల్ ఆధారంగా, మీరు ఈ క్రింది పథకాలకు అర్హులు.',
    schemesCountLabel: bilingual === 'EN' ? 'Schemes' : 'పథకాలు',
    benefitsLabel: bilingual === 'EN' ? 'Benefits:' : 'ప్రయోజనాలు:',
    docsLabel: bilingual === 'EN' ? 'Documents:' : 'పత్రాలు:',
    defaultDocs: bilingual === 'EN' ? 'Aadhaar Card, Income Certificate, Bank details.' : 'ఆధార్ కార్డ్, ఆదాయ ధృవీకరణ పత్రం, బ్యాంక్ వివరాలు.',
    viewDetails: bilingual === 'EN' ? 'View Details' : 'వివరాలు చూడు',
    addedToCompare: bilingual === 'EN' ? 'Added to Compare' : 'పోలికకు జోడించబడింది',
    addToCompare: bilingual === 'EN' ? 'Add to Compare' : 'పోలికకు జోడించు',
    noResults: bilingual === 'EN' ? "We couldn't find any matching welfare schemes for your profile. Try modifying the fields (e.g. lowering annual income)." : 'మీ ప్రొఫైల్‌కు సరిపోయే ఎటువంటి సంక్షేమ పథకాలు కనుగొనబడలేదు. వివరాలను మార్చడానికి ప్రయత్నించండి (ఉదా. వార్షిక ఆదాయాన్ని తగ్గించడం).',
    pendingInputs: bilingual === 'EN' ? 'Pending Inputs' : 'వివరాలు నమోదు కాలేదు',
    pendingSubtitle: bilingual === 'EN' ? 'Please fill in the citizen profile details in the left form panel and click "Find Schemes" to analyze your eligibility.' : 'దయచేసి ఎడమ ప్యానెల్‌లో పౌరుల ప్రొఫైల్ వివరాలను పూరించి, మీ అర్హతను విశ్లేషించడానికి "పథకాలను కనుగొనండి" క్లిక్ చేయండి.'
  };

  const handleCheckEligibility = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(age) || 0,
          gender,
          occupation,
          income: parseFloat(income) || 0,
          isStudent,
          isFarmer,
          isSenior: isSenior || (parseInt(age) >= 60),
          isDisabled
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error('Error fetching eligibility');
      }
    } catch (error) {
      console.error('Eligibility connection error', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAge('');
    setGender('All');
    setOccupation('Unemployed');
    setIncome('');
    setIsStudent(false);
    setIsFarmer(false);
    setIsSenior(false);
    setIsDisabled(false);
    setResults(null);
  };

  const isInCompare = (id) => compareList.some(item => item.id === id);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Inputs Column */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm h-fit">
          <h2 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <UserCheck className="w-5 h-5 text-gov-blue" />
            {t.formTitle}
          </h2>

          <form onSubmit={handleCheckEligibility} className="space-y-4 text-sm">
            {/* Age */}
            <div className="space-y-1">
              <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.ageLabel}</label>
              <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-2">
                <input
                  type="number"
                  min="0"
                  max="120"
                  placeholder={t.agePlaceholder}
                  required
                  className="w-full bg-transparent focus:outline-none p-3 text-slate-900 dark:text-white"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {startListening && (
                  <button
                    type="button"
                    onClick={() => startListening(bilingual === 'EN' ? 'Age' : 'వయస్సు', (val) => {
                      const digits = val.replace(/\D/g, '');
                      setAge(digits || val);
                    })}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 hover:text-gov-blue dark:hover:text-blue-400 transition flex-shrink-0"
                    title={bilingual === 'EN' ? 'Voice input' : 'వాయిస్ ఇన్పుట్'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.genderLabel}</label>
              <select
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="All">{t.genderAll}</option>
                <option value="Male">{t.genderMale}</option>
                <option value="Female">{t.genderFemale}</option>
              </select>
            </div>

            {/* Annual Income */}
            <div className="space-y-1">
              <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.incomeLabel}</label>
              <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-2">
                <input
                  type="number"
                  min="0"
                  placeholder={t.incomePlaceholder}
                  required
                  className="w-full bg-transparent focus:outline-none p-3 text-slate-900 dark:text-white"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
                {startListening && (
                  <button
                    type="button"
                    onClick={() => startListening(bilingual === 'EN' ? 'Annual Income' : 'వార్షిక ఆదాయం', (val) => {
                      const cleanVal = val.replace(/,/g, '');
                      const digits = cleanVal.replace(/\D/g, '');
                      setIncome(digits || val);
                    })}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 hover:text-gov-blue dark:hover:text-blue-400 transition flex-shrink-0"
                    title={bilingual === 'EN' ? 'Voice input' : 'వాయిస్ ఇన్పుట్'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Occupation */}
            <div className="space-y-1">
              <label className="font-medium text-slate-700 dark:text-slate-300 block">{t.occupationLabel}</label>
              <select
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:border-gov-blue text-slate-900 dark:text-white"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              >
                <option value="Unemployed">{t.occUnemployed}</option>
                <option value="Salaried">{t.occSalaried}</option>
                <option value="Business">{t.occBusiness}</option>
                <option value="Laborer">{t.occLaborer}</option>
                <option value="Retired">{t.occRetired}</option>
              </select>
            </div>

            {/* Status Checkboxes */}
            <div className="pt-2 space-y-2.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300 block">{t.specialClass}</label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-gov-blue focus:ring-gov-blue w-4 h-4"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                />
                <span className="text-slate-600 dark:text-slate-300">{t.isStudent}</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-gov-blue focus:ring-gov-blue w-4 h-4"
                  checked={isFarmer}
                  onChange={(e) => setIsFarmer(e.target.checked)}
                />
                <span className="text-slate-600 dark:text-slate-300">{t.isFarmer}</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-gov-blue focus:ring-gov-blue w-4 h-4"
                  checked={isSenior}
                  onChange={(e) => setIsSenior(e.target.checked)}
                />
                <span className="text-slate-600 dark:text-slate-300">{t.isSenior}</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-gov-blue focus:ring-gov-blue w-4 h-4"
                  checked={isDisabled}
                  onChange={(e) => setIsDisabled(e.target.checked)}
                />
                <span className="text-slate-600 dark:text-slate-300">{t.isDisabled}</span>
              </label>
            </div>

            {/* Form actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold py-3 rounded-xl transition duration-150"
              >
                {t.reset}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 bg-gov-blue hover:bg-gov-navy disabled:bg-slate-400 text-white font-bold py-3 px-6 rounded-xl transition duration-150 flex items-center justify-center gap-1.5"
              >
                {loading ? t.analyzing : t.findSchemes}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white text-base">
                    {t.resultsFound}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.resultsSubtitle}
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-100 dark:border-emerald-900 px-4 py-2 rounded-xl text-center">
                  <span className="text-2xl font-extrabold block">{results.matchCount}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider block">{t.schemesCountLabel}</span>
                </div>
              </div>

              {results.schemes.length > 0 ? (
                <div className="space-y-4">
                  {results.schemes.map((s) => {
                    const theme = getSchemeTheme(s);
                    return (
                    <div
                      key={s.id}
                      className={`relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer ${theme.hoverStyle}`}
                    >
                      {/* === VIVID GRADIENT HEADER BAND === */}
                      <div className={`relative bg-gradient-to-br ${theme.grad} px-5 pt-5 pb-6 overflow-hidden`}>
                        {/* Decorative blobs */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/5 rounded-full blur-lg pointer-events-none" />

                        <div className="relative flex justify-between items-start">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.badge}`}>
                              {s.type === 'Central' ? (bilingual === 'EN' ? 'Central Scheme' : 'కేంద్ర పథకం') : (bilingual === 'EN' ? 'State Scheme' : 'రాష్ట్ర పథకం')}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.catText}`}>
                            {s.category_name}
                          </span>
                        </div>

                        <h4
                          onClick={() => setSelectedScheme(s)}
                          className={`font-extrabold text-base mt-3 line-clamp-2 leading-snug cursor-pointer hover:opacity-80 transition-opacity drop-shadow-sm ${theme.titleText}`}
                        >
                          {s.name}
                        </h4>
                        <p className={`text-[11px] mt-1 truncate font-medium ${theme.deptText}`}>
                          {s.department_name}
                        </p>
                      </div>

                      {/* Content block */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-2.5 border border-slate-100 dark:border-slate-850">
                          <div className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed">
                            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">{t.benefitsLabel}</span>
                            {s.benefits}
                          </div>
                          <div className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed pt-2.5 border-t border-slate-200 dark:border-slate-800">
                            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">{t.docsLabel}</span>
                            {s.required_documents || t.defaultDocs}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 text-xs font-semibold">
                          <button
                            onClick={() => setSelectedScheme(s)}
                            className="flex-1 bg-gov-blue hover:bg-gov-navy text-white py-2 rounded-xl text-center transition-colors"
                          >
                            {t.viewDetails}
                          </button>
                          <button
                            onClick={() => toggleCompare(s)}
                            className={`px-4 py-2 rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                              isInCompare(s.id)
                                ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-200 dark:border-emerald-900/55'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                          >
                            {isInCompare(s.id) ? (
                              <>
                                <Check className="w-4 h-4 text-emerald-500" /> {t.addedToCompare}
                              </>
                            ) : (
                              t.addToCompare
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl text-center">
                  <p className="text-slate-400 text-sm">{t.noResults}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
              <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                {t.pendingInputs}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
                {t.pendingSubtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
