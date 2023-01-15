import prismaClient from '../database/prismaClient';

import {Request, Response} from 'express'


export class CreateEmployee{
    async handle(req: Request, res: Response){
        
        const {name, cpf, email, confirmation_pass, hiring_date, enrollment, roleId} = req.body.data
        
        const verificationEmployee = await prismaClient.employee.findMany({
            where:{
                cpf:cpf,
                email:email,
                enrollment:enrollment
            }
        })

        if(verificationEmployee.length < 1){
            await prismaClient.employee.create({
                data: {
                    name:name,
                    cpf: cpf,
                    email: email,
                    status: true,
                    pass: confirmation_pass,
                    enrollment:enrollment,
                    roleId:Number(roleId),  
                    hiring_date: hiring_date
                },
            })
    
             return res.status(201).json("Cadastro feito com sucesso")
        }else{
            return res.status(201).json("Erro no cadastro verifique, se ja possui cadastro.")
        }
       
    }
 }


 export class CreateRole{
    async handle(req: Request, res: Response){
        
        const {role} = req.body
        const verificationRoles = await prismaClient.role.findMany({
            where:{
                name:role
            }
        })

        console.log(verificationRoles)

        if(verificationRoles.length < 1){
            const createRole = await prismaClient.role.create({
                data: {
                    name:role
                },
            })
            return res.status(201).json("Cadastrado com sucesso")
        }else{
            return res.status(201).json("Cargo já cadastrado!")
        }
    
    }
 }

 