import prismaClient from "../database/prismaClient";
import {Request, Response} from 'express'
import md5 from 'md5'

export class UpdateEmployee {
  async handle(req: Request, res: Response){

    const {id,name,cpf,email,roleId} = req.body.data

    
    console.log(id,name,cpf,email,roleId)
    await prismaClient.employee.update({
      where: { id:id },
      data: {
        name:name,
        cpf:cpf,
        email:email,
        roleId:roleId
      },
    })
    const recoveryDatasEmployees = await prismaClient.employee.findMany({
      include:{
        role:true
      }
    })
   
    const valuesToReturn = (recoveryDatasEmployees.map((res) => { 
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

    return res.json({values:valuesToReturn}, )
  }
}

export class UpdatePass {
  async handle(req: Request, res: Response){

    const {id, old_pass, confirmation_pass} = req.body.data

    const oldPassMd5 = md5(old_pass)
    const newPassMd5 = md5(confirmation_pass)

    const comparePassInputed = await prismaClient.employee.findMany({
      where:{
        id:Number(id),
        pass: oldPassMd5
      }
    })
    if(comparePassInputed.length > 0){
      await prismaClient.employee.update({
        where: { id:Number(id) },
        data: {
          pass:String(newPassMd5)
        },
     })
      return res.status(201).json("Atualizado com sucesso")

    }else{
      return res.status(201).json("Senha Antiga Incorreta")
    }
  }
}

export class UpdateStatusEmployee {
  async handle(req: Request, res: Response){

    const {email, status} = req.body.data
    
    const updataEmployeeStatus = await prismaClient.employee.update({
      where: { email:email },
      data: {
        status: !status
      },
    })

    return res.status(201).json(updataEmployeeStatus)
  }
}
