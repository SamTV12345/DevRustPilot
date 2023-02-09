import {FC, useEffect, useState} from 'react';
import { EMAIL_PREFIX, EMAIL_SUFFIX, SETTINGS_CALLBACK, STARTUP_SCRIPT } from './constants/SettingsConstants';
import {settingsManager} from "../main/settingsManager";
import {PrimaryButton} from "./components/PrimaryButton";
import {CenteredBackground} from "./components/CenteredBackground";

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

  type PropsWithChildren= {

  }

  const GeneratePersonFields:FC<PropsWithChildren>= ()=>{
    return <>
        <h2 className="text-2xl col-span-2">Generate Person</h2>
        <div className='col-6'>
          Email-Präfix
        </div>
        <input className='col-6' value={emailPrefix} onChange={(v) => setEmailPrefix(v.target.value)} />
        <div className='col-6'>
          Email-Suffix
        </div>
        <input className='col-6' value={emailSuffix} onChange={(v) => setEmailSuffix(v.target.value)} />

    </>
  }

  const WSLFields:FC<PropsWithChildren>  = ()=>{
    return <>
      <h2 className="text-2xl col-span-2">WSL Fields</h2>
      <div className='col-6'>
        Startup-Script
      </div>
      <input className='col-6' value={startupScript} onChange={(v) => setStartupScript(v.target.value)} />
    </>
  }

  return <CenteredBackground>
    <div className="grid grid-cols-2 gap-2">
      <GeneratePersonFields/>
      <WSLFields/>
      <div className="d-flex justify-content-center">
        <PrimaryButton onClick={saveConfig}>Speichern</PrimaryButton>
      </div>
    </div>
  </CenteredBackground>
}
