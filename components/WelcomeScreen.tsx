import React, { useState } from 'react';
import { Logo } from './Logo';

interface WelcomeScreenProps {
  onStart: (questionCount: number) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [questionCount, setQuestionCount] = useState(25);

  return (
    <div className="text-center animate-fade-in space-y-8 p-8 bg-zinc-900/50 rounded-2xl shadow-2xl border border-zinc-700/50 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="flex items-center justify-center gap-4">
          <Logo />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Clarity
          </h1>
        </div>
        <p className="text-lg text-zinc-400">
          AI-Powered Personality Insights
        </p>
      </div>

      <p className="max-w-2xl mx-auto text-lg text-zinc-400 border-t border-zinc-700/50 pt-8">
        Ever wonder what makes you, you? This isn't your average personality test. We're diving deep to find the unique frequency of your personality. Answer a few questions and get a detailed, AI-powered analysis of your type.
      </p>
      
      <div className="flex flex-col items-center space-y-4">
        <label htmlFor="question-count" className="text-zinc-500 font-medium">How deep do you want to go?</label>
        <div className="flex space-x-2 p-1.5 bg-zinc-800/60 rounded-full">
          {[10, 25, 50].map(count => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                questionCount === count ? 'bg-zinc-200 text-zinc-900 shadow-md' : 'text-zinc-300 hover:bg-zinc-700/50'
              }`}
            >
              {count} Questions
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => onStart(questionCount)}
        className="px-10 py-4 text-lg font-bold text-zinc-900 bg-zinc-200 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:bg-zinc-300"
      >
        Start the Journey
      </button>
    </div>
  );
};