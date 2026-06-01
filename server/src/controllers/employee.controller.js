import { EmployeeModel } from '../models/employee.model.js';

export const EmployeeController = {
  getAll: async (req, res) => {
    try {
      const employees = await EmployeeModel.findAll();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const employee = await EmployeeModel.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const newEmployee = await EmployeeModel.create(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedEmployee = await EmployeeModel.update(id, req.body);
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found to update' });
      }
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await EmployeeModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Employee not found to delete' });
      }
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
  }
};