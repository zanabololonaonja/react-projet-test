import React, { useState, useEffect } from 'react';

export const EmployeeForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        position: initialData.position || '',
        department: initialData.department || '',
      });
    } else {
      setFormData({ firstName: '', lastName: '', email: '', position: '', department: '' });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h3 className="text-lg font-bold text-white">{initialData ? 'Edit Employee' : 'Add New Employee'}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">First Name</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Last Name</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Position</label>
          <input
            type="text"
            required
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Department</label>
          <input
            type="text"
            required
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
          {initialData ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;