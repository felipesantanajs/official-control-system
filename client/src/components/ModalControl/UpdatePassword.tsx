import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../service/api";
import { FormInput } from "../FormInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useGetDatasEmployee from "../../hooks/useGetDatasEmployee";
import { useEffect } from "react";

type ValidationFormSchemaType = z.infer<typeof validationFormSchema>

const validationFormSchema = z.object({
  id: z.number(),
  old_pass: z.string(),

  pass: z.string().min(8,{message: 'Deve ter pelo menos 8 caracteres.'})
  .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/, 
  { message: 'A senha deve ter pelo menos uma letra maiúscula, 1 letra minúscula e 1 caracter especial' }),

  confirmation_pass: z.string()

}).refine((data) => data.pass === data.confirmation_pass, {
  message: "As senhas não são iguais",
  path: ["confirm"], // path of error
});

export function UpdatePassword(){
  const lineClickedTable = useGetDatasEmployee((state) => state.lineTableClicked)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ValidationFormSchemaType>({
    resolver: zodResolver(validationFormSchema)
  })

  useEffect(() => {
    if (lineClickedTable) {
      setValue("id",lineClickedTable.id);
    }
  })
  
  async function handleSubmitUpadateEmployeePass(data:any){
    await api.post("/update-employee-pass", {data})
    .then(response => alert(response.data)
    )
  }

  return (
    <div className="flex bg-white border  opacity-90 w-[40rem] h-[28rem] rounded-3xl ">
      <div className="p-6 h-full w-full flex flex-col items-center  ">
        <h1 className="text-center text-lg">Atualizar Senha</h1>
        <form className="flex flex-col h-full gap-3 mt-6 " onSubmit={handleSubmit(handleSubmitUpadateEmployeePass)} >
          <FormInput type="hidden" name="id" register={register} />
          <FormInput label="Senha antiga" type="password" name="old_pass" register={register} error={errors.old_pass}/>
          <FormInput label="Senha" type="password" name="pass" register={register} error={errors.pass}/>
          <FormInput label="Confirmação de Senha"  type="password" name="confirmation_pass" register={register} error={errors.confirmation_pass}/>
          <button type="submit" className="block h-10 w-[95%] mt-5 bg-pink-900 text-white rounded duration-100 hover:brightness-75" > Atualizar </button>
        </form>
      </div>
  </div>
  )
}