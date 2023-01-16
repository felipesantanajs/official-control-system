import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import KeyIcon from '@mui/icons-material/Key';
import { Box, IconButton, Toolbar } from "@mui/material";
import { useEffect, useState } from 'react';
import { api } from '../../service/api';
import useControlModal from '../../hooks/useControlModal';
import useGetDatasEmployee from '../../hooks/useGetDatasEmployee';

interface CustomActionsProps{
    params:any;
}

export function CustomActions({params}:CustomActionsProps){

    const getDatas = useGetDatasEmployee((state) => state.arrayDatas )
    const setDatas = useGetDatasEmployee((state) => state.setDatas )
    const setValueLineClicked = useGetDatasEmployee((state) => state.setLineTableClicked )
    const setTypeModal = useControlModal((state) => state.setTypeModal)

    const activeModal = useControlModal((state) => state.activeModal)
    const [activeButton, setActiveButton] = useState(params.row.status)

    async function updateStatus(){
        await api.post("/update-status", {data:params.row})
        .then(response => response.data)
        setActiveButton(!activeButton)
        
        const newArray = getDatas.filter((item) => {
            if(item.id === params.row.id){
              item.status = !item.status
            }
            return item
        })
        setDatas(newArray)
    }
    
    const handleOpenModalEditEmployee = ()=>{
        setValueLineClicked( params.row);
        setTypeModal("updateEmployee");
        activeModal();
    }
    const handleOpenModalEditPass =  ()=>{
        setValueLineClicked( params.row);
        setTypeModal("editPass");
        activeModal();
    }
    return(
        <Box>
            {activeButton 
            ?(  
                <Toolbar>
                    <IconButton onClick={handleOpenModalEditEmployee} color='primary'>
                        <EditIcon />
                    </IconButton>
                    <IconButton value="active" onClick={updateStatus} color='primary'>
                        <ToggleOnIcon/>
                    </IconButton>
                    <IconButton value="password" onClick={handleOpenModalEditPass} color='primary'>
                        <KeyIcon />
                    </IconButton>
                </Toolbar>
            ):(
                <Toolbar>
                    <IconButton value="active" onClick={updateStatus} color='primary'>
                        <ToggleOffIcon />
                    </IconButton>
                </Toolbar>
            )
            }
            
        </Box>
       
    )
}