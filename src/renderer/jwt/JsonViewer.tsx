import { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {modifyAlgJWT, modifyDecodedJWT, modifyParsedToken, modifyRawJWT} from './JWTReducer';

export const JsonViewer = () => {
  const dispatch = useAppDispatch()
  const rawJWT = useAppSelector(state => state.jwt.rawJWT)
  const decodedJWT = useAppSelector(state=>state.jwt.decodedJWT)
  const alg = useAppSelector(state=>state.jwt.algJWT)

  const decodeToText = (json: string) => {
    if(!json.includes('.')){
      return
    }

    json = json.trim()
    try {
      const tokens = json.split('.');

      const header = JSON.parse(window.atob(tokens[0]));
      const payload = JSON.parse(window.atob(tokens[1]));
      dispatch(modifyAlgJWT(JSON.stringify(header, null, 4)))
      dispatch(modifyDecodedJWT(JSON.stringify(payload, null, 4)))
      dispatch(modifyParsedToken(JSON.parse(window.atob(tokens[1]))))
    }
    catch (e){
      console.error("Not a valid JWT token. It needs to render to contain a . and is required to be a JSON object")
    }
  }

  useEffect(() => {
    if (rawJWT.length === 0) {
      return;
    }
    decodeToText(rawJWT);
  }, [rawJWT]);

  return <div style={{ height: '85%' }}>
    <div className='row h-100 m-4'>
      <div id='payload' className='col-6 h-100'>
        <div className="d-flex">
          <h2>Raw-Daten</h2>
        </div>
        <textarea value={rawJWT} onChange={(v) => dispatch(modifyRawJWT(v.target.value))} className='h-100 w-100' />
      </div>
      <div id='encoded' className='col-6 h-100'>
        <div className='h-25'>
          <h2>Algorithmus-Daten</h2>
          <CodeMirror value={alg} extensions={[json()]} onChange={(v) => dispatch(modifyAlgJWT(v))} className=' w-100'
                      editable={false} />
        </div>
        <h2>JWT-Payload</h2>
        <CodeMirror value={decodedJWT} extensions={[json()]} onChange={(v) => dispatch(modifyDecodedJWT(v))}
                    className='h-75 w-100 overflow-scroll' editable={false}/>
      </div>
      <div className="position-absolute bottom-0 end-0">
      </div>
    </div>
  </div>
}
