

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type:string;
    label?: string;
    register?:any;
    error?:any;
}

export const FormInput = ({name,type,label,error,register, ...rest}:FormInputProps) => {


    return(
    
        <div className="flex flex-col w-[14rem] ">
            {name === "id" ? (
                <input 
                    type={type}
                    {...register(name)}
                />
            ):(
                <label className="flex flex-col" htmlFor={name}> {label}:
                    <input 
                        className="w-52  h-6 rounded border "
                        type={type}
                        {...register(name)}
                    />
                </label>

            )}

            {error && (
                <div className=" text-pink-700 mx mt-1 max-w-9">{error.message}</div>
            )}
            
        </div>
    )
}