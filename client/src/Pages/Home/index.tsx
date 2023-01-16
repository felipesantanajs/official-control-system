import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

import { api } from "../../service/api";
import { CustomActions } from "../../components/CustomActions";
import { ModalControl } from "../../components/ModalControl";
import useGetDatasEmployee from "../../hooks/useGetDatasEmployee";
import useControlModal from "../../hooks/useControlModal";

export function Home() {
    const getDatas = useGetDatasEmployee((state) => state.arrayDatas)
    const setDatas = useGetDatasEmployee((state) => state.setDatas)
    const setTypeModal = useControlModal((state) => state.setTypeModal)

    const { isLoading: lodingEmployee } = useQuery(['search-employee'], async () => {
        const response = await api.get("/search")
        setDatas(response.data)
        return response.data
    })

    const columns: GridColDef[] = [

        { field: 'name', headerName: 'Nome', width: 200 },
        { field: 'cpf', headerName: 'CPF', width: 200 },
        { field: 'email', headerName: 'E-mail', width: 200 },
        { field: 'status', headerName: 'Status', width: 200, type: 'boolean', editable: true },
        { field: 'role', headerName: 'Cargo', width: 200 },
        { field: 'actions', headerName: 'Ações', width: 200, renderCell: (params) => <CustomActions params={params} /> },
    ];

    const row = getDatas.map(res => {
        return {
            id: res.id,
            name: res.name,
            cpf: res.cpf,
            email: res.email,
            status: res.status,
            role: res.role?.name,
            roleId: res.roleId
        }
    })

    const handleChangePage = () =>{
        setTypeModal(" ")
    }

    return (
        <div className="bg-slate-900 w-full h-screen flex flex-col justify-center items-center">
            <ModalControl />
            <div className="bg-gray-800 border border-gray-400 w-[100%] max-w-7xl h-[40rem] rounded-xl  ">
                {lodingEmployee
                    ? (<div className="flex items-center justify-center h-full">Carregando...</div>)
                    : (
                        <DataGrid
                            style={{ color: "white", textAlign: "center" }}
                            rows={row}
                            columns={columns}
                            rowsPerPageOptions={[5, 10, 15]}
                            className="text-white"
                        />
                    )}
                <Link to="/register" >
                    <button 
                        className="bg-pink-900 text-white w-40 h-10 rounded-lg float-right mt-4 duration-100 hover:brightness-75" 
                        onClick={handleChangePage}>Novo Funcionário
                    </button>
                </Link>
            </div>
        </div>
    )
}