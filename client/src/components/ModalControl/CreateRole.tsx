import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../../service/api"
import { useForm } from "react-hook-form"
import { z } from "zod"

type ValidationFormSchemaType = z.infer<typeof validationFormSchema>

const validationFormSchema = z.object({
  role: z.string()
})

export function CreateRole(){

  const { register, handleSubmit} = useForm<ValidationFormSchemaType>({
    resolver:zodResolver(validationFormSchema)
  })

  async function handleDataSubmitCreateRole(data:any){
    api.post("/register-role", data)
    .then(response =>alert(response.data))
  }

  return (
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
}