import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ArrowClockwise, Play } from 'react-bootstrap-icons';
import { exec } from './utils/ExecUtils';
import { STARTUP_SCRIPT } from './constants/SettingsConstants';

export const WSL = () => {
  const [distroInformation, setDistroInformation] = useState<string[][]>([]);
  const [startUpScript, setStartUpScript]         = useState<string>('')
  const runCommand = (command:string) => {
    window.electron.ipcRenderer.sendMessage('cmd', command);
  };

  const runCommandWithoutRepBack = (command:string) => {
    window.electron.ipcRenderer.sendMessage('cmd-off', command);
  };

  useEffect(()=>{
    exec(STARTUP_SCRIPT, 'wsl-callback')
  }, [])


  useEffect(()=> {
    window.electron.ipcRenderer.on('wsl-callback', (args) => {
      const key = args[0]
      const val = args[1]
      switch (key) {
        case STARTUP_SCRIPT:
          setStartUpScript(val)
      }
    })

    window.electron.ipcRenderer.on('cmd-callback', (args) => {
      const res: string[] = args.split(/[\r\n|\n|\r]/).filter(String);

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
      return ()=>{
        window.electron.ipcRenderer.removeAllListeners(['wsl-callback', 'cmd-callback'])
      }
    }, []
  )

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


  return <div className="container">
    <span><h1 className="d-inline">WSL-Infos</h1>
      <ArrowClockwise className="ms-2 mb-2 h2" onClick={()=>runCommand('wsl --list --verbose')} />
      <Play className="h2" onClick={()=>{
        runCommandWithoutRepBack('wsl')
        if(startUpScript && startUpScript.length>1){
          runCommandWithoutRepBack('bash -c "'+startUpScript+'"')
        }
      }}/>
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
  </div>;
};
