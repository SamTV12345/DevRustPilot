import {Modal} from "./Modal";
import {useFormContext} from "react-hook-form";
import {Input} from "../components/Input";
import {db} from "../constants/Database";
import {NativeGUIActions} from "../linuxgui/NativeGUISlice";
import {useAppDispatch} from "../store/hooks";
import {setModalOpen} from "./ModalSlice";
import {alertActions, AlertTypes} from "../alerts/AlertReducer";

const MyForm = () => {
    const { register } = useFormContext(); // retrieve all hook methods

    return <div className="grid grid-cols-2 gap-2">
        <label className="col-6">Logo</label>
        <Input className="col-3 form-control" type={"file"} register={register} name="iconfile"
               accept=".png,.jpg,.jpeg"/>
        <label className="col-6">Name der App</label>
        <Input className="col-6" register={register} name="app" required/>
        <label className="col-6">Pfad zur App</label>
        <Input className="col-6"  required register={register} name="path"/>
    </div>
}

export const AddGUIModal = ()=>{
    const dispatch = useAppDispatch()
    const readFile = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    const onSubmit = (data: any) => {
        readFile(data.iconfile[0])
            .then(c=>{
                if(db === undefined) return
                const id = crypto.randomUUID()
                db.execute('INSERT INTO app (id,icon, app, path) VALUES (?,?,?,?)',
                    [id,c, data.app,data.path])
                    .then(r=>{
                        dispatch(NativeGUIActions.addApp({
                            app: data.app,
                            path: data.path,
                            icon: c as string,
                            id,
                            status: false
                        }))
                        dispatch(alertActions.setAlerting({
                            message: "App wurde hinzugefügt",
                            type: AlertTypes.SUCESS,
                            title: "App hinzugefügt",
                            open: true
                        }))
                        dispatch(setModalOpen(false))
                    })
                    .catch(r=>{
                        dispatch(alertActions.setAlerting({
                            message: "Beim Hinzufügen der App ist ein Problem augetreten",
                            type: AlertTypes.ERROR,
                            title: "App nicht hinzugefügt",
                            open: true
                        }))
                    })
            })
    }
    return <Modal headerText={"App hinzufügen"} acceptText={"Hinzufügen"} cancelText={"Abbrechen"} onDelete={()=>{}} onAccept={(e)=>{
        console.log(e)
        onSubmit(e)}} onCancel={()=>{
        dispatch(setModalOpen(false))}}>
        <MyForm/>
    </Modal>
}
