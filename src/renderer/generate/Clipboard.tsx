import { FC, useEffect, useState } from 'react';
import { ClipboardCheck, Clipboard as ClipboardIcon } from 'react-bootstrap-icons';
import {clipboard} from "@tauri-apps/api";
import {PrimaryButton} from "../components/PrimaryButton";


interface ClipboardProps {
  thingToClip: string,
  className: string
}

export const Clipboard: FC<ClipboardProps>  = ({thingToClip, className})=> {
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
     clipboard.writeText(thingToClip)
    }
  }

  return <PrimaryButton onClick={sendStringToClipboard} className={"h-full"}>
    {!clipped&&<ClipboardIcon/>}
    {clipped&&<ClipboardCheck/>}
  </PrimaryButton>
}
