import { useFormContext } from "react-hook-form";
import { Modal } from "../modals/Modal"
import { setModalOpen } from "../modals/ModalSlice"
import { useAppDispatch } from "../store/hooks"
import { Input } from "../components/Input";
import { addNote } from "../constants/Database";


const NoteCreateForm = ()=>{
        const { register } = useFormContext(); // retrieve all hook methods
    
        return <div className="grid grid-cols-2 gap-2">
            <label className="col-6">Titel der Notiz</label>
            <Input className="col-6" register={register} name="title" required/>
            <label className="col-6">Beschreibung der Notiz</label>
            <Input className="col-6"  required register={register} name="description"/>
        </div>
}

export const NotesModal = ()=>{
    const dispatch = useAppDispatch()
    
    const onSubmit = (data: any) => {
       addNote(data.title, data.description)
    }


    return <Modal headerText={"Notiz hinzufügen"} acceptText={"Hinzufügen"} cancelText={"Abbrechen"} onDelete={()=>{}} onAccept={(e)=>{
        onSubmit(e)}} onCancel={()=>{
        dispatch(setModalOpen(false))}}>
        <NoteCreateForm/>
    </Modal>
}