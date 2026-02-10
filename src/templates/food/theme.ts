type ReportTheme = '뷰티' | '푸드';
type ItemTheme = 'purple' | 'green' | 'blue' | 'teal' | 'pink';

// --- Category-level theme (page-level colors) ---

export interface CategoryTheme {
  hex: string;
  logoText: string;
  logoColor: string;
  projectPrefix: string;
  // Selection highlight
  selectionBg: string;
  selectionText: string;
  // Score gauge fill
  gaugeFill: string;
  // Excellent badge
  excellentBadge: string;
  // Section accent bar
  sectionBar: string;
  // Hero gradient blob
  heroBlob: string;
  // Dark section blob
  darkBlob: string;
  // Product headline gradient
  headlineGradient: string;
  // Product sub-heading color
  subHeadingColor: string;
  // Quote icon color
  quoteIconColor: string;
  // Strategic section badge
  strategicBadge: string;
  // Strategic name gradient
  nameGradient: string;
  // Decoration underline
  decorationUnderline: string;
  // Icon accent (e.g. TrendingUp, Target, Sparkles)
  iconAccent: string;
  // Identity tag hover
  identityTagHover: string;
  // Tagline bar
  taglineBar: string;
  // Profile link hover
  profileLinkHover: string;
  // Radar chart stroke/fill
  radarStroke: string;
  radarFill: string;
  // Core match point colors
  coreBg: string;
  coreBorder: string;
  coreHoverBg: string;
  coreHoverBorder: string;
  coreIconBg: string;
  coreIconText: string;
  coreIconHover: string;
  coreLabelBg: string;
  coreLabelText: string;
  coreLabelBorder: string;
  coreTitle: string;
  // Key points badge
  keyPointsBadge: string;
}

export const CATEGORY_THEMES: Record<ReportTheme, CategoryTheme> = {
  '푸드': {
    hex: '#7c7d35',
    logoText: 'Celebfood',
    logoColor: '#7c7d35',
    projectPrefix: 'celebfood-report',
    selectionBg: 'selection:bg-olive-200',
    selectionText: 'selection:text-olive-900',
    gaugeFill: '#7c7d35',
    excellentBadge: 'bg-olive-50 text-olive-700 border-olive-200',
    sectionBar: 'bg-gradient-to-b from-olive-500 to-emerald-600',
    heroBlob: 'from-olive-50 to-emerald-50',
    darkBlob: 'bg-olive-600',
    headlineGradient: 'from-olive-300 via-emerald-300 to-teal-300',
    subHeadingColor: 'text-olive-200/80',
    quoteIconColor: 'text-olive-400',
    strategicBadge: 'text-olive-600',
    nameGradient: 'from-olive-600 to-emerald-600',
    decorationUnderline: 'decoration-olive-200',
    iconAccent: 'text-olive-600',
    identityTagHover: 'hover:border-olive-300 hover:text-olive-600',
    taglineBar: 'bg-olive-200',
    profileLinkHover: 'hover:text-olive-500',
    radarStroke: '#7c7d35',
    radarFill: '#7c7d35',
    coreBg: 'bg-olive-50/40',
    coreBorder: 'border-olive-100',
    coreHoverBg: 'hover:bg-olive-50',
    coreHoverBorder: 'hover:border-olive-300',
    coreIconBg: 'bg-olive-100',
    coreIconText: 'text-olive-600',
    coreIconHover: 'group-hover:bg-olive-200',
    coreLabelBg: 'bg-white',
    coreLabelText: 'text-olive-600',
    coreLabelBorder: 'border-olive-200',
    coreTitle: 'text-olive-700',
    keyPointsBadge: 'text-olive-700 bg-olive-50 border-olive-100',
  },
  '뷰티': {
    hex: '#8b5cf6',
    logoText: 'Celebeauty',
    logoColor: '#8b5cf6',
    projectPrefix: 'celebeauty-report',
    selectionBg: 'selection:bg-purple-200',
    selectionText: 'selection:text-purple-900',
    gaugeFill: '#8b5cf6',
    excellentBadge: 'bg-purple-50 text-purple-700 border-purple-200',
    sectionBar: 'bg-gradient-to-b from-purple-500 to-violet-600',
    heroBlob: 'from-purple-50 to-violet-50',
    darkBlob: 'bg-purple-600',
    headlineGradient: 'from-purple-300 via-violet-300 to-fuchsia-300',
    subHeadingColor: 'text-purple-200/80',
    quoteIconColor: 'text-purple-400',
    strategicBadge: 'text-purple-600',
    nameGradient: 'from-purple-600 to-violet-600',
    decorationUnderline: 'decoration-purple-200',
    iconAccent: 'text-purple-600',
    identityTagHover: 'hover:border-purple-300 hover:text-purple-600',
    taglineBar: 'bg-purple-200',
    profileLinkHover: 'hover:text-purple-500',
    radarStroke: '#8b5cf6',
    radarFill: '#8b5cf6',
    coreBg: 'bg-purple-50/40',
    coreBorder: 'border-purple-100',
    coreHoverBg: 'hover:bg-purple-50',
    coreHoverBorder: 'hover:border-purple-300',
    coreIconBg: 'bg-purple-100',
    coreIconText: 'text-purple-600',
    coreIconHover: 'group-hover:bg-purple-200',
    coreLabelBg: 'bg-white',
    coreLabelText: 'text-purple-600',
    coreLabelBorder: 'border-purple-200',
    coreTitle: 'text-purple-700',
    keyPointsBadge: 'text-purple-700 bg-purple-50 border-purple-100',
  },
};

