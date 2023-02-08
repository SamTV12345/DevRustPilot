import { useForm } from "react-hook-form";
import {Button, Modal} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {ModalActions} from "./ModalSlice";
import {db} from "../constants/Database";
import {NativeGUIActions} from "../linuxgui/NativeGUISlice";

export interface AppModalProps {
    id: string
    app: string,
    path: string,
    icon: string,
    status: boolean //true = running, false = stopped
}

export const AppModal = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useAppDispatch()


    const show = useAppSelector(state => state.modalReducer.show)
    const title = useAppSelector(state => state.modalReducer.title)
    const closeText = useAppSelector(state => state.modalReducer.closeText)

    const onSubmit = (data: any) => {
        readFile(data.iconfile[0])
            .then(c=>{
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
                        dispatch(ModalActions.toggleModal(false))
                    })
                    .catch(r=>console.log(r))
            })

    }




    const readFile = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }


    return  <Modal show={show} size={"lg"}>
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="container" id="simpleform" onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-2">
                    <label className="col-6">Logo</label>
                    <input className="col-3 form-control" type={"file"} accept=".png,.jpg,.jpeg"  {...register('iconfile')}/>
                </div>
                <div className="row mb-2">
                    <label className="col-6">Name der App</label>
                    <input className="col-6" {...register('app')}/>
                </div>
                <div className="row mb-2">
                    <label className="col-6">Pfad zur App</label>
                    <input className="col-6"  {...register('path')}/>
                </div>
                <div>
                    <Button variant={"secondary"} type={"button"} onClick={()=>{
                        dispatch(ModalActions.toggleModal(false))
                    }}>{closeText}</Button>
                    <Button variant={"primary"} className="ms-4" type={"submit"}>Submit</Button>
                </div>
            </form>
        </Modal.Body>
    </Modal>

}
