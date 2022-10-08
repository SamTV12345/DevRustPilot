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

  useEffect(()=>{
    window.electron.ipcRenderer.on('alert-update', (args) => {
      const res = args as string
      const begin = res.lastIndexOf('{')
      const end = res.lastIndexOf('}')
      const resultingJSONObject = JSON.parse(res.substring(begin, end+1)) as PullResponse
      const type = resultingJSONObject.message?'error':'info'

      // @ts-ignore
      for (const [key,value] of Object.entries(resultingJSONObject)) {
        dispatch(setMessage(value))
      }
      dispatch(setType(type))
      dispatch(setShowAlert(true))
    });
    return ()=>window.electron.ipcRenderer.removeAllListeners(['alert-update'])
  },[])

  return <ToastContainer position={'bottom-center'} className="p-3">
    <Toast style={{zIndex: 50, bottom: 20}} className={`${type==='error'?'bg-danger':'bg-success'}`} show={show} onClose={()=>dispatch(setShowAlert(false))} delay={3000} autohide>
    <Toast.Body className={'text-white'}>{message}</Toast.Body>
  </Toast>
  </ToastContainer>
}

