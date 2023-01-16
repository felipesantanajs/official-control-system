
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormInput } from "../FormInput"
import { FormSelectRoles } from '../FormSelectRoles'
import { api } from '../../service/api';
import useGetDatasEmployee from '../../hooks/useGetDatasEmployee';
import { useEffect } from 'react';
type ValidationFormSchemaType = z.infer<typeof validationFormSchema>

const validationFormSchema = z.object({
  id: z.number(),
  name: z.string().min(3, {message: 'O nome precisa ter no minimo 3 letras'}),
  cpf: z.string(),
  email: z.string().email({ message: 'Deve ser um email' }),
  roleId: z.string().transform(Number),
})

export function UpdateEmployeeModal() {
  
  const setDatas = useGetDatasEmployee((state) => state.setDatas)
  const lineClickedTable = useGetDatasEmployee((state) => state.lineTableClicked )

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ValidationFormSchemaType>({
    resolver: zodResolver(validationFormSchema)
  })

  //Set default values in fields

  useEffect(() => {
    if (lineClickedTable) {
      setValue("id",lineClickedTable.id);
      setValue("name",lineClickedTable.name);
      setValue("cpf",lineClickedTable.cpf);
      setValue("email",lineClickedTable.email);
      setValue("roleId",lineClickedTable.roleId);
    }
  }, [lineClickedTable]);

  async function handleSubmitUpadateEmployee(data: any) {
    await api.post("/update-employee", { data })
      .then(response => {
        setDatas(response.data.values)
        alert("Atualizado com sucesso")
      })
  }
  return (
    <div className="flex bg-white border  opacity-90 w-[50rem] h-[25rem] rounded-3xl ">

      <div className="flex items-center justify-center w-full ">
        <div className="flex flex-col items-center justify-center p-5 h-full w-[40rem]  ">
          <h1 className="text-center text-lg">Atualizar Funcionário</h1>
          <form className="flex flex-wrap gap-5 items-center justify-between h-full p-5 border border-r-gray-300" onSubmit={handleSubmit(handleSubmitUpadateEmployee)} >

            <FormInput label="Nome" type="text" name="name" register={register} error={errors.name} />
            <FormInput label="CPF" type="text" name="cpf" register={register} error={errors.cpf} />
            <FormInput label="Email" type="email" name="email" register={register} error={errors.email} />
            <FormSelectRoles name="roleId" register={register} error={errors.roleId} />
            <FormInput type="hidden" name="id" register={register} />

            <button type="submit" className="block h-10  w-full mt-1 bg-pink-900 text-white rounded hover:brightness-75" > Atualizar </button>
          </form>
        </div>
      </div>
    </div>
  )
} 