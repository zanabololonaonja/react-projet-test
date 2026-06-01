const BASE_URL = 'http://localhost:5000/api/employees'; 
// Note : J'ai mis l'URL de votre backend Express (port 5000) pour que ça fonctionne directement !

export const employeeApi = {
  getAll: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
  },

  getById: async (id: any) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Employee not found');
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create employee');
    return response.json();
  },

  update: async (id: any, data: any) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update employee');
    return response.json();
  },

  delete: async (id: any) => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete employee');
  },
};
