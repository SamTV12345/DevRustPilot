import { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ClipboardCheck, Clipboard as ClipboardIcon } from 'react-bootstrap-icons';

interface ClipboardProps {
  thingToClip: string,
  classNames: string
}

export const Clipboard: FC<ClipboardProps>  = ({thingToClip, classNames})=> {
  const [clipped, setClipped] = useState<boolean>()


  useEffect(()=>{
    if(clipped){
      setTimeout(()=>{
        console.log("Deselected")
        setClipped(false)
      },3000)
    }
  },[clipped])

  const sendStringToClipboard = ()=>{
    if(thingToClip.length>0) {
      setClipped(true)
      window.electron.ipcRenderer.sendMessage('clipboard', thingToClip as unknown as unknown[])
    }
  }

  return <Button className={classNames} onClick={sendStringToClipboard}>
    {!clipped&&<ClipboardIcon/>}
    {clipped&&<ClipboardCheck/>}
  </Button>
}
