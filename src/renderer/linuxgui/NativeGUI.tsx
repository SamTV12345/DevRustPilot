import {Pencil, PlayBtn, Trash} from "react-bootstrap-icons";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect} from "react";
import {NativeGUIActions} from "./NativeGUISlice";
import {db, deleteAppFromDatabase} from "../constants/Database";
import {Command} from "@tauri-apps/api/shell";
import {AppModalProps, setAppToUpdate, setAppToUpdateModal, setModalOpen} from "../modals/ModalSlice";
import {CenteredBackground} from "../components/CenteredBackground";
import {PrimaryButton} from "../components/PrimaryButton";

export const NativeGUI = () => {
    const dispatch = useAppDispatch()
    const apps = useAppSelector(state=>state.nativeGUIReducer.apps)

    const determineStatus = (status: boolean) => {
        return status?<span className="flex align-items-center">&#128994;</span>: <span className="flex align-items-center">&#128308;</span>
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

    return <CenteredBackground className="m-10">
        <div>
            <h1 className="text-center text-4xl">Linux GUI</h1>
            <PrimaryButton onClick={()=>{
                dispatch(setModalOpen(true))
            }}>+</PrimaryButton>
            <div id="appArea" className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-2">
                {apps.map((app, index)=>{


                return <div key={app.id}
                    className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 grid grid-rows-[min-content_1fr]">
                    <img src={app.icon} className="rounded-t-lg object-cover" alt={app.app}/>
                    <div className="static">
                    <div className="p-5 grid grid-rows-[min-content_1fr]">
                        <div className="flex"><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{app.app}</h5> {determineStatus(app.status)}</div>


                        <div className="grid grid-cols-3">
                            <div className="grid justify-center place-items-end">
                                <Pencil className="icon-width pointer text-4xl text-blue-600" onClick={()=>{
                                    dispatch(setAppToUpdate(app))
                                    dispatch(setAppToUpdateModal(true))}}
                                />
                            </div>
                            <div className="grid justify-center place-items-end">
                                <PlayBtn className="icon-width pointer text-4xl text-green-400" onClick={()=>{
                                    startApp(app)
                                }}/>

                            </div>
                            <div className="grid justify-center place-items-end">
                                <Trash className="icon-width pointer text-4xl text-red-700" onClick={()=>{
                                    deleteAppFromDatabase(app.id)
                                    dispatch(NativeGUIActions.removeApp(app.id))
                                }}/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                })}
            </div>
    </div>
    </CenteredBackground>
}
