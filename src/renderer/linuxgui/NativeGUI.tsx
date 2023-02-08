import {Pencil, PlayBtn, StopBtn} from "react-bootstrap-icons";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {ModalActions} from "../modals/ModalSlice";
import {useEffect} from "react";
import {AppModalProps} from "../modals/AppModal";
import {NativeGUIActions} from "./NativeGUISlice";
import {db} from "../constants/Database";
import {Command} from "@tauri-apps/api/shell";

export const NativeGUI = () => {
    const dispatch = useAppDispatch()
    const apps = useAppSelector(state=>state.nativeGUIReducer.apps)

    const determineStatus = (status: boolean) => {
        return status?<span className="d-flex align-items-center">&#128994;</span>: <span className="d-flex align-items-center">&#128308;</span>
    }

    const startApp = (app: AppModalProps) => {
        console.log(app.path)
        dispatch(NativeGUIActions.setAppStatus({id:app.id, status: true}))
        new Command('start-linux-gui', [app.path])
            .execute()
            .then(c=>{
                dispatch(NativeGUIActions.setAppStatus({id:app.id, status: false}))
            })
            .catch(c=>{
                dispatch(NativeGUIActions.setAppStatus({id:app.id, status: false}))
            })
    }

    useEffect(()=>{
        if(db === undefined) return
        db.select('SELECT * FROM app')
            .then(resp=>{
                const res = resp as AppModalProps[]
                dispatch(NativeGUIActions.setApps(res))
            })
    },[])

    return <div className="d-grid container">
        <div>
            <h1>Linux GUI</h1>
            <button onClick={()=>{
                dispatch(ModalActions.setModal({
                    show: true,
                    title: "App hinzufügen",
                    closeText: "Schließen",
                    acceptText: "Akzeptieren",
                }))
            }}>+</button>
            <div id="appArea" className="flex-row d-flex gap-5">
                {apps.map((app, index)=>{


                return <div key={app.id}>
                    <div className="card-header d-flex">
                        <h2>{app.app}</h2> {determineStatus(app.status)}
                    </div>
                    <div className="card-body flex-column d-flex">
                        <img src={app.icon} className="img-size" alt={app.app}/>
                        <div>
                        <Pencil className="icon-width pointer" onClick={()=>{
                            dispatch(ModalActions.setModal({
                                show: true,
                                title: "App bearbeiten",
                                closeText: "Schließen",
                                acceptText: "Akzeptieren",
                            }))
                        }}/>
                        <PlayBtn className="icon-width pointer" onClick={()=>{
                            startApp(app)
                        }}/>
                        </div>
                    </div>
                </div>
                })}
            </div>
    </div>
    </div>
}
