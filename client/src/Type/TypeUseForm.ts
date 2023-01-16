import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form/dist/types";


export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>  = {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}