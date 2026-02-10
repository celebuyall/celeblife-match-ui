import React, { useMemo, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';
import {
  CheckCircle2,
  Target,
  Zap,
  Search,
  Lightbulb,
  BarChart3,
  User,
  Instagram,
  Youtube,
  ArrowRight,
  TrendingUp,
  Brain,
  Layers,
  Quote,
  Sparkles,
  Link as LinkIcon,
  MessageCircle,
  Puzzle,
  Microscope,
  ArrowRightLeft,
  ChevronRight,
  Maximize2,
  Fingerprint,
  HeartHandshake,
  Scale,
  Film,
  BookOpen,
  Calendar,
  RefreshCw,
  MousePointerClick,
  ArrowDown,
  PlayCircle,
  Clapperboard,
  ShoppingBag,
  FileSpreadsheet,
  LayoutDashboard
} from './components/Icons';
import * as Icons from './components/Icons';
import { Logo } from './components/Logo';
import { CelebProfile, MatchPoint, ContentIdea, StrategicPillar } from './types';
import { reportData } from './data';
import { CATEGORY_THEMES, ITEM_THEME_COLORS, HIGHLIGHT_COLOR_CLASSES } from './theme';

function getIcon(name: string, size: number) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ size: number }>>)[name];
  return IconComponent ? <IconComponent size={size} /> : null;
}

interface DashboardProps {
  overrideData?: typeof reportData;
}

// --- HELPER FUNCTIONS ---

// 키워드 강조 함수: '키워드' 형태를 강조 스타일로 변환
const highlightKeywords = (text: string, color: string = 'green') => {
  const parts = text.split(/('.*?')/g);
  return parts.map((part, i) => {
    if (part.startsWith("'") && part.endsWith("'")) {
      const keyword = part.slice(1, -1);
      return <strong key={i} className={HIGHLIGHT_COLOR_CLASSES[color] || HIGHLIGHT_COLOR_CLASSES.green}>{keyword}</strong>;
    }
    return part;
  });
};

// --- COMPONENTS ---

