import { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {modifyAlgJWT, modifyDecodedJWT, modifyParsedToken, modifyRawJWT} from './JWTReducer';
import {CenteredBackground} from "../components/CenteredBackground";

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

  return <CenteredBackground className="md:w-11/12 md:h-4/5">
    <div className='grid grid-cols-2 gap-4'>
      <div id='payload' className='grid-rows-2'>
          <h2 className="text-4xl">Raw-Daten</h2>
          <textarea value={rawJWT} onChange={(v) => dispatch(modifyRawJWT(v.target.value))} className="h-full w-full text-black"/>
      </div>
      <div id='encoded' className="grid grid-rows-2">
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <h2 className="text-4xl">Algorithmus-Daten</h2>
          <CodeMirror value={alg} extensions={[json()]} onChange={(v) => dispatch(modifyAlgJWT(v))}
                      editable={false} className="text-black" />
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-4">

        <h2 className="text-4xl">JWT-Payload</h2>
        <CodeMirror value={decodedJWT} extensions={[json()]} onChange={(v) => dispatch(modifyDecodedJWT(v))}
                    className='overflow-y-scroll h-64 text-black' editable={false}/>
      </div>
      </div>
    </div>
  </CenteredBackground>
}
