import {Modal, Box, Typography} from "@mui/material";
import useControlModal from "../../hooks/useControlModal";
import { api } from "../../service/api";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { FormInput } from "../FormInput";
import { FormSelectRoles } from "../FormSelectRoles";
import useGetDatasEmployee from "../../hooks/useGetDatasEmployee";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ValidationFormSchemaType = z.infer<typeof validationFormSchema>
const validationFormSchema = z.object({
  id: z.number(),
  name: z.string().min(3, {message: 'O nome precisa ter no minimo 3 letras'}),
  cpf: z.string(),
  enrollment: z.string(),
  email: z.string().email({ message: 'Deve ser um email' }),
  role: z.string(),
  roleId: z.number(),
  old_pass: z.string(),
  pass: z.string().min(8, {message: 'Senha precis ter no minimo 8dig'}),
  confirmation_pass: z.string()

}).refine((data) => data.pass === data.confirmation_pass, {
message: "As senha não são iguais, verifique!"  
});



export function ModalControl(){

  //Hooks
  const valueModal = useControlModal((state) => state.openModal)
  const desactiveModal = useControlModal((state) => state.activeModal)
  const typeModal = useControlModal((state) => state.typeModal)

  const setDatas = useGetDatasEmployee((state) => state.setDatas )
  const lineClickedTable = useGetDatasEmployee((state) => state.lineTableClicked )

  // React hook form
  const { register, handleSubmit,  formState: {errors}, setValue} = useForm<ValidationFormSchemaType>({
    resolver:zodResolver(validationFormSchema)
     }
    )

   //Code to update employee by modal
  
   useEffect(() => {
      if (lineClickedTable) {
        setValue("id",lineClickedTable.id);
        setValue("name",lineClickedTable.name);
        setValue("cpf",lineClickedTable.cpf);
        setValue("email",lineClickedTable.email);
        setValue("roleId", lineClickedTable.roleId);
      }
    }, [lineClickedTable]);

   
  //Update Employee
 
  async function handleSubmitUpadateEmployee(data:any){
  console.log(data)
    await api.post("/update-employee", {data})
    .then(response => {
        setDatas(response.data.values)
        alert("Atualizado com sucesso")
    })
    
  }
  //Update Pass
  async function handleSubmitUpadateEmployeePass(data:any){
    await api.post("/update-employee-pass", {data})
    .then(response => alert(response.data)
    
    )
  }

  //Datas Create Role
  async function handleDataSubmitCreateRole(data:any){
    
    api.post("/register-role", data)
    .then(response =>alert(response.data))
  }

  return(
    <Modal
      open={valueModal}
      onClose={desactiveModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems:"center"}}
    >    
      
      { typeModal === "createEmployee" ?
        (
          <div className="flex bg-white border  opacity-90 w-[50rem] h-[25rem] rounded-3xl ">
            
            <div className="flex items-center justify-center w-full ">
              <div className="flex flex-col items-center justify-center p-5 h-full w-[40rem]  ">
                    <h1 className="text-center text-lg">Atualizar Funcionário</h1>
                    <form className="flex flex-wrap gap-5 items-center justify-between h-full p-5 border border-r-gray-300" onSubmit={handleSubmit(handleSubmitUpadateEmployee)} >
                         
                      <FormInput label="Nome" type="text" name="name" register={register} error={errors.name} />
                      <FormInput label="CPF" type="text" name="cpf" register={register} error={errors.cpf} />
                      <FormInput label="Email" type="email" name="email" register={register} error={errors.email} />
                      <FormSelectRoles name="roleId" register={register}/>
                      <FormInput type="hidden" name="id" register={register} />

                      <button type="submit" className="block h-10  w-full mt-1 bg-pink-900 text-white rounded hover:brightness-75" > Atualizar </button>
                    </form>
                </div>
            
            </div>
               
          </div>
        )
        : typeModal === "createRole" ?
        (
          <div className="bg-white opacity-90 w-[30rem] h-[10rem] rounded-3xl ">
            <form className="flex items-center justify-center h-full " onSubmit={handleSubmit(handleDataSubmitCreateRole)}>
                <label htmlFor="roleName" className="flex flex-col">
                  Nome: 
                  <input type="text" {...register("role")} className="border border-sky-900"/>
                </label>
                <button type="submit">Salvar</button>
            </form>
          </div>
        )

        :(
          <div className="flex bg-white border  opacity-90 w-[40rem] h-[24rem] rounded-3xl ">
            <div className="p-6 h-full w-full flex flex-col items-center  ">
                  <h1 className="text-center text-lg">Atualizar Senha</h1>
                  <form className="flex flex-col h-full gap-3 mt-6 " onSubmit={handleSubmit(handleSubmitUpadateEmployeePass)} >
                    <FormInput label="Senha antiga" type="password" name="old_pass" register={register} error={errors.pass}/>
                    <FormInput label="Senha" type="password" name="pass" register={register} error={errors.pass}/>
                    <FormInput label="Confirmação de Senha"  type="password" name="confirmation_pass" register={register} error={errors.confirmation_pass}/>
                    <button type="submit" className="block h-10 w-[95%] mt-5 bg-pink-900 text-white rounded" > Atualizar </button>
                  </form>
                </div>
          </div>
        )
      }
     
    </Modal>
    
  )
}