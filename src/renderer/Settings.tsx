import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { EMAIL_PREFIX, EMAIL_SUFFIX, SETTINGS_CALLBACK, STARTUP_SCRIPT } from './constants/SettingsConstants';
import { exec } from './utils/ExecUtils';


export const SettingsMenu = ()=> {
  const [emailPrefix, setEmailPrefix] = useState<string>('')
  const [emailSuffix, setEmailSuffix] = useState<string>('')
  const [startupScript, setStartupScript] = useState<string>('')


  useEffect(()=>{
    exec(EMAIL_PREFIX, SETTINGS_CALLBACK)
    exec(EMAIL_SUFFIX, SETTINGS_CALLBACK)
    exec(STARTUP_SCRIPT, SETTINGS_CALLBACK)

    window.electron.ipcRenderer.on(SETTINGS_CALLBACK, (args)=>{
      const key = args[0]
      const val = args[1]
      switch (key){
        case EMAIL_PREFIX:
          setEmailPrefix(val)
          break
        case EMAIL_SUFFIX:
          setEmailSuffix(val)
          break
        case STARTUP_SCRIPT:
          setStartupScript(val)
      }
    })

    return ()=>{
      window.electron.ipcRenderer.removeAllListeners([SETTINGS_CALLBACK])
    }
  }, [])



  const saveConfig = ()=>{
    window.electron.ipcRenderer.sendMessage('store-save',[EMAIL_PREFIX, emailPrefix])
    window.electron.ipcRenderer.sendMessage('store-save',[EMAIL_SUFFIX, emailSuffix])
    window.electron.ipcRenderer.sendMessage('store-save',[STARTUP_SCRIPT, startupScript])
  }

  const insertGeneratePersonFields= ()=>{
    return <>
      <div className='row mb-3'>
        <div className='col-12'><h2>Generate Person</h2></div>
        <div className='col-6'>
          Email-Präfix
        </div>
        <input className='col-6' value={emailPrefix} onChange={(v) => setEmailPrefix(v.target.value)} />
      </div>
      <div className='row mb-3'>
        <div className='col-6'>
          Email-Suffix
        </div>
        <input className='col-6' value={emailSuffix} onChange={(v) => setEmailSuffix(v.target.value)} />
      </div>
    </>;
  }

  const insertWSLFields  = ()=>{
    return <>
    <div className='row mb-3'>
      <div className='col-12'><h2>WSL Fields</h2></div>
      <div className='col-6'>
        Startup-Script
      </div>
      <input className='col-6' value={startupScript} onChange={(v) => setStartupScript(v.target.value)} />
    </div>
    </>
  }

  return <div className='p-4 h-75 d-flex justify-content-center align-items-center'>
    <div className="container">
      {insertGeneratePersonFields()}
      {insertWSLFields()}
      <div className="d-flex justify-content-center">
        <Button className="" onClick={saveConfig}>Speichern</Button>
      </div>
    </div>
  </div>
}
