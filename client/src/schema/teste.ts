import z  from 'zod'

const validationFormSchema = z.object({
  id: z.number(),
  name: z.string().min(3, {message: 'O nome precisa ter no minimo 3 letras'}),
  cpf: z.string(),
  enrollment: z.string(),
  email: z.string().email({ message: 'Deve ser um email' }),
  role: z.string(),
  pass: z.string(),
  confirmation_pass: z.string()

}).refine((data) => data.pass === data.confirmation_pass, {
message: "As senha não são iguais, verifique!"  
});