import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Link } from "react-router-dom";

import { api } from "../../service/api";
import { FormInput } from "../../components/FormInput";
import { ModalControl } from "../../components/ModalControl";
import { FormSelectRoles } from "../../components/FormSelectRoles";

type ValidationFormSchemaType = z.infer<typeof validationFormSchema>

const validationFormSchema = z.object({

    name: z.string().min(3, {message: 'O nome precisa ter no minimo 3 letras'}),
    hiring_date: z.coerce.date({
        required_error: "Por favor selecione uma data",
    }),
    pass: z.string().min(8,{message: 'Deve ter pelo menos 8 caracteres.'})
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/, 
    { message: 'A senha deve ter pelo menos uma letra maiúscula, 1 letra minúscula e 1 caracter especial' }),
  
    confirmation_pass: z.string(),
    cpf: z.string(),
    enrollment: z.string(),
    roleId: z.string(),
    email: z.string().email({ message: 'Deve ser um email' }),

}).refine((data) => data.pass === data.confirmation_pass, {
    message: "As senha não são iguais, verifique!"  
});

export function Registration(){
   
    const { register, handleSubmit, formState: {errors}} = useForm<ValidationFormSchemaType>({
        resolver:zodResolver(validationFormSchema)
    });

    async function handleDataSubmit(data:ValidationFormSchemaType){
        console.log(data)
        api.post("/register", {
            data
        }).then(response =>alert(response.data))
    }
    return(
        <>
            <ModalControl/> 

            <div className="flex flex-col justify-center items-center h-screen bg-slate-900"> 
                <div className="flex flex-col justify-center items-center border rounded-md w-[46rem] h-[30rem] p-6 bg-slate-400">
                    <h1 className="text-center text-lg">Cadastro de Funcionário</h1>
                    <form className="flex flex-wrap justify-between h-full p-5" onSubmit={handleSubmit(handleDataSubmit)}>
                        <FormInput label="Nome" type="text" name="name" register={register} error={errors.name} />
                        <FormInput label="Data de contratação" type="date" name="hiring_date" register={register} error={errors.hiring_date}/>
                        <FormInput label="Senha" type="password" name="pass" register={register} error={errors.pass}/>
                        <FormInput label="Confirmação de Senha"  type="password" name="confirmation_pass" register={register} error={errors.confirmation_pass}/>
                        <FormInput label="CPF" type="text" name="cpf" register={register} error={errors.cpf}/>
                        <FormInput label="Matricula" type="number" name="enrollment" register={register} error={errors.enrollment}/>
                        <FormInput label="Email" type="email" name="email" register={register} error={errors.email} />
                        <FormSelectRoles name="roleId" register={register} error={errors.roleId} />
                        <button type="submit" className="block h-10 w-[100%] mt-5 bg-pink-900 text-white rounded duration-100 hover:brightness-75" > Cadastrar </button>
                    </form>
                </div>
                <Link to="/" ><button className="bg-pink-900 text-white w-40 h-10 rounded-lg float-right mt-4 duration-100 hover:brightness-75">Retornar para home</button></Link> 
            </div>
        </>
    )
}