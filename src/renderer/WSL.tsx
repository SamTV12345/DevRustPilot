import { useEffect, useState } from 'react';
import { ArrowClockwise, Play } from 'react-bootstrap-icons';
import { STARTUP_SCRIPT } from './constants/SettingsConstants';
import {Command} from "@tauri-apps/api/shell";
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


    return <div className="grid place-items-center h-full bg-gray-700 md:bg-white">
        <div className="bg-gray-700 p-12 md:rounded-2xl grid gap-4 w-full md:w-auto text-white  md:w-3/5">
    <span className="font-medium text-2xl flex gap-2"><h1 className="me-5">WSL-Infos</h1>
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
      <table className="text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="text-xs text-gray-700 rounded  bg-gray-50 dark:bg-gray-500 dark:text-gray-400">
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
      </table>
    }
  </div>
    </div>
};
