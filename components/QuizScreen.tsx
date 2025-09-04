import React, { useState } from 'react';
import type { Question } from '../types';
import type { Theme } from '../themes';


interface QuizScreenProps {
  questions: Question[];
  onComplete: (answers: number[]) => void;
  theme: Theme;
}

const ProgressBar: React.FC<{ current: number; total: number; theme: Theme }> = ({ current, total, theme }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-zinc-700/50 rounded-full h-2.5 mb-8">
      <div
        className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${theme.accentText.includes('zinc') ? 'bg-zinc-300' : theme.accentBg }`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const AnswerOption: React.FC<{ label: string; value: number; onSelect: (value: number) => void; selectedValue: number | null; theme: Theme }> = ({ label, value, onSelect, selectedValue, theme }) => {
    const isSelected = selectedValue === value;
    const baseClasses = "flex-1 text-center py-3 px-2 rounded-full cursor-pointer transition-all duration-200 transform font-semibold";
    
    // Use theme colors, but handle text color for default theme's light background
    const selectedTextColor = theme.accentText.includes('zinc') ? 'text-zinc-900' : 'text-white';
    const selectedClasses = `${theme.accentBg} ${selectedTextColor} scale-110 shadow-lg`;
    const unselectedClasses = "bg-zinc-700/70 hover:bg-zinc-600/70 text-white";

    // Dynamic sizing based on label length to avoid awkward wrapping
    const textSize = label.length > 7 ? 'text-xs' : 'text-sm';

    return (
        <button onClick={() => onSelect(value)} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
            <span className={`${textSize} sm:text-sm`}>{label}</span>
        </button>
    );
};

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onComplete, theme }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleAnswer = (answerValue: number) => {
    setSelectedValue(answerValue);
    setTimeout(() => {
        const newAnswers = [...answers, answerValue];
        setAnswers(newAnswers);
        
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedValue(null);
        } else {
            onComplete(newAnswers);
        }
    }, 300);
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 bg-zinc-900/50 rounded-2xl shadow-2xl border border-zinc-700/50 backdrop-blur-sm">
      <ProgressBar current={currentQuestionIndex} total={questions.length} theme={theme} />
      <div className="text-center">
        <p className="text-zinc-400 mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h2 className="text-xl md:text-2xl text-white font-medium mb-10 min-h-[6rem] flex items-center justify-center p-4">
          {currentQuestion.text}
        </h2>
        <div className="flex justify-between items-center space-x-1 md:space-x-2">
            <AnswerOption label="Strongly Disagree" value={-3} onSelect={handleAnswer} selectedValue={selectedValue} theme={theme} />
            <AnswerOption label="Disagree" value={-2} onSelect={handleAnswer} selectedValue={selectedValue} theme={theme} />
            <AnswerOption label="Slightly Disagree" value={-1} onSelect={handleAnswer} selectedValue={selectedValue} theme={theme} />
            <AnswerOption label="Neutral" value={0} onSelect={handleAnswer} selectedValue={selectedValue} theme={theme} />
            <AnswerOption label="Slightly Agree" value={1} onSelect={handleAnswer} selectedValue={selectedValue} theme={theme} />
            <AnswerOption label="Agree" value={2} onSelect={handleAnswer} selectedValue={selectedValue} theme={theme} />
            <AnswerOption label="Strongly Agree" value={3} onSelect={handleAnswer} selectedValue={selectedValue} theme={theme} />
        </div>
      </div>
    </div>
  );
};
