import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { Loader } from './components/Loader';
import { QUESTIONS } from './constants';
import { fetchPersonalityInsights } from './services/geminiService';
import type { PersonalityInsights, GameState, Question } from './types';
import { Dichotomy } from './types';
import { THEMES, Theme } from './themes';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [personalityType, setPersonalityType] = useState<string | null>(null);
  const [insights, setInsights] = useState<PersonalityInsights | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(THEMES.default);

  const calculatePersonality = useCallback((userAnswers: number[], currentQuestions: Question[]) => {
    const scores = {
      [Dichotomy.IE]: 0,
      [Dichotomy.SN]: 0,
      [Dichotomy.TF]: 0,
      [Dichotomy.JP]: 0,
    };

    userAnswers.forEach((answer, index) => {
      const question = currentQuestions[index];
      scores[question.dichotomy] += answer * question.direction;
    });

    const result = [
      scores[Dichotomy.IE] >= 0 ? 'E' : 'I',
      scores[Dichotomy.SN] >= 0 ? 'N' : 'S',
      scores[Dichotomy.TF] >= 0 ? 'F' : 'T',
      scores[Dichotomy.JP] >= 0 ? 'P' : 'J',
    ].join('');
    
    return result;
  }, []);

  const handleQuizStart = (questionCount: number) => {
    // Shuffle all questions and take the requested number
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, questionCount));
    setGameState('quiz');
  };

  const handleQuizComplete = useCallback(async (finalAnswers: number[]) => {
    setGameState('loading');
    setError(null);

    try {
      const pType = calculatePersonality(finalAnswers, questions);
      setPersonalityType(pType);

      const personalityTheme = THEMES[pType as keyof typeof THEMES] || THEMES.default;
      setTheme(personalityTheme);
      
      const fetchedInsights = await fetchPersonalityInsights(pType);
      setInsights(fetchedInsights);
      setGameState('results');
    } catch (err) {
      console.error(err);
      setError('Failed to generate insights. Please try again.');
      setTheme(THEMES.default);
      setGameState('welcome');
    }
  }, [calculatePersonality, questions]);

  const handleRestart = () => {
    setGameState('welcome');
    setPersonalityType(null);
    setInsights(null);
    setError(null);
    setTheme(THEMES.default);
    setQuestions([]);
  };
  
  const renderContent = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleQuizStart} />;
      case 'quiz':
        return <QuizScreen questions={questions} onComplete={handleQuizComplete} theme={theme} />;
      case 'loading':
        return <Loader />;
      case 'results':
        return insights && personalityType ? (
          <ResultsScreen 
            insights={insights}
            personalityType={personalityType} 
            onRestart={handleRestart}
            theme={theme}
          />
        ) : (
          <div className="text-center text-red-400">
            <p>Something went wrong. Please restart the test.</p>
            <button onClick={handleRestart} className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">Restart</button>
          </div>
        );
      default:
        return <WelcomeScreen onStart={handleQuizStart} />;
    }
  };
  
  const backgroundClass = theme.bg.includes('from-') ? `bg-gradient-to-br ${theme.bg}` : theme.bg;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${backgroundClass}`}>
       <main className="w-full max-w-4xl mx-auto z-10">
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-4 text-center text-lg animate-pulse">{error}</div>}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