const MatchScoreGauge = ({ score, summary, themeHex, badgeClass }: { score: number; summary: string; themeHex: string; badgeClass: string }) => {
  const data = [
    { name: 'Score', uv: score, fill: themeHex },
    { name: 'Max', uv: 100, fill: '#f1f5f9' },
  ];

  return (
    <div className="relative w-full h-64 flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 -mt-8">
        <span className="text-4xl font-extrabold text-slate-800 tracking-tight font-sans">{score}</span>
        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Match Score</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={16}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            background={{ fill: '#f1f5f9' }}
            dataKey="uv"
            cornerRadius={50}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="absolute bottom-2 w-full px-6 text-center flex flex-col items-center">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold mb-2 shadow-sm border ${badgeClass}`}>
           <Sparkles size={10} /> Excellent Synergy
        </div>
        <p className="text-xs text-slate-600 font-medium leading-snug max-w-[200px] break-keep">
          {summary}
        </p>
      </div>
    </div>
  );
};

const DnaChart = ({ data, themeHex }: { data: any[]; themeHex: string }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid gridType="polygon" stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="label" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
        <Radar
          name="Celeb DNA"
          dataKey="value"
          stroke={themeHex}
          strokeWidth={2}
          fill={themeHex}
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default function Dashboard({ overrideData }: DashboardProps) {
  const data = overrideData || reportData;
  const { celebData, matchScore, productDefinition, matchPoints, contentIdeas, strategicPillars, externalLinks } = data;
  const reportTheme = (data.reportTheme as '뷰티' | '푸드') || '푸드';
  const t = CATEGORY_THEMES[reportTheme];
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = strategicPillars[activePillarIndex];

  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const activeContent = contentIdeas[activeContentIndex];

  const formattedDate = useMemo(() => {
    const today = new Date();
    return `${today.getFullYear()}. ${(today.getMonth() + 1).toString().padStart(2, '0')}. ${today.getDate().toString().padStart(2, '0')}`;
  }, []);

  return (
    <div className={`min-h-screen bg-slate-50/50 text-slate-900 pb-20 font-sans ${t.selectionBg} ${t.selectionText}`}>

      {/* Top Navigation / Header */}
      <header className="bg-white/90 border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Logo className="scale-75 origin-left" category={reportTheme} />
             <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
             <span className="text-slate-500 text-xs font-semibold hidden md:block tracking-tight text-gray-500">
               매칭 리포트 & 전략 대시보드
             </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">

            {/* Added: Navigation Links */}
            <div className="flex items-center gap-2 mr-1">
              {externalLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-sm ${link.color} group`}
                  title={link.label}
                >
                  {getIcon(link.icon, 14)}
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              ))}
            </div>

            <div className="text-right hidden xl:block">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">최종 업데이트</p>
              <p className="text-xs font-bold text-slate-700">{formattedDate}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* 1. CELEB PROFILE HERO */}
        <section className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${t.heroBlob} rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-60 pointer-events-none`}></div>

          <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            {/* Left: Basic Info */}
            <div className="flex-1 lg:max-w-md">
              <div className="flex items-start gap-6">
                <a
                  href={celebData.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group/image cursor-pointer"
                  title={celebData.platform === 'youtube' ? '유튜브 방문하기' : '인스타그램 방문하기'}
                >
                  <div className="w-24 h-24 rounded-3xl bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center shrink-0 overflow-hidden relative transition-transform duration-300 group-hover/image:scale-105 group-hover/image:shadow-xl group-hover/image:border-olive-100">
                     <User size={40} className="text-slate-300 absolute" />
                     <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/50 to-transparent"></div>
                     <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors flex items-center justify-center">
                        {celebData.platform === 'youtube'
                          ? <Youtube size={28} className="text-white opacity-0 group-hover/image:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/image:translate-y-0 drop-shadow-md" />
                          : <Instagram size={28} className="text-white opacity-0 group-hover/image:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/image:translate-y-0 drop-shadow-md" />
                        }
                     </div>
                  </div>
                </a>

                <div className="pt-0.5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight border ${
                      celebData.category === '뷰티' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                      celebData.category === '푸드' ? 'bg-green-50 text-green-700 border-green-100' :
                      'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>{celebData.category} 크리에이터</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mb-0.5">
                    {celebData.name}
                    <a href={celebData.profileUrl} target="_blank" rel="noopener noreferrer" className={`text-slate-300 ${t.profileLinkHover} transition-colors`}>
                      {celebData.platform === 'youtube' ? <Youtube size={20} /> : <Instagram size={20} />}
                    </a>
                  </h1>
                  <p className="text-slate-500 font-medium text-base">{celebData.handle}</p>
                </div>
              </div>
            </div>

            {/* Middle: Identity Tags */}
            <div className="flex-1 flex flex-col justify-center lg:border-l lg:border-r border-slate-100 lg:px-10 py-6 lg:py-0">
               <h3 className="text-[11px] font-extrabold text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                 <Zap size={12} className="text-yellow-500" /> 핵심 아이덴티티
               </h3>
               <div className="flex flex-wrap gap-2 mb-6">
                 {celebData.identity.map((tag, i) => (
                   <span key={i} className={`px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm ${t.identityTagHover} hover:shadow-md transition-all cursor-default`}>
                     {tag}
                   </span>
                 ))}
               </div>
               <div className="relative pl-5">
                 <div className={`absolute left-0 top-1 bottom-1 w-0.5 ${t.taglineBar} rounded-full`}></div>
                 <p className="text-base text-slate-700 leading-relaxed font-medium" style={{ textWrap: 'balance', wordBreak: 'keep-all' }}>
                   "{celebData.tagline}"
                 </p>
               </div>
            </div>

            {/* Right: Radar Chart */}
            <div className="flex-1 h-56 lg:h-auto min-h-[200px] flex flex-col">
               <h3 className="text-[11px] font-extrabold text-slate-400 uppercase mb-3 tracking-widest text-center">커머스 DNA</h3>
               <div className="flex-1 w-full min-h-0">
                 <DnaChart data={celebData.dna} themeHex={t.hex} />
               </div>
            </div>
          </div>
        </section>

        {/* 2. MATCHING SCORE & KEY POINTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Score */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col">
            <div className="bg-slate-50/50 p-5 border-b border-slate-100 flex items-center justify-between backdrop-blur-sm">
               <h2 className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
                 <TrendingUp size={14} className={t.iconAccent} />
                 매칭 점수
               </h2>
               <Maximize2 size={14} className="text-slate-300" />
            </div>
            <div className="flex-1 flex flex-col justify-center py-6">
               <MatchScoreGauge score={matchScore.score} summary={matchScore.summary} themeHex={t.hex} badgeClass={t.excellentBadge} />
            </div>
          </div>

          {/* Right Column: Connection Points Checklist */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] p-6 lg:p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
             <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-50">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${t.coreBg} ${t.coreIconText}`}>
                    <Target size={18} />
                  </div>
                  핵심 연결 포인트 (Key Points)
                </h2>
                <div className="flex gap-2">
                  <span className={`text-[10px] font-bold border px-2.5 py-1 rounded-full shadow-sm ${t.keyPointsBadge}`}>{matchPoints.filter(p => p.isCore).length} 핵심 시너지</span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full shadow-sm">{matchPoints.filter(p => !p.isCore).length} 추가 강점</span>
                </div>
             </div>

             <div className="space-y-3">
               {matchPoints.map((point) => (
                 <div key={point.id} className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 group ${
                   point.isCore
                     ? `${t.coreBg} border ${t.coreBorder} ${t.coreHoverBg} hover:shadow-md ${t.coreHoverBorder}`
                     : 'bg-indigo-50/20 border border-indigo-100 hover:bg-indigo-50/40 hover:border-indigo-200 hover:shadow-md'
                 }`}>
                   <div className={`mt-0.5 p-1 rounded-full shrink-0 transition-colors ${
                     point.isCore
                        ? `${t.coreIconBg} ${t.coreIconText} ${t.coreIconHover}`
                        : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'
                   }`}>
                     <CheckCircle2 size={16} />
                   </div>
                   <div className="flex-1">
                     <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h4 className={`font-bold text-sm tracking-tight ${point.isCore ? 'text-slate-900' : 'text-slate-800'}`}>
                          {point.feature}
                        </h4>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide ${
                          point.isCore
                            ? `${t.coreLabelBg} ${t.coreLabelText} ${t.coreLabelBorder}`
                            : 'bg-white text-indigo-500 border-indigo-200'
                        }`}>
                          {point.connection}
                        </span>
                     </div>
                     <p className={`text-xs font-semibold mb-1 tracking-tight ${point.isCore ? t.coreTitle : 'text-indigo-700'}`}>
                        {highlightKeywords(point.title, point.isCore ? 'green' : 'blue')}
                     </p>
                     <p className={`text-sm leading-relaxed break-keep ${point.isCore ? 'text-slate-600' : 'text-slate-600'}`}>
                       {highlightKeywords(point.logic, point.isCore ? 'green' : 'blue')}
                     </p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* 3. REPORT BODY - INSIGHTS (PRODUCT DEFINITION) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
             <div className={`w-1 h-6 ${t.sectionBar} rounded-full`}></div>
             <div>
               <h2 className="text-xl font-bold text-slate-900 tracking-tight">제품 심층 분석 (Deep Dive Analysis)</h2>
               <p className="text-slate-500 text-xs font-medium">제품의 본질적 가치 재정의</p>
             </div>
          </div>

          {/* 3-1 Product Definition */}
          <div className="bg-slate-850 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-slate-900/10 relative overflow-hidden">
            {/* Abstract Background */}
            <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${t.darkBlob} rounded-full mix-blend-overlay filter blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none`}></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-overlay filter blur-[150px] opacity-10 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                 <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 backdrop-blur-md">제품 정의</span>
                 <h3 className={`text-base font-bold ${t.subHeadingColor} tracking-tight`}>우리는 무엇을 제안하는가?</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left: The Statement */}
                <div>
                   <h2 className="text-3xl md:text-4xl font-medium leading-tight text-white mb-6 break-keep" style={{ textWrap: 'balance' }}>
                     "{productDefinition.headline}<br className="hidden md:block"/>
                     <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${t.headlineGradient}`}>
                       {productDefinition.highlight}
                     </span>입니다."
                   </h2>
                   <p className="text-slate-300 leading-relaxed text-base mb-6 font-light break-keep">
                     {productDefinition.description}
                   </p>
                   <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-inner">
                      <Quote size={20} className={`${t.quoteIconColor} mb-3 opacity-50`}/>
                      <p className="text-base text-slate-100 font-light italic leading-relaxed break-keep">
                        {productDefinition.quote}
                      </p>
                   </div>
                </div>

                {/* Right: Key Concepts Grid */}
                <div className="grid grid-cols-1 gap-4">
                   {productDefinition.keyConcepts.map((concept, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-5 hover:bg-white/10 transition-all group cursor-default shadow-lg shadow-black/5">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-white/5 ${ITEM_THEME_COLORS[concept.theme].conceptIconGradient}`}>
                          {getIcon(concept.icon, 24)}
                        </div>
                        <div className="py-0.5">
                          <h4 className={`font-bold text-lg text-white mb-1 transition-colors ${ITEM_THEME_COLORS[concept.theme].conceptTitleHover}`}>{concept.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed break-keep">
                            {concept.description}
                          </p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. STRATEGIC FIT - INTERACTIVE SECTION (DENSE & COMPACT REDESIGN) */}
        <section className="py-8">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-800 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4 border border-slate-200 shadow-sm">
              <Sparkles size={12} className={t.strategicBadge} />
              전략적 적합성 & 필연적 매칭
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              왜 다른 누구도 아닌,<br className="md:hidden" /> <span className={`text-transparent bg-clip-text bg-gradient-to-r ${t.nameGradient}`}>{celebData.name}</span>인가?
            </h2>
            <p className="max-w-xl text-slate-500 text-base md:text-lg font-light leading-relaxed break-keep">
              이 만남은 선택이 아닌 <strong className={`text-slate-900 font-bold decoration-4 underline ${t.decorationUnderline} underline-offset-4`}>필연</strong>입니다.<br/>
              브랜드 철학, 팬덤의 고통, 그리고 미개척 영역을 관통하는 3가지 이유.
            </p>
          </div>

          {/* Interactive Tabs Navigation */}
          <div className="max-w-4xl mx-auto mb-10">
             <div className="flex flex-wrap justify-center p-1.5 bg-white rounded-full shadow-lg border border-slate-100">
                {strategicPillars.map((pillar, index) => (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillarIndex(index)}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 outline-none overflow-hidden group ${
                       activePillarIndex === index
                         ? 'text-white shadow-md transform scale-105'
                         : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {/* Active Background */}
                    {activePillarIndex === index && (
                      <div className={`absolute inset-0 transition-colors duration-500 ${ITEM_THEME_COLORS[pillar.theme].tabActiveBg}`}></div>
                    )}

                    <span className={`relative z-10 transition-transform duration-300 ${activePillarIndex === index ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {getIcon(pillar.icon, 16)}
                    </span>
                    <span className="relative z-10">{pillar.tabTitle}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* Active Content Card - DENSE LAYOUT */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden transition-all duration-700">

             {/* Header Section: Compact */}
             <div className="px-6 py-6 lg:px-10 lg:py-8 border-b border-slate-100 relative overflow-hidden bg-white/80 backdrop-blur-sm z-20">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${ITEM_THEME_COLORS[activePillar.theme].reasonBadge}`}>
                    Reason 0{activePillar.id + 1}
                  </span>
                  <div className={`h-px flex-1 ${ITEM_THEME_COLORS[activePillar.theme].dividerLine}`}></div>
                </div>
                <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight break-keep">
                  {activePillar.title.split(':')[0]}: <span className={`text-transparent bg-clip-text bg-gradient-to-r ${ITEM_THEME_COLORS[activePillar.theme].titleGradient}`}>{activePillar.title.split(':')[1]}</span>
                </h3>
             </div>

             {/* Content Split: Dense & Connected */}
             <div className="flex flex-col lg:flex-row">

                {/* Left: The Context (Tinted BG) */}
                <div className={`flex-1 p-8 lg:p-10 relative ${ITEM_THEME_COLORS[activePillar.theme].contextBg}`}>
                   {/* Decorative background blob */}
                   <div className={`absolute top-0 left-0 w-full h-full opacity-30 mix-blend-multiply pointer-events-none ${ITEM_THEME_COLORS[activePillar.theme].contextRadial}`}></div>

                   <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-2 text-slate-400 font-extrabold uppercase text-[10px] tracking-[0.2em] mb-3">
                        <User size={12} /> {activePillar.context.label}
                      </div>

                      <h4 className={`text-lg font-bold mb-1 ${ITEM_THEME_COLORS[activePillar.theme].contextHeadline}`}>
                        {activePillar.context.headline}
                      </h4>
                      <p className="text-slate-500 font-serif italic mb-5 text-xs">{activePillar.context.subHeadline}</p>

                      {/* Quote Card */}
                      <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm mb-5 relative">
                         <Quote className="absolute top-3 left-3 text-slate-100" size={20} />
                         <p className="relative z-10 text-slate-700 leading-relaxed font-medium pt-1 break-keep text-sm">
                           {highlightKeywords(activePillar.context.description, activePillar.theme)}
                         </p>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {activePillar.context.keywords.map((kw, i) => (
                          <span key={i} className="px-2.5 py-0.5 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg shadow-sm">
                            #{kw}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>

                {/* Right: The Solution (White BG) */}
                <div className="flex-1 p-8 lg:p-10 bg-white relative">
                   <div className="flex flex-col h-full">
                       <div className="flex items-center gap-2 font-extrabold uppercase text-[10px] tracking-[0.2em] mb-3 opacity-70" style={{ color: ITEM_THEME_COLORS[activePillar.theme].solutionLabelColor }}>
                          <Zap size={12} /> {activePillar.solution.label}
                       </div>

                       <h4 className="text-lg font-bold text-slate-900 mb-2 break-keep leading-snug">
                         {activePillar.solution.headline}
                       </h4>

                       <p className="text-slate-600 leading-relaxed mb-6 text-sm break-keep">
                         {highlightKeywords(activePillar.solution.description, activePillar.theme)}
                       </p>

                       <div className="mt-auto grid grid-cols-1 gap-2.5">
                          {activePillar.solution.keyPoints.map((point, i) => (
                            <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all hover:shadow-sm ${ITEM_THEME_COLORS[activePillar.theme].keyPointCard}`}>
                               <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${ITEM_THEME_COLORS[activePillar.theme].keyPointIcon}`}>
                                 <CheckCircle2 size={10} />
                               </div>
                               <span className={`font-bold text-xs ${ITEM_THEME_COLORS[activePillar.theme].keyPointText}`}>{point}</span>
                            </div>
                          ))}
                       </div>
                   </div>
                </div>

             </div>
          </div>
        </section>

        {/* 5. CONTENT STRATEGY - UPDATED SECTION */}
        <section>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 mt-12 px-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-slate-900 rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">콘텐츠 전략 & 아이디어 (Content Strategy)</h2>
                <p className="text-slate-500 text-xs mt-0.5 font-medium">단순 공구가 아닌 '브랜드 서사'를 완성하는 3단계 시나리오</p>
              </div>
            </div>
          </div>

          {/* Removed Strategic Core Section as requested */}

          {/* Content Strategy - Clean Document Layout */}
          <div className="relative">
             {/* Tabs Navigation */}
             <div className="flex w-full mb-0 border-b border-slate-200/60 overflow-x-auto">
                {contentIdeas.map((idea, idx) => (
                   <button
                     key={idx}
                     onClick={() => setActiveContentIndex(idx)}
                     className={`relative flex-1 py-4 px-5 text-xs font-bold uppercase tracking-widest transition-all outline-none whitespace-nowrap hover:bg-slate-50 ${
                        activeContentIndex === idx
                           ? 'text-slate-900'
                           : 'text-slate-400 hover:text-slate-600'
                     }`}
                   >
                     <span className="mr-2 opacity-50 font-serif italic">{String(idx + 1).padStart(2, '0')}.</span>
                     {idea.subTitle}
                     {activeContentIndex === idx && (
                        <div className={`absolute bottom-0 left-0 w-full h-0.5 ${ITEM_THEME_COLORS[idea.theme].tabUnderline}`}></div>
                     )}
                   </button>
                ))}
             </div>

             {/* Main Content Area - Document Style */}
             <div className="bg-white rounded-b-[2.5rem] shadow-xl border-x border-b border-slate-100 relative z-10 overflow-hidden p-6 md:p-10">

                 {/* 1. Header & Tags */}
                 <div className="max-w-4xl mx-auto mb-10 text-center">
                    <div className="flex flex-wrap justify-center gap-2.5 mb-4">
                       {activeContent.tags.map((tag, i) => (
                          <span key={i} className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border shadow-sm ${ITEM_THEME_COLORS[activeContent.theme].contentTag}`}>
                            {tag}
                          </span>
                        ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-[1.2] mb-3 break-keep tracking-tight">
                       {activeContent.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm uppercase tracking-widest">{activeContent.subTitle}</p>
                 </div>

                 {/* 2. The Scenario Flow - Timeline Card Style */}
                 <div className="max-w-3xl mx-auto mb-12">
                    <div className="flex items-center gap-2.5 mb-6">
                       <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-500">
                          <Clapperboard size={14} />
                       </span>
                       <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Scenario Flow (연출 흐름)</h4>
                    </div>

                    <div className="relative pl-6 border-l-2 border-slate-100 ml-3.5 space-y-4">
                         {activeContent.flow.map((step, i) => (
                           <div key={i} className="relative group">
                              {/* Timeline Dot */}
                              <div className={`absolute -left-[33px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-sm transition-colors duration-300 z-10 ${ITEM_THEME_COLORS[activeContent.theme].timelineDot} group-hover:scale-125`}></div>

                              {/* Content Card */}
                              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all relative">
                                 <div className="absolute -left-2.5 top-5 w-2.5 h-2.5 bg-white border-l border-b border-slate-200 transform rotate-45"></div>
                                 <span className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${ITEM_THEME_COLORS[activeContent.theme].stepLabel}`}>
                                    Step 0{i + 1}
                                 </span>
                                 <p className="text-sm text-slate-700 leading-relaxed font-medium break-keep">
                                   {highlightKeywords(step, activeContent.theme)}
                                 </p>
                              </div>
                           </div>
                         ))}
                    </div>
                 </div>

                 {/* 3. Strategic Analysis Grid - Logic vs Synergy */}
                 <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left: Logic (Why it fits) */}
                    <div className="flex flex-col">
                       <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                          <Target size={14} /> 전략적 적합성 (Why it fits)
                       </h4>
                       <div className="bg-slate-50 rounded-[1.5rem] p-6 md:p-8 relative flex-1">
                          <Quote className="text-slate-200 absolute top-6 left-6" size={32} />
                          <p className="relative z-10 text-slate-700 leading-relaxed text-sm break-keep font-medium pt-3">
                             {highlightKeywords(activeContent.rationale, activeContent.theme)}
                          </p>
                          <div className="mt-4 flex items-center gap-2.5">
                             <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Strategy Team Insight</span>
                          </div>
                       </div>
                    </div>

                    {/* Right: Synergy (Expected Impact) */}
                    <div className="flex flex-col">
                       <h4 className={`text-[10px] font-extrabold uppercase tracking-widest mb-4 flex items-center gap-1.5 ${ITEM_THEME_COLORS[activeContent.theme].synergyHeader}`}>
                          <Zap size={14} /> 기대 효과 (Expected Synergy)
                       </h4>
                       <div className={`rounded-[1.5rem] p-6 md:p-8 flex-1 relative overflow-hidden group transition-all duration-500 hover:shadow-lg border ${ITEM_THEME_COLORS[activeContent.theme].synergyCard}`}>
                          {/* Decorative overlay */}
                          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

                          <div className="relative z-10 h-full flex flex-col justify-between">
                             <p className="text-white text-base leading-relaxed break-keep font-medium shadow-sm">
                                "{highlightKeywords(activeContent.synergy, 'white')}"
                             </p>
                             <div className="mt-6 pt-6 border-t border-white/20 flex justify-between items-center">
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Impact Analysis</span>
                                <div className="bg-white/20 p-1.5 rounded-full text-white backdrop-blur-sm">
                                   <TrendingUp size={16} />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                 </div>

             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
