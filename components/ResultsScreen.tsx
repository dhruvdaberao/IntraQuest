import React, { useState } from 'react';
import type { PersonalityInsights } from '../types';
import { Icons } from './Icons';
import type { Theme } from '../themes';

interface ResultsScreenProps {
  insights: PersonalityInsights;
  personalityType: string;
  onRestart: () => void;
  theme: Theme;
}

type Tab = 'overview' | 'strengths' | 'careers' | 'relationships' | 'growth' | 'vibe' | 'friends' | 'recs';

const TabButton: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode, theme: Theme }> = ({ active, onClick, children, theme }) => {
    const isDefaultTheme = theme.accentText.includes('zinc');
    const activeTextColor = isDefaultTheme ? 'text-zinc-900' : 'text-white';
    
    const baseClasses = "flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 font-semibold";
    const activeClasses = `${theme.accentBg} ${activeTextColor} shadow-md`;
    const inactiveClasses = `text-zinc-300 hover:bg-white/10 hover:text-white`;

    return (
        <button onClick={onClick} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
}

const InsightCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; theme: Theme }> = ({ title, children, icon, theme }) => (
    <div className={`bg-zinc-900/50 p-6 rounded-xl border ${theme.baseBorder} shadow-lg`}>
        <h3 className={`text-2xl mb-4 flex items-center font-bold ${theme.headingText}`}>
            {icon}
            <span className="ml-3">{title}</span>
        </h3>
        <div className={`text-zinc-300 space-y-4 prose prose-invert prose-p:text-zinc-300 prose-strong:text-white prose-ul:list-disc prose-ul:list-inside`}>{children}</div>
    </div>
);

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ insights, personalityType, onRestart, theme }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <InsightCard title="Overview" icon={<Icons.Overview />} theme={theme}><p className="leading-relaxed">{insights.overview}</p></InsightCard>;
      case 'strengths': return (
        <div className="grid md:grid-cols-2 gap-4">
          <InsightCard title="Strengths" icon={<Icons.Strengths />} theme={theme}><ul>{insights.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></InsightCard>
          <InsightCard title="Weaknesses" icon={<Icons.Weaknesses />} theme={theme}><ul>{insights.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul></InsightCard>
        </div>
      );
      case 'careers': return <InsightCard title="Career Paths" icon={<Icons.Careers />} theme={theme}><ul>{insights.careerPaths.map((c, i) => <li key={i}>{c}</li>)}</ul></InsightCard>;
      case 'relationships': return <InsightCard title="Relationships" icon={<Icons.Relationships />} theme={theme}><p className="leading-relaxed">{insights.relationships}</p></InsightCard>;
      case 'growth': return <InsightCard title="Personal Growth" icon={<Icons.Growth />} theme={theme}><ul>{insights.personalGrowth.map((g, i) => <li key={i}>{g}</li>)}</ul></InsightCard>;
      case 'vibe': return <InsightCard title="Vibe Check" icon={<Icons.Vibe />} theme={theme}>
        <p><strong>Color:</strong> <span className={theme.accentText}>{insights.vibe.color}</span></p>
        <p><strong>Aesthetic:</strong> {insights.vibe.aesthetic}</p>
        <p>{insights.vibe.description}</p>
      </InsightCard>;
      case 'friends': return (
        <div className="grid md:grid-cols-2 gap-4">
          <InsightCard title="Famous Figures" icon={<Icons.Friends />} theme={theme}><ul>{insights.famousFigures.map((s, i) => <li key={i}>{s}</li>)}</ul></InsightCard>
          <InsightCard title="Fictional Characters" icon={<Icons.Fictional />} theme={theme}><ul>{insights.fictionalCharacters.map((w, i) => <li key={i}>{w}</li>)}</ul></InsightCard>
        </div>
      );
      case 'recs': return <InsightCard title="Recommendation Hub" icon={<Icons.Recs />} theme={theme}>
        <div><strong>Hobbies:</strong><p className="text-zinc-400">{insights.recommendations.hobbies.join(', ')}</p></div>
        <div><strong>Books:</strong><p className="text-zinc-400">{insights.recommendations.books.join(', ')}</p></div>
        <div><strong>Movies:</strong><p className="text-zinc-400">{insights.recommendations.movies.join(', ')}</p></div>
        <div><strong>Music:</strong><p className="text-zinc-400">{insights.recommendations.music.join(', ')}</p></div>
      </InsightCard>;
      default: return null;
    }
  };
  
  const isDefaultTheme = theme.accentText.includes('zinc');
  const restartButtonTextColor = isDefaultTheme ? 'text-zinc-900' : 'text-white';


  return (
    <div className="animate-fade-in space-y-6">
      <div className={`text-center p-8 bg-zinc-900/50 rounded-2xl shadow-2xl border ${theme.baseBorder} backdrop-blur-sm`}>
        <h3 className={`text-2xl font-medium ${theme.baseText}`}>Your Personality Type Is</h3>
        <h1 className={`text-6xl md:text-8xl my-1 font-extrabold ${theme.accentText}`}>{personalityType}</h1>
        <h2 className={`text-3xl md:text-4xl ${theme.headingText} font-semibold`}>{insights.title}</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2 p-2 bg-zinc-800/60 rounded-xl border border-zinc-700/50 backdrop-blur-sm">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} theme={theme}><Icons.Overview /><span>Overview</span></TabButton>
        <TabButton active={activeTab === 'strengths'} onClick={() => setActiveTab('strengths')} theme={theme}><Icons.Strengths /><span>+/-</span></TabButton>
        <TabButton active={activeTab === 'vibe'} onClick={() => setActiveTab('vibe')} theme={theme}><Icons.Vibe /><span>Vibe</span></TabButton>
        <TabButton active={activeTab === 'friends'} onClick={() => setActiveTab('friends')} theme={theme}><Icons.Friends /><span>Allies</span></TabButton>
        <TabButton active={activeTab === 'recs'} onClick={() => setActiveTab('recs')} theme={theme}><Icons.Recs /><span>Recs</span></TabButton>
        <TabButton active={activeTab === 'careers'} onClick={() => setActiveTab('careers')} theme={theme}><Icons.Careers /><span>Careers</span></TabButton>
        <TabButton active={activeTab === 'relationships'} onClick={() => setActiveTab('relationships')} theme={theme}><Icons.Relationships /><span>Relations</span></TabButton>
        <TabButton active={activeTab === 'growth'} onClick={() => setActiveTab('growth')} theme={theme}><Icons.Growth /><span>Growth</span></TabButton>
      </div>

      <div className="transition-opacity duration-300 ease-in-out">
        {renderContent()}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className={`px-8 py-3 font-bold rounded-lg border-2 border-transparent transition-all duration-300 transform hover:scale-105 shadow-lg ${theme.accentBg} ${theme.accentBgHover} ${restartButtonTextColor}`}
        >
          Take Test Again
        </button>
      </div>
    </div>
  );
};
