// src/features/employees/components/LandingPage.jsx
import React from 'react';

export const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Effet d'arrière-plan lumineux discret (Glassmorphism / Glow) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-2xl text-center space-y-6 z-10">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Welcome to Workspace Hub
        </h1>
        
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Manage your team members, track workspace data, and optimize your organization workflow seamlessly.
        </p>

        <div className="pt-4">
          <button
            onClick={onGetStarted}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};