// --- Item-level theme (per-item colors for pillars, content, concepts) ---

export interface ItemThemeColors {
  // Tab active background
  tabActiveBg: string;
  // Reason badge
  reasonBadge: string;
  // Divider line
  dividerLine: string;
  // Title gradient
  titleGradient: string;
  // Context tinted bg
  contextBg: string;
  // Context radial gradient
  contextRadial: string;
  // Context headline color
  contextHeadline: string;
  // Solution label color style
  solutionLabelColor: string;
  // Key point card
  keyPointCard: string;
  // Key point icon
  keyPointIcon: string;
  // Key point text
  keyPointText: string;
  // Content tag
  contentTag: string;
  // Timeline tab underline
  tabUnderline: string;
  // Timeline dot
  timelineDot: string;
  // Step label
  stepLabel: string;
  // Synergy header
  synergyHeader: string;
  // Synergy gradient card
  synergyCard: string;
  // Concept icon gradient (dark bg)
  conceptIconGradient: string;
  // Concept title hover (dark bg)
  conceptTitleHover: string;
  // highlightKeywords color class
  highlightClass: string;
}

export const ITEM_THEME_COLORS: Record<ItemTheme, ItemThemeColors> = {
  purple: {
    tabActiveBg: 'bg-purple-600',
    reasonBadge: 'bg-purple-50 text-purple-700 border-purple-100',
    dividerLine: 'bg-purple-100',
    titleGradient: 'from-purple-600 to-violet-600',
    contextBg: 'bg-purple-50/40',
    contextRadial: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent',
    contextHeadline: 'text-purple-900',
    solutionLabelColor: '#7c3aed',
    keyPointCard: 'bg-purple-50/30 border-purple-100 hover:border-purple-300',
    keyPointIcon: 'bg-purple-100 text-purple-600',
    keyPointText: 'text-purple-900',
    contentTag: 'bg-purple-50 text-purple-700 border-purple-100',
    tabUnderline: 'bg-purple-600',
    timelineDot: 'bg-purple-500',
    stepLabel: 'text-purple-600',
    synergyHeader: 'text-purple-600',
    synergyCard: 'bg-gradient-to-br from-purple-600 to-violet-700 border-purple-500',
    conceptIconGradient: 'from-purple-500/20 to-purple-500/5 text-purple-300',
    conceptTitleHover: 'group-hover:text-purple-200',
    highlightClass: 'text-purple-700 font-semibold',
  },
  green: {
    tabActiveBg: 'bg-slate-900',
    reasonBadge: 'bg-olive-50 text-olive-700 border-olive-100',
    dividerLine: 'bg-olive-100',
    titleGradient: 'from-olive-600 to-emerald-600',
    contextBg: 'bg-olive-50/40',
    contextRadial: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-olive-100 via-transparent to-transparent',
    contextHeadline: 'text-olive-900',
    solutionLabelColor: '#15803d',
    keyPointCard: 'bg-olive-50/30 border-olive-100 hover:border-olive-300',
    keyPointIcon: 'bg-olive-100 text-olive-600',
    keyPointText: 'text-olive-900',
    contentTag: 'bg-olive-50 text-olive-700 border-olive-100',
    tabUnderline: 'bg-olive-600',
    timelineDot: 'bg-olive-500',
    stepLabel: 'text-olive-600',
    synergyHeader: 'text-olive-600',
    synergyCard: 'bg-gradient-to-br from-olive-600 to-emerald-700 border-olive-500',
    conceptIconGradient: 'from-olive-500/20 to-olive-500/5 text-olive-300',
    conceptTitleHover: 'group-hover:text-olive-200',
    highlightClass: 'text-olive-700 font-semibold',
  },
  blue: {
    tabActiveBg: 'bg-blue-600',
    reasonBadge: 'bg-blue-50 text-blue-700 border-blue-100',
    dividerLine: 'bg-blue-100',
    titleGradient: 'from-blue-600 to-cyan-600',
    contextBg: 'bg-blue-50/40',
    contextRadial: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent',
    contextHeadline: 'text-blue-900',
    solutionLabelColor: '#1d4ed8',
    keyPointCard: 'bg-blue-50/30 border-blue-100 hover:border-blue-200',
    keyPointIcon: 'bg-blue-100 text-blue-600',
    keyPointText: 'text-blue-900',
    contentTag: 'bg-blue-50 text-blue-700 border-blue-100',
    tabUnderline: 'bg-blue-600',
    timelineDot: 'bg-blue-500',
    stepLabel: 'text-blue-600',
    synergyHeader: 'text-blue-600',
    synergyCard: 'bg-gradient-to-br from-blue-600 to-cyan-700 border-blue-500',
    conceptIconGradient: 'from-indigo-500/20 to-indigo-500/5 text-indigo-300',
    conceptTitleHover: 'group-hover:text-indigo-200',
    highlightClass: 'text-blue-700 font-semibold',
  },
  teal: {
    tabActiveBg: 'bg-teal-600',
    reasonBadge: 'bg-teal-50 text-teal-700 border-teal-100',
    dividerLine: 'bg-teal-100',
    titleGradient: 'from-teal-600 to-cyan-600',
    contextBg: 'bg-teal-50/40',
    contextRadial: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-100 via-transparent to-transparent',
    contextHeadline: 'text-teal-900',
    solutionLabelColor: '#0d9488',
    keyPointCard: 'bg-teal-50/30 border-teal-100 hover:border-teal-200',
    keyPointIcon: 'bg-teal-100 text-teal-600',
    keyPointText: 'text-teal-900',
    contentTag: 'bg-teal-50 text-teal-700 border-teal-100',
    tabUnderline: 'bg-teal-600',
    timelineDot: 'bg-teal-500',
    stepLabel: 'text-teal-600',
    synergyHeader: 'text-teal-600',
    synergyCard: 'bg-gradient-to-br from-teal-600 to-cyan-700 border-teal-500',
    conceptIconGradient: 'from-teal-500/20 to-teal-500/5 text-teal-300',
    conceptTitleHover: 'group-hover:text-teal-200',
    highlightClass: 'text-teal-700 font-semibold',
  },
  pink: {
    tabActiveBg: 'bg-pink-600',
    reasonBadge: 'bg-pink-50 text-pink-700 border-pink-100',
    dividerLine: 'bg-pink-100',
    titleGradient: 'from-pink-600 to-rose-600',
    contextBg: 'bg-pink-50/40',
    contextRadial: 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-transparent to-transparent',
    contextHeadline: 'text-pink-900',
    solutionLabelColor: '#be123c',
    keyPointCard: 'bg-pink-50/30 border-pink-100 hover:border-pink-200',
    keyPointIcon: 'bg-pink-100 text-pink-600',
    keyPointText: 'text-pink-900',
    contentTag: 'bg-pink-50 text-pink-700 border-pink-100',
    tabUnderline: 'bg-pink-600',
    timelineDot: 'bg-pink-500',
    stepLabel: 'text-pink-600',
    synergyHeader: 'text-pink-600',
    synergyCard: 'bg-gradient-to-br from-pink-600 to-rose-700 border-pink-500',
    conceptIconGradient: 'from-pink-500/20 to-pink-500/5 text-pink-300',
    conceptTitleHover: 'group-hover:text-pink-200',
    highlightClass: 'text-pink-700 font-semibold',
  },
};

