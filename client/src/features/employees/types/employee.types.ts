export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  createdAt: string;
}

export type CreateEmployeeInput = Omit<Employee, 'id' | 'createdAt'>;
export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;