import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { EMAIL_PREFIX, EMAIL_SUFFIX, SETTINGS_CALLBACK, STARTUP_SCRIPT } from './constants/SettingsConstants';
import {settingsManager} from "../main/settingsManager";

export type SettingsSchema = {
  emailprefix: string
  emailsuffix: string
  startupscript: string
}

export const SettingsMenu = ()=> {
  const [emailPrefix, setEmailPrefix] = useState<string>('')
  const [emailSuffix, setEmailSuffix] = useState<string>('')
  const [startupScript, setStartupScript] = useState<string>('')


  useEffect(()=> {
    settingsManager.get(EMAIL_PREFIX)
        .then(res=>setEmailPrefix(res))

    settingsManager.get(EMAIL_SUFFIX)
        .then(res=>setEmailSuffix(res))

    settingsManager.get(STARTUP_SCRIPT)
        .then(res=>setStartupScript(res))
  } ,[])

  const saveConfig = async () => {
    await settingsManager.set(EMAIL_PREFIX, emailPrefix)
        .then(c => console.log(c))
    await settingsManager.set(EMAIL_SUFFIX, emailSuffix)
        .then(c => console.log(c))
    await settingsManager.set(STARTUP_SCRIPT, startupScript)
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
    </>
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
