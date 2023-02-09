import {FC} from "react";
import {createPortal} from "react-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setModalOpen} from "./ModalSlice";
import {FieldValues, FormProvider, useForm} from "react-hook-form";

export interface ModalProps {
    children: any,
    headerText: string,
    onCancel: () => void,
    onAccept: (e:FieldValues) => void,
    onDelete: ()=>void
    cancelText:string,
    acceptText:string
}



export const Modal:FC<ModalProps>  = ({headerText,children, onCancel, onAccept, cancelText,acceptText, onDelete})=>{
    const methods = useForm();
    const openModal  = useAppSelector(state=>state.modalReducer.openModal)
    const dispatch = useAppDispatch()


    return  openModal ? createPortal(
            <FormProvider {...methods}>
        <form id="defaultModal" tabIndex={-1} aria-hidden="true" onClick={()=>dispatch(setModalOpen(false))} onSubmit={
            methods.handleSubmit((e)=>{
                console.log(e)
                onAccept(e)})}

                                          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full z-40">
        <div className="grid place-items-center h-screen">
            <div className="relative rounded-lg shadow bg-gray-700 justify-center w-full md:w-2/4" onClick={(e)=>e.stopPropagation()}>
                <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-600">
                    <h3 className="text-xl font-semibold text-white">
                        {headerText}
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="defaultModal" onClick={()=>dispatch(setModalOpen(false))}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Schließen</span>
                    </button>
                </div>
                <div className="p-6 space-y-6 text-base leading-relaxed text-gray-400">
                    {children}
                </div>
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 border-gray-600">
                    <button data-modal-toggle="defaultModal" type="button" className="text-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600" onClick={onCancel}>{cancelText}</button>
                    <button data-modal-toggle="defaultModal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">{acceptText}</button>
                    <i className="fa-solid fa-trash text-red-600 fa-xl" onClick={onDelete}/>
                </div>
            </div>
        </div>
    </form></FormProvider>, document.getElementById('modal') as Element):<div></div>
}
