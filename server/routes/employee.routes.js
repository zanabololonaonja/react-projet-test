import { Router } from 'express';
import { EmployeeController } from '../src/controllers/employee.controller.js';

const router = Router();

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.post('/', EmployeeController.create);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

export default router;