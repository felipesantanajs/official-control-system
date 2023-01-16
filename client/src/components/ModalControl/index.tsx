import {Modal } from "@mui/material";
import useControlModal from "../../hooks/useControlModal";

import { CreateRole } from "./CreateRole";
import { UpdateEmployeeModal } from "./UpdateEmployeeModal";
import { UpdatePassword } from "./UpdatePassword";

export function ModalControl(){

  //Hooks
  const valueModal = useControlModal((state) => state.openModal)
  const desactiveModal = useControlModal((state) => state.activeModal)
  const typeModal = useControlModal((state) => state.typeModal)

  return(
    <Modal
      open={valueModal}
      onClose={desactiveModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems:"center"}}
    >    
      
      { typeModal === "updateEmployee" ?(<UpdateEmployeeModal />)
      : typeModal === "createRole" ? (<CreateRole />)
      :( <UpdatePassword />)
      }
     
    </Modal>
    
  )
}