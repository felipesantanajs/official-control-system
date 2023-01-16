import { create } from "zustand"

type valuesRoleProps = {
  id: number;
  name:string;
}
type valueProps = {
  id:number;
  name: string;
  cpf: string
  email:string;
  role?: valuesRoleProps;
  roleId: number;
  enrrolment?:string;
  hiring_date?:string;
  status?: boolean;
}
type GetDatasEmployeeProps = {
  arrayDatas: valueProps[];
  lineTableClicked: valueProps;
  setLineTableClicked:(value:valueProps) => void
  setDatas: (datas:any) => void;
}
const useGetDatasEmployee = create<GetDatasEmployeeProps>(
  (set)=> ({
    arrayDatas:[],
    lineTableClicked: {id:0, name:"", email:"", cpf: "", roleId:1, role:{id:0, name: ""} },
    setDatas: (datas) => {
      set((state) => ({
        arrayDatas: datas
      }))
    },
    setLineTableClicked: (value:valueProps) => {
      set((state) => ({lineTableClicked: value}))
    }
    
  })
)

export default useGetDatasEmployee