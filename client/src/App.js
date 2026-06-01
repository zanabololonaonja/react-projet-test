import React, { useState } from 'react';
import { useEmployees } from './features/employees/hooks/useEmployees';
import { EmployeeList } from './features/employees/components/EmployeeList';
import { EmployeeForm } from './features/employees/components/EmployeeForm';

const App = () => {
  const { employees, loading, error, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSubmit = async (data) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, data);
    } else {
      await addEmployee(data);
    }
    setIsFormOpen(false);
    setEditingEmployee(null);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
            <p className="text-slate-400 text-sm">Manage your workspace team members efficiently.</p>
          </div>
          {!isFormOpen && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow transition"
            >
              Add Employee
            </button>
          )}
        </div>

        {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">{error}</div>}

        {isFormOpen && (
          <div className="max-w-xl">
            <EmployeeForm onSubmit={handleFormSubmit} initialData={editingEmployee} onCancel={handleCancel} />
          </div>
        )}

        {loading ? (
          <div className="text-center text-slate-400 py-8">Loading workspace data...</div>
        ) : (
          <EmployeeList employees={employees} onEdit={handleEditClick} onDelete={deleteEmployee} />
        )}
      </div>
    </div>
  );
};

export default App;