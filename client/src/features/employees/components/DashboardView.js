import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeList } from './EmployeeList';

export const DashboardView = ({ 
  employees, loading, error, addEmployee, updateEmployee, deleteEmployee, onBackToHome 
}) => {
  const [activeTab, setActiveTab] = useState('form');
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleFormSubmit = async (data) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, data);
    } else {
      await addEmployee(data);
    }
    setEditingEmployee(null);
    setActiveTab('list');
  };

  const handleEditClick = (employee) => {
    // Normalize possible snake_case or different backend keys to the form's expected shape
    const normalized = {
      id: employee.id || employee._id,
      firstName: employee.firstName || employee.first_name || '',
      lastName: employee.lastName || employee.last_name || '',
      email: employee.email || employee.email_address || '',
      position: employee.position || employee.job || '',
      department: employee.department || employee.dept || '',
    };

    setEditingEmployee(normalized);
    setActiveTab('form');
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setActiveTab('list');
  };

  // Calcul des statistiques pour le dashboard
  const totalMembers = employees ? employees.length : 0;
  const departmentsArray = (employees || []).map(e => e.department || e.dept || 'Unknown');
  const positionsArray = (employees || []).map(e => e.position || e.job || 'Unknown');
  const departmentsCount = Array.from(new Set(departmentsArray)).length;
  const positionsCount = Array.from(new Set(positionsArray)).length;

  const deptFreq = departmentsArray.reduce((acc, d) => {
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});
  const topDepartment = Object.keys(deptFreq).length ? Object.entries(deptFreq).sort((a, b) => b[1] - a[1])[0][0] : 'N/A';

  // Nouvelles recrues cette semaine (si champ date présent: createdAt, created_at, hireDate)
  const now = Date.now();
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  const newThisWeek = (employees || []).reduce((count, e) => {
    const dateStr = e.createdAt || e.created_at || e.hireDate || e.hired_at || e.hire_date;
    if (!dateStr) return count;
    const ts = Date.parse(dateStr);
    if (Number.isNaN(ts)) return count;
    return ts >= (now - oneWeekMs) ? count + 1 : count;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex w-full relative">
      
      {/* CONTENU PRINCIPAL (Centré au milieu, avec espace à droite pour la Sidebar) */}
      <main className="flex-1 pr-64 min-h-screen flex flex-col justify-center items-center w-full">
        <div className="w-full max-w-3xl p-8">
          
          {error && (
            <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg max-w-xl mx-auto">
              {error}
            </div>
          )}

          {/* VUE DASHBOARD : cartes résumé + table des derniers membres */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 w-full">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
                <p className="text-slate-400 text-sm mt-1">Vue d'ensemble rapide de l'équipe et des métriques.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg">
                  <p className="text-sm text-slate-400">Total Members</p>
                  <p className="text-2xl font-semibold mt-2">{totalMembers}</p>
                </div>
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg">
                  <p className="text-sm text-slate-400">New This Week</p>
                  <p className="text-2xl font-semibold mt-2">{newThisWeek}</p>
                </div>
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg">
                  <p className="text-sm text-slate-400">Departments</p>
                  <p className="text-2xl font-semibold mt-2">{departmentsCount}</p>
                </div>
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg">
                  <p className="text-sm text-slate-400">Top Department</p>
                  <p className="text-2xl font-semibold mt-2">{topDepartment}</p>
                </div>
              </div>

              <div className="mt-4 bg-slate-900/30 border border-slate-800/80 rounded-xl p-4">
                <h2 className="text-lg font-medium mb-3">Derniers membres</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-300">
                    <thead className="text-xs text-slate-400 uppercase">
                      <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Position</th>
                        <th className="px-4 py-2">Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(employees || []).slice(-5).reverse().map(emp => {
                        const firstName = emp.firstName || emp.first_name || '';
                        const lastName = emp.lastName || emp.last_name || '';
                        return (
                          <tr key={emp.id || emp._id} className="border-t border-slate-800/60">
                            <td className="px-4 py-2">{firstName} {lastName}</td>
                            <td className="px-4 py-2">{emp.email}</td>
                            <td className="px-4 py-2">{emp.position || emp.job}</td>
                            <td className="px-4 py-2">{emp.department || emp.dept}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VUE FORMULAIRE : TOTALEMENT CENTRÉ */}
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

          {/* VUE LISTE : PREND TOUTE LA LARGEUR RESTANTE */}
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
                <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-4 direct-list">
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

      {/* LA SIDEBAR FIXÉE À DROITE */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};