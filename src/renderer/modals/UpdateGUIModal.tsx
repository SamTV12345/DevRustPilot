import {Modal} from "./Modal";
import {useFormContext} from "react-hook-form";
import {Input} from "../components/Input";
import {db, updateAppInDatabase} from "../constants/Database";
import {NativeGUIActions} from "../linuxgui/NativeGUISlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setAppToUpdateModal, setModalOpen} from "./ModalSlice";
import {alertActions, AlertTypes} from "../alerts/AlertReducer";
import {useEffect} from "react";
import {UpdateModal} from "./UpdateModal";

const MyForm = () => {
    const { register, setValue, formState: { errors } } = useFormContext(); // retrieve all hook methods
    const appToUpdate = useAppSelector(state=>state.modalReducer.appToUpdate)

    useEffect(()=>{
        if(appToUpdate !== undefined){
            setValue("app", appToUpdate.app)
            setValue("path", appToUpdate.path)
            setValue("iconfile", appToUpdate.icon)
        }
    },[appToUpdate])


    return <div>
        {errors.iconfile && <span className="text-red-500">Bitte wähle ein Bild aus</span>}
        {errors.app && <span className="text-red-500">Bitte gib einen Namen an</span>}
        {errors.path && <span className="text-red-500">Bitte gib einen Pfad an</span>}

        <div className="grid grid-cols-2 gap-2">
        <label className="col-6">Logo</label>
        <Input className="col-3 form-control" type={"file"} register={register} name="iconfile"  required
               accept=".png,.jpg,.jpeg"/>
        <label className="col-6">Name der App</label>
        <Input className="col-6" register={register} name="app" required/>
        <label className="col-6">Pfad zur App</label>
        <Input className="col-6"  required register={register} name="path"/>
    </div></div>
}

export const UpdateGUIModal = ()=>{
    const dispatch = useAppDispatch()
    const appToUpdate = useAppSelector(state=>state.modalReducer.appToUpdate)

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
                if(db === undefined|| appToUpdate === undefined) return
                updateAppInDatabase(appToUpdate.id,c as string, data.app,data.path)
                    .then(r=>{
                        dispatch(NativeGUIActions.updateApp({
                            app: data.app,
                            path: data.path,
                            icon: c as string,
                            id: appToUpdate.id,
                            status: false
                        }))
                        dispatch(alertActions.setAlerting({
                            message: "App wurde upgedated",
                            type: AlertTypes.SUCESS,
                            title: "App upgedated",
                            open: true
                        }))
                        dispatch(setModalOpen(false))
                    })
                    .catch(r=>{
                        dispatch(alertActions.setAlerting({
                            message: "Beim Updated der App ist ein Problem augetreten",
                            type: AlertTypes.ERROR,
                            title: "App nicht upgedated",
                            open: true
                        }))
                    })
            })
    }
    return <UpdateModal headerText={"App hinzufügen"} acceptText={"Hinzufügen"} cancelText={"Abbrechen"} onDelete={()=>{}} onAccept={(e)=>{
        console.log(e)
        onSubmit(e)}} onCancel={()=>{
        dispatch(setAppToUpdateModal(false))}}>
        <MyForm/>
    </UpdateModal>
}
