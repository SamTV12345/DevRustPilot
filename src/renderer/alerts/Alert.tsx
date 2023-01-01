import { Toast, ToastContainer } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setMessage, setShowAlert, setType } from './AlertReducer';
import { useEffect } from 'react';
import { PullResponse } from '../docker/PullResponse';


export const Alert = ()=>{
  const dispatch = useAppDispatch()
  const show = useAppSelector(state=>state.alertReducer.show)
  const message = useAppSelector(state=>state.alertReducer.message)
  const type = useAppSelector(state=>state.alertReducer.type)

  return <ToastContainer position={'bottom-center'} className="p-3">
    <Toast style={{zIndex: 50, bottom: 20}} className={`${type==='error'?'bg-danger':'bg-success'}`} show={show} onClose={()=>dispatch(setShowAlert(false))} delay={3000} autohide>
    <Toast.Body className={'text-white'}>{message}</Toast.Body>
  </Toast>
  </ToastContainer>
}

