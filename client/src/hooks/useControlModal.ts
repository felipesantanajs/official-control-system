import { create } from "zustand"

type ControlModalProps = {
  openModal: boolean;
  typeModal:string;
  
  activeModal: () => void;
  desactiveModal: () => void;
  setTypeModal: (type:string) => void;
}
const useControlModal = create<ControlModalProps>(
  (set)=> ({
    openModal:false,
    typeModal: "",
    activeModal: () =>{
      set((state) =>({ openModal: !state.openModal }))
    },
    desactiveModal: () =>{
      set((state) =>({ openModal: !state.openModal }))
    },
    setTypeModal: (type) =>{
      set((state) =>({ typeModal: type }))
    }
  })
)

export default useControlModal