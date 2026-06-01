import React from 'react';

export const Sidebar = ({ activeTab, setActiveTab, editingEmployee, setEditingEmployee, onBackToHome }) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 h-full z-20">
      {/* En-tête */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Workspace Hub
        </h2>
        <p className="text-xs text-slate-500 mt-1">v1.0.0</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
            activeTab === 'dashboard'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <span>📊</span>
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => { setActiveTab('form'); setEditingEmployee(null); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
            activeTab === 'form' 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <span>📝</span>
          <span>{editingEmployee ? "Edit Employee" : "Add Employee"}</span>
        </button>

        <button
          onClick={() => setActiveTab('list')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
            activeTab === 'list' 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <span>👥</span>
          <span>Employee List</span>
        </button>
      </nav>

      {/* Pied de page */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={onBackToHome}
          className="w-full text-left text-xs text-slate-500 hover:text-slate-300 transition flex items-center space-x-2"
        >
          <span>⬅️</span>
          <span>Back to Home</span>
        </button>
      </div>
    </aside>
  );
};