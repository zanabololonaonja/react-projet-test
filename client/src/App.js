import React, { useState } from 'react';
import { useEmployees } from './features/employees/hooks/useEmployees';
import { EmployeeList } from './features/employees/components/EmployeeList';
import { EmployeeForm } from './features/employees/components/EmployeeForm';
import { LandingPage } from './features/employees/components/LandingPage'; 
import { Sidebar } from './features/employees/components/Sidebar'; // ◄--- Correction de la faute de frappe (components)

const App = () => {
  const { employees = [], loading, error, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  // 🧭 ÉTAT DE NAVIGATION PRINCIPALE : true = Landing Page, false = Dashboard
  const [showLanding, setShowLanding] = useState(true);

  // 📂 ÉTAT DES ONGLETS DU DASHBOARD : 'form' (Formulaire centré) ou 'list' (Liste des membres)
  const [activeTab, setActiveTab] = useState('form');

  const handleFormSubmit = async (data) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, data);
    } else {
      await addEmployee(data);
    }
    setEditingEmployee(null);
    setActiveTab('list'); // Redirige automatiquement vers la liste après soumission
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setActiveTab('form'); // Bascule sur l'onglet formulaire en mode édition
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setActiveTab('list'); // Retourne à la liste si on annule l'édition
  };

  // 1. CONDITION RENDER : Si showLanding est vrai, on affiche uniquement la Landing Page
  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  // 2. SINON : On affiche l'interface complète (Sidebar à gauche + Contenu centré à droite)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex w-full relative">
      
      {/* 1. LA SIDEBAR (Fixée à gauche) */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
        onBackToHome={() => setShowLanding(true)}
      />

      {/* 2. ESPACE DE CONTENU PRINCIPAL (Décalé de pl-64 pour la sidebar et centré) */}
      <main className="flex-1 pl-64 min-h-screen flex flex-col justify-center items-center w-full">
        <div className="w-full max-w-4xl p-8">
          
          {error && (
            <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg max-w-xl mx-auto">
              {error}
            </div>
          )}

          {/* VUE OBOIDÉ 1 : FORMULAIRE TOTALEMENT CENTRÉ */}
          {activeTab === 'form' && (
            <div className="w-full flex flex-col items-center justify-center space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                  {editingEmployee ? "Modify Member" : "Register Member"}
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  {editingEmployee ? "Update this profile's workspace settings." : "Fill in the information to onboard a new teammate."}
                </p>
              </div>
              <div className="w-full max-w-xl bg-slate-900/50 p-6 border border-slate-800 rounded-xl backdrop-blur-sm">
                <EmployeeForm 
                  onSubmit={handleFormSubmit} 
                  initialData={editingEmployee} 
                  onCancel={editingEmployee ? handleCancel : undefined} 
                />
              </div>
            </div>
          )}

          {/* VUE ONGLET 2 : LISTE DES EMPLOYÉS */}
          {activeTab === 'list' && (
            <div className="space-y-6 w-full">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Workspace Team</h1>
                <p className="text-slate-400 text-sm mt-1">Review and manage active workspace accounts.</p>
              </div>

              {loading ? (
                <div className="text-center text-slate-400 py-12 bg-slate-900/20 border border-slate-800/50 rounded-xl">
                  <div className="animate-pulse">Loading workspace data...</div>
                </div>
              ) : (
                <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-4">
                  <EmployeeList 
                    employees={employees} 
                    onEdit={handleEditClick} 
                    onDelete={deleteEmployee} 
                  />
                </div>
              )}
            </div>
          )}

        </div>
      </main>

    </div>
  );
};

export default App;