// --- Highlight keyword color classes ---

export const HIGHLIGHT_COLOR_CLASSES: Record<string, string> = {
  purple: 'text-purple-700 font-semibold',
  green: 'text-olive-700 font-semibold',
  blue: 'text-blue-700 font-semibold',
  teal: 'text-teal-700 font-semibold',
  pink: 'text-pink-700 font-semibold',
  slate: 'text-slate-900 font-semibold',
  white: 'text-white font-bold underline underline-offset-2',
};

// --- Theme cycle per category (for AI prompt) ---

export const THEME_CYCLES: Record<ReportTheme, [ItemTheme, ItemTheme, ItemTheme]> = {
  '뷰티': ['purple', 'blue', 'pink'],
  '푸드': ['green', 'blue', 'pink'],
};

// --- External link color sets per category ---

export interface ExternalLinkColors {
  primary: string;
  secondary: string;
  tertiary: string;
}

export const EXTERNAL_LINK_COLORS: Record<ReportTheme, ExternalLinkColors> = {
  '뷰티': {
    primary: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
    secondary: 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
    tertiary: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
  },
  '푸드': {
    primary: 'text-olive-600 bg-olive-50 border-olive-200 hover:bg-olive-100',
    secondary: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
    tertiary: 'text-olive-600 bg-olive-50 border-olive-200 hover:bg-olive-100',
  },
};
