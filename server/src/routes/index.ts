import { Router } from "express";
const routes = Router();

import {CreateEmployee, CreateRole} from "../controllers/CreeateController";
import {GetEmployees, GetRoles } from "../controllers/GetController";
import { UpdatePass,UpdateEmployee,UpdateStatusEmployee, } from '../controllers/UpdateController'

const getEmployees = new GetEmployees();
const getRoles = new GetRoles();

const createEmployee = new CreateEmployee();
const createRole = new CreateRole();

const updatePass = new UpdatePass();
const updateEmployee = new UpdateEmployee();
const updateStatusEmployee = new UpdateStatusEmployee();

routes.get('/search', getEmployees.handle);
routes.get('/search-roles', getRoles.handle);
routes.post('/register',createEmployee.handle)
routes.post('/register-role',createRole.handle)
routes.post('/update-employee',updateEmployee.handle)
routes.post('/update-status',updateStatusEmployee.handle)
routes.post('/update-employee-pass',updatePass.handle)



export default routes
