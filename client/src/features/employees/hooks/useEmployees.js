import { useState, useEffect } from 'react';
import { employeeApi } from './employeeApi.ts';
export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await employeeApi.getAll();
      
      // Optionnel : Normalise les clés si Postgres renvoie du snake_case
      const formattedData = data.map(emp => ({
        id: emp.id,
        firstName: emp.firstName || emp.first_name || '',
        lastName: emp.lastName || emp.last_name || '',
        email: emp.email,
        position: emp.position,
        department: emp.department,
        createdAt: emp.createdAt || emp.created_at
      }));

      setEmployees(formattedData);
      setError(null);
    } catch (err) {
      setError('Error loading employees');
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (input) => {
    try {
      const newEmployee = await employeeApi.create(input);
      setEmployees((prev) => [...prev, newEmployee]);
    } catch (err) {
      setError('Error creating employee');
    }
  };

  const updateEmployee = async (id, input) => {
    try {
      const updated = await employeeApi.update(id, input);
      setEmployees((prev) => prev.map((emp) => (emp.id === id ? updated : emp)));
    } catch (err) {
      setError('Error updating employee');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await employeeApi.delete(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      setError('Error deleting employee');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, addEmployee, updateEmployee, deleteEmployee, refresh: fetchEmployees };
};

export default useEmployees;