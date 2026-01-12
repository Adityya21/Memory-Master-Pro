import React from 'react';
import MemoryGame from './components/MemoryGame';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Aesthetic Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* New Memory Game Logo (Brain/Neural paths) */}
            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 transform rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A5 5 0 0 1 12 4a5 5 0 0 1 2.5-2 5 5 0 0 1 5 5 5 5 0 0 1-2.5 4.33A5 5 0 0 1 12 16a5 5 0 0 1-4.5-2.67A5 5 0 0 1 5 9a5 5 0 0 1 4.5-7z"></path>
                <path d="M12 12v4"></path>
                <path d="M12 20v2"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-tight">MindMatch Pro</h1>
              <p className="text-[10px] text-indigo-500 font-bold tracking-widest uppercase">Focus & Skill</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50/50">
        <MemoryGame />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm gap-4">
          <p>© 2024 MindMatch Pro - Cognitive Training Suite</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              System Active
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Optimized Performance
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;