import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-zinc-900/50 rounded-2xl shadow-2xl border border-zinc-700/50 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-t-4 border-zinc-600 border-t-white rounded-full animate-spin"></div>
      <h2 className="text-lg sm:text-xl font-semibold text-white">Generating Your Vibe...</h2>
      <p className="text-zinc-400 text-center max-w-md text-sm sm:text-base">
        Our AI is consulting the digital cosmos, analyzing your answers to craft a unique personality profile just for you. Hang tight!
      </p>
    </div>
  );
};
