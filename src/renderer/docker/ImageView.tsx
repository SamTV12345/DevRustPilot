import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ArrowClockwise } from 'react-bootstrap-icons';

export const ImageView = ()=>{
  const [images, setImages] = useState<string[][]>([])

  window.electron.ipcRenderer.on('cmd-callback', (args) => {
    const res: string[] = args.split(/[\r\n|\n|\r]/).filter(String)

    const resultingArray = res
      .map(v => v.replace(/\u0000/g, '')) // remove all \u0000
      .map(v => { // remove all double spaces
        while (v.replace(/\s\s/g, '\t') != v)
          v = v.replace(/\s\s/g, '\t').trim();
        return v;
      })
      .filter(v => v) // remove empty lines
      .map(v=>v.split('\t'))
    //Remove heading
    resultingArray.shift()

    setImages(resultingArray)
  })

  useEffect(()=>{
    getImages()
    return ()=>{
      window.electron.ipcRenderer.removeAllListeners(['cmd-callback'])
    }
  }, [])

  const getImages = ()=>{
    window.electron.ipcRenderer.sendMessage('cmd', "wsl docker images");
  }


  return     <div className="h-75 d-flex justify-content-center align-items-center">
    <div className="w-75">
    <span><h1 className="d-inline">Docker Images</h1></span>

    <ArrowClockwise className="ms-2 mb-2 h2" onClick={()=>getImages()} />

    <Table className="">
      <thead>
      <tr>
        <td>Repository</td>
        <td>Tag</td>
        <td>Image ID</td>
        <td>Erstellt am</td>
        <td>Größe</td>
        <td className="text-center">Aktionen</td>
      </tr>
      </thead>
      <tbody>
      {images.length>0&& images.map(i=>{
        return <tr>
          <td>
            {i[0]}
          </td>
          <td>
            {i[1]}
          </td>
          <td>
            {i[2]}
          </td>
          <td>
            {i[3]}
          </td>
          <td>
            {i[4]}
          </td>
          <td className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{height:'2rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </td>
        </tr>
      })}
      </tbody>
    </Table>
  </div>
  </div>
  }
