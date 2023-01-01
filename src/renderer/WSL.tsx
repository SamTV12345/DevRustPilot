import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ArrowClockwise, Play } from 'react-bootstrap-icons';
import { STARTUP_SCRIPT } from './constants/SettingsConstants';
import {Command} from "@tauri-apps/api/shell";
import {get} from "tauri-settings";
import {SettingsSchema} from "./Settings";
import {settingsManager} from "../main/settingsManager";

export const WSL = () => {
  const [distroInformation, setDistroInformation] = useState<string[][]>([]);
  const [startUpScript, setStartUpScript]         = useState<string>('')
  const runCommand = (command:string) => {
    return
  }


  function checkWSLStatus() {
    new Command('wsl-list')
        .execute()
        .then(resFromCommand => {
          const res: string[] = resFromCommand.stdout.split(/[\r\n|\n|\r]/).filter(String);

          const resultingArray = res
              .map(v => v.replace(/\u0000/g, '')) // remove all \u0000
              .map(v => { // remove all double spaces
                while (v.replace(/\s\s/g, ' ') != v)
                  v = v.replace(/\s\s/g, ' ').trim();
                return v;
              })
              .filter(v => v) // remove empty lines
              .map(v => v.split(' ')); // split by space

          resultingArray.forEach(res => {
            if (res.length < 4) {
              res.unshift("None")
            }
          })
          setDistroInformation(resultingArray);
        })
  }

  useEffect(()=>{
    checkWSLStatus();
  }, [])

  const createChip = ()=>{
    return <div className="badge text-dark">
        Default
    </div>
  }

  const createStatusRep = (status:string)=>{

    if(status === undefined){
      return <span>Loading</span>
    }
    if(status.includes("Stopped")){
      return <span>&#128308;</span>
    }
    else if (status.includes("Running")){
      return <span>&#128994;</span>
    }
    else{
      return <span>&#10068;</span>
    }
  }


    function sleep(milliseconds:number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }


    return <div className="d-flex align-items-center justify-content-center h-75">
        <div className="position-static h-50 w-50">
    <span><h1 className="d-inline me-5">WSL-Infos</h1>
        <button onClick={()=>checkWSLStatus()} className="btn btn-secondary me-5" ><ArrowClockwise className=""/></button>
      <button className="btn btn-primary"  onClick={async () => {
          const startupScript = await settingsManager.get(STARTUP_SCRIPT)
          new Command('start-wsl')

          await sleep(4000)
          if(startupScript==undefined|| startupScript.trim().length==0){
              return
          }
          new Command('execute-in-wsl', ["bash",startupScript])
              .execute()
              .then(c=>console.log(c))
          checkWSLStatus()
      }}>
          <Play/>
    </button>
    </span>

    {distroInformation.length > 0 &&
      <Table>
        <thead>
        <tr>
          <th>
            {distroInformation[0][1]}
          </th>
          <th>
            {distroInformation[0][2]}
          </th>
          <th>
            {distroInformation[0][3]}
          </th>
        </tr>
        </thead>
        <tbody>
        {
          distroInformation.slice(1).map((row,index) => {
            return <tr key={index}>
              <td>
                {row[1]} {row[0].includes("*")&&createChip()}
              </td>
              <td>
                {createStatusRep(row[2])}
              </td>
              <td>
                {row[3]}
              </td>
            </tr>
          })
        }
        </tbody>
      </Table>
    }
  </div>
    </div>
};
