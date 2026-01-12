
import React, { useState } from 'react';
import { SQA_PHASES } from '../constants';

const ProjectDocs: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">SQA Experiment 1</h2>
        <p className="text-slate-500">Software Development Life Cycle (SDLC) Documentation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {SQA_PHASES.map((phase, index) => (
            <button
              key={phase.title}
              onClick={() => setActivePhase(index)}
              className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                activePhase === index 
                ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">{phase.icon}</span>
              <span className="text-sm font-semibold">{phase.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{SQA_PHASES[activePhase].icon}</span>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{SQA_PHASES[activePhase].title}</h3>
              <p className="text-slate-500">{SQA_PHASES[activePhase].description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-700 border-b pb-2">Implementation Details:</h4>
            <ul className="space-y-3">
              {SQA_PHASES[activePhase].details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">QA Verification</p>
            <p className="text-sm text-slate-600 italic">"Verified compliance with ISO/IEC 25010 standards for software product quality."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDocs;
