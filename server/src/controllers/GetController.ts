import prismaClient from '../database/prismaClient';

import {Request, Response} from 'express'

export class GetEmployees {
  async handle(req: Request, res: Response){
   const employees = await prismaClient.employee.findMany({
    include:{
      role:true
    }
   })

    const valuesToReturn = (employees.map((res) => { 
     return {
      id: res.id,
      name: res.name,
      cpf: res.cpf,
      email: res.email,
      status: res.status,
      role: res.role,
      roleId: res.roleId,
     }
    }))
   
   return res.json(valuesToReturn)
  }
}

export class GetRoles {
  async handle(req: Request, res: Response){
   const roles = await prismaClient.role.findMany()

   return res.json({values:roles})
  }
}