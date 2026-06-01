import React from 'react';

export const EmployeeList = ({ employees = [], onDelete, onEdit }) => {
  if (!employees || employees.length === 0) {
    return <div className="text-gray-400 text-center py-8">No employees found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
      <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
        <thead className="bg-slate-950 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Position</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {employees.map((employee) => {
            // Sécurité : Gère à la fois le camelCase du front et le snake_case potentiel du backend Postgres
            const firstName = employee.firstName || employee.first_name || '';
            const lastName = employee.lastName || employee.last_name || '';

            return (
              <tr key={employee.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">
                  {firstName} {lastName}
                </td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.position}</td>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(employee)}
                    className="px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded hover:bg-blue-500/20 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="px-3 py-1 text-xs font-semibold text-red-400 bg-red-500/10 rounded hover:bg-red-500/20 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;