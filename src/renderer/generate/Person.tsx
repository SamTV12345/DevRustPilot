import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { GenButton } from './GenButton';
import { Clipboard } from './Clipboard';
import { exec } from '../utils/ExecUtils';
import { EMAIL_PREFIX, EMAIL_SUFFIX, SETTINGS_CALLBACK } from '../constants/SettingsConstants';

export const Person = () => {
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailPrefix, setEmailPrefix] = useState<string>('')
  const [emailSuffix, setEmailSuffix] = useState<string>('')

  useEffect(()=>{
    exec(EMAIL_PREFIX, 'person-callback')
    exec(EMAIL_SUFFIX, 'person-callback')
  }, [])

  useEffect(()=>{
    if(firstname.length>0 || lastname.length>0) {
      setEmail(emailPrefix + "+" + firstname + lastname + "@" + emailSuffix)
    }
    }, [firstname, lastname])

  useEffect(()=>{
  window.electron.ipcRenderer.on('person-callback', (args)=>{
    const key = args[0]
    const val = args[1]
    switch (key){
      case EMAIL_PREFIX:
        setEmailPrefix(val)
        break
      case EMAIL_SUFFIX:
        setEmailSuffix(val)
        break
    }
  })
    return ()=>{
    window.electron.ipcRenderer.removeAllListeners(['person-callback'])
    }
  }, [])

  return <div className="h-75 d-flex justify-content-center align-items-center"><div className='container p-4'>
    <div className='row mb-3'>
      <div className='col-2'>
        Vorname
      </div>
      <input className='col-7' disabled={true} value={firstname} />
      <GenButton func={() => setFirstname(faker.name.firstName())} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={firstname} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
        <div className='col-2'>
          Nachname
        </div>
        <input className='col-7' disabled={true} value={lastname} />
        <GenButton func={() => setLastname(faker.name.lastName())} classNames={'col-1 ms-2'} />
        <Clipboard thingToClip={lastname} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
      <div className='col-2'>
        E-Mail
      </div>
      <input className='col-7' disabled={true} value={email} />
      <Clipboard thingToClip={email} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
      <div className='col-2'>
        Zweifaktor-Email
      </div>
      <input className='col-7' disabled={true} value={emailPrefix+"@"+emailSuffix} />
      <Clipboard thingToClip={email} classNames={'col-1 ms-2'} />
    </div>

  </div>
  </div>
};
