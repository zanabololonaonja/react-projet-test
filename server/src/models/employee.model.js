import { pool } from '../config/database.js';

export const EmployeeModel = {
  findAll: async () => {
    const result = await pool.query('SELECT * FROM employees ORDER BY id ASC');
    return result.rows;
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  create: async (data) => {
    const { firstName, lastName, email, position, department } = data;
    const query = `
      INSERT INTO employees (first_name, last_name, email, position, department)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [firstName, lastName, email, position, department]);
    return result.rows[0];
  },

  update: async (id, data) => {
    const current = await EmployeeModel.findById(id);
    if (!current) return null;

    const firstName = data.firstName ?? current.first_name;
    const lastName = data.lastName ?? current.last_name;
    const email = data.email ?? current.email;
    const position = data.position ?? current.position;
    const department = data.department ?? current.department;

    const query = `
      UPDATE employees 
      SET first_name = $1, last_name = $2, email = $3, position = $4, department = $5
      WHERE id = $6
      RETURNING *;
    `;
    const result = await pool.query(query, [firstName, lastName, email, position, department, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
};