import React from 'react';
import { Landmark, TrendingUp, Sparkles, BookOpen, Clock, FileText, CheckCircle } from 'lucide-react';

export default function Dashboard({ bilingual, stats, schemes, services, setPage, setSelectedScheme }) {
  const summary = stats.summary || {
    totalSchemes: schemes.length || 116,
    totalServices: services.length || 105,
    totalDepts: 10,
    totalGrievanceCats: 12
  };

  // Translations dictionary
  const t = {
    title: bilingual === 'EN' ? 'Citizen Dashboard & Welfare Analytics' : 'పౌరుల డాష్‌బోర్డ్ & సంక్షేమ విశ్లేషణలు',
    subtitle: bilingual === 'EN' ? 'Real-time insights on government welfare budgets, scheme categories, department statistics, and popular digital services.' : 'ప్రభుత్వ సంక్షేమ బడ్జెట్లు, పథకాల విభాగాలు, శాఖల గణాంకాలు మరియు పౌర సేవలపై నిజ-సమయ విశ్లేషణలు.',
    statsLabels: {
      activeWelfare: bilingual === 'EN' ? 'Active Welfare Schemes' : 'యాక్టివ్ సంక్షేమ పథకాలు',
      digitalMeeSeva: bilingual === 'EN' ? 'Digital MeeSeva Services' : 'డిజిటల్ మీసేవ సేవలు',
      integratedDepts: bilingual === 'EN' ? 'Integrated Departments' : 'సమన్వయ ప్రభుత్వ విభాగాలు',
      activeGrievance: bilingual === 'EN' ? 'Active Grievance Boards' : 'యాక్టివ్ గ్రీవెన్స్ బోర్డులు',
      centralApState: bilingual === 'EN' ? 'Central & AP State' : 'కేంద్ర & ఆంధ్రప్రదేశ్ రాష్ట్రం',
      nationalRegional: bilingual === 'EN' ? 'National & Regional' : 'జాతీయ & ప్రాంతీయ',
      liaisonExecution: bilingual === 'EN' ? 'Liaison & Execution' : 'సమన్వయం & అమలు',
      citizenResolution: bilingual === 'EN' ? 'Citizen Resolution' : 'పౌరుల సమస్యల పరిష్కారం'
    },
    welfareByCategory: bilingual === 'EN' ? 'Welfare Schemes by Category' : 'విభాగాల వారీగా సంక్షేమ పథకాలు',
    categoryChartSubtitle: bilingual === 'EN' ? 'Total count of schemes mapped across agricultural, educational and social sectors.' : 'వ్యవసాయ, విద్యా మరియు సామాజిక రంగాల వారీగా మ్యాప్ చేయబడిన పథకాల మొత్తం సంఖ్య.',
    centralVsState: bilingual === 'EN' ? 'Central vs State Schemes' : 'కేంద్ర వర్సెస్ రాష్ట్ర పథకాలు',
    donutSubtitle: bilingual === 'EN' ? 'Proportion of national programs compared to state schemes.' : 'రాష్ట్ర పథకాలతో పోల్చినప్పుడు జాతీయ కార్యక్రమాల నిష్పత్తి.',
    totalPrograms: bilingual === 'EN' ? 'Total Programs' : 'మొత్తం పథకాలు',
    centralGovLabel: bilingual === 'EN' ? 'Central Gov' : 'కేంద్ర ప్రభుత్వం',
    stateGovLabel: bilingual === 'EN' ? 'Andhra Pradesh' : 'ఆంధ్రప్రదేశ్',
    schemesCountText: (c) => bilingual === 'EN' ? `${c} Schemes` : `${c} పథకాలు`,
    topDeptsTitle: bilingual === 'EN' ? 'Top Departments by Schemes' : 'పథకాల ఆధారంగా అగ్ర విభాగాలు',
    topDeptsSubtitle: bilingual === 'EN' ? 'Top 5 departments managing highest number of active welfare schemes.' : 'అత్యధిక సంఖ్యలో సంక్షేమ పథకాలను నిర్వహిస్తున్న అగ్ర 5 ప్రభుత్వ విభాగాలు.',
    mostVisitedTitle: bilingual === 'EN' ? 'Most Visited Schemes' : 'అత్యధికంగా సందర్శించిన పథకాలు',
    recentlyAddedTitle: bilingual === 'EN' ? 'Recently Added Schemes' : 'ఇటీవల జోడించిన పథకాలు',
    viewDetails: bilingual === 'EN' ? 'View Details' : 'వివరాలు చూడు',
    loadingStats: bilingual === 'EN' ? 'Loading department statistics...' : 'శాఖల గణాంకాలను సేకరిస్తోంది...'
  };

  const getCategoryName = (engName) => {
    if (bilingual === 'EN') return engName;
    const translationMap = {
      'Education': 'విద్య',
      'Agriculture': 'వ్యవసాయం',
      'Health': 'ఆరోగ్యం',
      'Housing': 'గృహనిర్మాణం',
      'Pensions': 'పింఛన్లు',
      'Social Welfare': 'సామాజిక సంక్షేమం',
      'Employment': 'ఉపాధి',
      'Business': 'వ్యాపారం',
      'Women & Child Development': 'మహిళా & శిశు',
      'Disabled Welfare': 'వికలాంగులు',
      'Sports & Youth': 'క్రీడలు',
      'Utility Services': 'సేవలు'
    };
    return translationMap[engName] || engName;
  };

  // Popular / Most-Compared Schemes (mock high interaction)
  const popularSchemes = schemes.filter(s => 
    ['PM Kisan Samman Nidhi', 'Thalliki Vandanam', 'Annadatha Sukhibhava', 'NTR Bharosa Pension Scheme', 'Atal Pension Yojana (APY)'].includes(s.name)
  ).slice(0, 4);

  // Recently Added Schemes
  const recentlyAdded = schemes.slice(schemes.length - 4, schemes.length).reverse();

  // --- SVG Chart 1: Category Distribution (Bar Chart) ---
  const catData = stats.schemesByCategory || [];
  const maxCatCount = catData.length > 0 ? Math.max(...catData.map(d => d.count)) : 10;
  const barChartWidth = 500;
  const barChartHeight = 220;
  const barPadding = 12;
  const barWidth = catData.length > 0 ? (barChartWidth - 40) / catData.length - barPadding : 30;

  // --- SVG Chart 2: Central vs State (Donut Chart) ---
  const typeData = stats.schemesByType || [{ type: 'Central', count: 101 }, { type: 'State', count: 15 }];
  const totalTypeCount = typeData.reduce((acc, d) => acc + d.count, 0) || 1;
  const centralCount = typeData.find(d => d.type === 'Central')?.count || 0;
  const stateCount = typeData.find(d => d.type === 'State')?.count || 0;
  
  const donutRadius = 65;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const centralPercent = centralCount / totalTypeCount;
  const statePercent = stateCount / totalTypeCount;
  
  const centralDash = centralPercent * donutCircumference;
  const stateDash = statePercent * donutCircumference;

  // --- SVG Chart 3: Department-wise Distribution (Horizontal Bars) ---
  const deptData = stats.schemesByDept || [];
  const maxDeptCount = deptData.length > 0 ? Math.max(...deptData.map(d => d.count)) : 10;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden">
        <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2.5">
          <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full shadow-sm shadow-blue-500/20"></span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-200">
            {t.title}
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-relaxed max-w-4xl">
          {t.subtitle}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: t.statsLabels.activeWelfare, 
            value: summary.totalSchemes, 
            sub: t.statsLabels.centralApState,
            icon: BookOpen,
            colorClasses: {
              bg: 'bg-gradient-to-br from-blue-50/50 to-indigo-50/20 dark:from-blue-950/20 dark:to-indigo-950/10',
              border: 'border-blue-100 hover:border-blue-300 dark:border-blue-900/50 dark:hover:border-blue-700/60',
              iconBg: 'bg-blue-100/80 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
              shadow: 'hover:shadow-blue-500/5',
              badge: 'bg-blue-100/50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            }
          },
          { 
            label: t.statsLabels.digitalMeeSeva, 
            value: summary.totalServices, 
            sub: t.statsLabels.nationalRegional,
            icon: Sparkles,
            colorClasses: {
              bg: 'bg-gradient-to-br from-emerald-50/50 to-teal-50/20 dark:from-emerald-950/20 dark:to-teal-950/10',
              border: 'border-emerald-100 hover:border-emerald-300 dark:border-emerald-900/50 dark:hover:border-emerald-700/60',
              iconBg: 'bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
              shadow: 'hover:shadow-emerald-500/5',
              badge: 'bg-emerald-100/50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
            }
          },
          { 
            label: t.statsLabels.integratedDepts, 
            value: summary.totalDepts, 
            sub: t.statsLabels.liaisonExecution,
            icon: Landmark,
            colorClasses: {
              bg: 'bg-gradient-to-br from-amber-50/50 to-orange-50/20 dark:from-amber-950/20 dark:to-orange-950/10',
              border: 'border-amber-100 hover:border-amber-300 dark:border-amber-900/50 dark:hover:border-amber-700/60',
              iconBg: 'bg-amber-100/80 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
              shadow: 'hover:shadow-amber-500/5',
              badge: 'bg-amber-100/50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
            }
          },
          { 
            label: t.statsLabels.activeGrievance, 
            value: summary.totalGrievanceCats, 
            sub: t.statsLabels.citizenResolution,
            icon: FileText,
            colorClasses: {
              bg: 'bg-gradient-to-br from-rose-50/50 to-pink-50/20 dark:from-rose-950/20 dark:to-pink-950/10',
              border: 'border-rose-100 hover:border-rose-300 dark:border-rose-900/50 dark:hover:border-rose-700/60',
              iconBg: 'bg-rose-100/80 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
              shadow: 'hover:shadow-rose-500/5',
              badge: 'bg-rose-100/50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
            }
          }
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div 
              key={i} 
              className={`p-6 rounded-2xl border ${s.colorClasses.bg} ${s.colorClasses.border} shadow-sm ${s.colorClasses.shadow} hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    {s.label}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                    {s.value}
                  </span>
                </div>
                <div className={`p-2.5 rounded-xl ${s.colorClasses.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <span className={`inline-flex self-start items-center px-2 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase mt-4 ${s.colorClasses.badge}`}>
                {s.sub}
              </span>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart 1: Scheme Category Distribution */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-gov-blue" />
              {t.welfareByCategory}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400">{t.categoryChartSubtitle}</p>
          </div>

          <div className="w-full overflow-x-auto mt-6">
            <svg viewBox={`0 0 ${barChartWidth} ${barChartHeight}`} className="w-full h-auto min-w-[400px]">
              {/* Grid lines */}
              <line x1="30" y1="180" x2={barChartWidth} y2="180" stroke="#cbd5e1" strokeWidth="1" className="dark:stroke-slate-800" />
              <line x1="30" y1="130" x2={barChartWidth} y2="130" stroke="#e2e8f0" strokeDasharray="3" className="dark:stroke-slate-800/50" />
              <line x1="30" y1="80" x2={barChartWidth} y2="80" stroke="#e2e8f0" strokeDasharray="3" className="dark:stroke-slate-800/50" />
              <line x1="30" y1="30" x2={barChartWidth} y2="30" stroke="#e2e8f0" strokeDasharray="3" className="dark:stroke-slate-800/50" />

              {/* Y Axis text */}
              <text x="5" y="184" className="text-[10px] fill-slate-400 font-medium">0</text>
              <text x="5" y="134" className="text-[10px] fill-slate-400 font-medium">{Math.round(maxCatCount * 0.33)}</text>
              <text x="5" y="84" className="text-[10px] fill-slate-400 font-medium">{Math.round(maxCatCount * 0.66)}</text>
              <text x="5" y="34" className="text-[10px] fill-slate-400 font-medium">{maxCatCount}</text>

              {/* Bars */}
              {catData.map((d, index) => {
                const barHeight = (d.count / maxCatCount) * 150;
                const x = 40 + index * (barWidth + barPadding);
                const y = 180 - barHeight;
                const localCatName = getCategoryName(d.name);
                return (
                  <g key={index} className="group cursor-pointer">
                    <defs>
                      <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1e40af" />
                      </linearGradient>
                    </defs>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={Math.max(barHeight, 4)}
                      rx="4"
                      fill={`url(#grad-${index})`}
                      className="transition-all duration-300 hover:fill-gov-accent"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 6}
                      textAnchor="middle"
                      className="text-[9px] font-bold fill-gov-blue dark:fill-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {d.count}
                    </text>
                    {/* X axis labels (abbreviated or sliced to fit) */}
                    <text
                      x={x + barWidth / 2}
                      y="196"
                      textAnchor="middle"
                      className="text-[9px] fill-slate-400 font-semibold uppercase tracking-wider"
                    >
                      {localCatName.slice(0, 4)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Chart 2: Central vs State ratio (Donut Chart) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-between items-center text-center">
          <div className="self-start text-left">
            <h3 className="font-bold text-slate-950 dark:text-white text-sm uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-gov-blue" />
              {t.centralVsState}
            </h3>
            <p className="text-[10px] text-slate-400">{t.donutSubtitle}</p>
          </div>

          <div className="relative my-6 flex items-center justify-center">
            <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={donutRadius}
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth="18"
                className="dark:stroke-slate-800"
              />
              {/* Central segment (orange/saffron) */}
              <circle
                cx="80"
                cy="80"
                r={donutRadius}
                fill="transparent"
                stroke="#e65100"
                strokeWidth="18"
                strokeDasharray={donutCircumference}
                strokeDashoffset={donutCircumference - centralDash}
                className="transition-all duration-300"
              />
              {/* State segment (blue) */}
              <circle
                cx="80"
                cy="80"
                r={donutRadius}
                fill="transparent"
                stroke="#1565c0"
                strokeWidth="18"
                strokeDasharray={donutCircumference}
                strokeDashoffset={donutCircumference - stateDash}
                className="transition-all duration-300"
                style={{ transform: `rotate(${(centralPercent * 360)}deg)`, transformOrigin: '80px 80px' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white">{summary.totalSchemes}</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{t.totalPrograms}</span>
            </div>
          </div>

          {/* Legends */}
          <div className="w-full grid grid-cols-2 gap-4 text-xs font-semibold pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center border-r border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-orange-600 rounded-full"></span>
                <span className="text-slate-800 dark:text-slate-200">{t.centralGovLabel}</span>
              </div>
              <span className="text-slate-500 font-normal mt-0.5">{t.schemesCountText(centralCount)} ({Math.round(centralPercent * 100)}%)</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                <span className="text-slate-800 dark:text-slate-200">{t.stateGovLabel}</span>
              </div>
              <span className="text-slate-500 font-normal mt-0.5">{t.schemesCountText(stateCount)} ({Math.round(statePercent * 100)}%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid 2: Horizontal chart & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart 3: Top Departments Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white text-sm uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gov-blue" />
              {t.topDeptsTitle}
            </h3>
            <p className="text-[10px] text-slate-400">{t.topDeptsSubtitle}</p>
          </div>

          <div className="space-y-4 mt-6 flex-1 flex flex-col justify-center">
            {deptData.map((d, index) => {
              const fillPercent = (d.count / maxDeptCount) * 100;
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300 truncate max-w-[170px]" title={d.dept_name}>
                      {d.dept_code} - {d.dept_name}
                    </span>
                    <span className="text-gov-blue dark:text-blue-400 font-bold">{t.schemesCountText(d.count)}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gov-blue hover:bg-gov-accent transition-all duration-500 h-full rounded-full"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {deptData.length === 0 && (
              <p className="text-xs text-slate-400">{t.loadingStats}</p>
            )}
          </div>
        </div>

        {/* Popular & Recently Added lists */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Popular Schemes */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-slate-950 dark:text-white text-sm uppercase tracking-wide mb-4 flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <CheckCircle className="w-4.5 h-4.5 text-gov-blue" />
              {t.mostVisitedTitle}
            </h3>
            <div className="space-y-3 flex-1">
              {popularSchemes.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedScheme(s)}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-850 rounded-xl cursor-pointer transition w-full border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <span className="font-bold text-slate-900 dark:text-white text-xs block truncate">{s.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {bilingual === 'TE' ? getCategoryName(s.category_name) : s.category_name} &bull; {s.type === 'Central' ? t.centralGovLabel : t.stateGovLabel}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gov-blue flex-shrink-0">{t.viewDetails}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added Schemes */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-slate-950 dark:text-white text-sm uppercase tracking-wide mb-4 flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Clock className="w-4.5 h-4.5 text-gov-blue" />
              {t.recentlyAddedTitle}
            </h3>
            <div className="space-y-3 flex-1">
              {recentlyAdded.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedScheme(s)}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-850 rounded-xl cursor-pointer transition w-full border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <span className="font-bold text-slate-900 dark:text-white text-xs block truncate">{s.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {bilingual === 'TE' ? getCategoryName(s.category_name) : s.category_name} &bull; {s.type === 'Central' ? t.centralGovLabel : t.stateGovLabel}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gov-blue flex-shrink-0">{t.viewDetails}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
