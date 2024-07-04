import {useFormContext} from "react-hook-form";
import {addTag} from "../constants/Database";
import {Input} from "../components/Input";
import {Modal} from "../modals/Modal";
import {setModalOpen} from "../modals/ModalSlice";
import {useAppDispatch} from "../store/hooks";


const TagCreateForm = ()=>{


    const { register } = useFormContext(); // retrieve all hook methods

    return <div className="grid grid-cols-2 gap-2">
        <label className="col-6">Titel des Tags</label>
        <Input className="col-6" register={register} name="tag" required/>
    </div>
}


export const TagModal = () => {
    const dispatch = useAppDispatch()
    const onSubmit = (data: any) => {
        addTag(data.tag)
    }

    return <Modal headerText={"Notiz hinzufügen"} acceptText={"Hinzufügen"} cancelText={"Abbrechen"} onDelete={()=>{}} onAccept={(e)=>{
        onSubmit(e)}} onCancel={()=>{
        dispatch(setModalOpen(false))}}>
        <TagCreateForm/>
    </Modal>
}
