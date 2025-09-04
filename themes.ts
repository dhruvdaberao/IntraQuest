export interface Theme {
  bg: string;
  accentBg: string;
  accentBgHover: string;
  accentText: string;
  headingText: string;
  baseText: string;
  baseBorder: string;
}

const defaultTheme: Theme = {
  bg: 'bg-zinc-900',
  accentBg: 'bg-zinc-200',
  accentBgHover: 'hover:bg-zinc-300',
  accentText: 'text-zinc-100',
  headingText: 'text-white',
  baseText: 'text-zinc-400',
  baseBorder: 'border-zinc-700/50',
};

// Personality types themes
export const THEMES: { [key: string]: Theme } = {
  default: defaultTheme,

  // Analysts (NT)
  INTJ: { ...defaultTheme, bg: 'from-gray-900 to-slate-900', accentBg: 'bg-violet-600', accentBgHover: 'hover:bg-violet-500', accentText: 'text-violet-400' },
  INTP: { ...defaultTheme, bg: 'from-gray-900 to-slate-900', accentBg: 'bg-purple-600', accentBgHover: 'hover:bg-purple-500', accentText: 'text-purple-400' },
  ENTJ: { ...defaultTheme, bg: 'from-gray-900 to-slate-900', accentBg: 'bg-red-700', accentBgHover: 'hover:bg-red-600', accentText: 'text-red-500' },
  ENTP: { ...defaultTheme, bg: 'from-gray-900 to-slate-900', accentBg: 'bg-rose-600', accentBgHover: 'hover:bg-rose-500', accentText: 'text-rose-400' },
  
  // Diplomats (NF)
  INFJ: { ...defaultTheme, bg: 'from-emerald-950 to-gray-900', accentBg: 'bg-emerald-600', accentBgHover: 'hover:bg-emerald-500', accentText: 'text-emerald-400' },
  INFP: { ...defaultTheme, bg: 'from-sky-950 to-gray-900', accentBg: 'bg-sky-500', accentBgHover: 'hover:bg-sky-400', accentText: 'text-sky-300' },
  ENFJ: { ...defaultTheme, bg: 'from-teal-950 to-gray-900', accentBg: 'bg-teal-500', accentBgHover: 'hover:bg-teal-400', accentText: 'text-teal-300' },
  ENFP: { ...defaultTheme, bg: 'from-cyan-950 to-gray-900', accentBg: 'bg-cyan-500', accentBgHover: 'hover:bg-cyan-400', accentText: 'text-cyan-300' },
  
  // Sentinels (SJ)
  ISTJ: { ...defaultTheme, bg: 'from-blue-950 to-slate-900', accentBg: 'bg-blue-700', accentBgHover: 'hover:bg-blue-600', accentText: 'text-blue-400' },
  ISFJ: { ...defaultTheme, bg: 'from-slate-900 to-gray-800', accentBg: 'bg-slate-500', accentBgHover: 'hover:bg-slate-400', accentText: 'text-slate-300' },
  ESTJ: { ...defaultTheme, bg: 'from-stone-900 to-gray-900', accentBg: 'bg-amber-700', accentBgHover: 'hover:bg-amber-600', accentText: 'text-amber-500' },
  ESFJ: { ...defaultTheme, bg: 'from-orange-950 to-stone-900', accentBg: 'bg-orange-500', accentBgHover: 'hover:bg-orange-400', accentText: 'text-orange-300' },

  // Explorers (SP)
  ISTP: { ...defaultTheme, bg: 'from-zinc-900 to-gray-900', accentBg: 'bg-zinc-600', accentBgHover: 'hover:bg-zinc-500', accentText: 'text-zinc-400' },
  ISFP: { ...defaultTheme, bg: 'from-yellow-950 to-stone-900', accentBg: 'bg-yellow-500', accentBgHover: 'hover:bg-yellow-400', accentText: 'text-yellow-300' },
  ESTP: { ...defaultTheme, bg: 'from-red-950 to-gray-900', accentBg: 'bg-red-600', accentBgHover: 'hover:bg-red-500', accentText: 'text-red-400' },
  ESFP: { ...defaultTheme, bg: 'from-pink-950 to-rose-950', accentBg: 'bg-pink-500', accentBgHover: 'hover:bg-pink-400', accentText: 'text-pink-300' },
};
