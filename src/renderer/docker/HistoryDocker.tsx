import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DockerHistoryItem } from './DockerHistoryItem';
import { Table } from 'react-bootstrap';
import './docker.css'
// @ts-ignore
import timeago from 'epoch-timeago';
// @ts-ignore
import prettyBytes from 'pretty-bytes';
import { useAppSelector } from '../store/hooks';
import { ImageModel } from './ImageModel';

export const HistoryDocker = () => {
  const navigate = useLocation();
  const [historyItems, setHistoryItems] = useState<DockerHistoryItem[]>([]);
  const images = useAppSelector(state=>state.dockerReducer.images)
  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [currentImage, setCurrentImage] = useState<ImageModel>()
  const [imageName, setImageName]       = useState<string>('')

  useEffect(() => {
    window.electron.ipcRenderer.on('image-history', (args) => {
      setHistoryItems(JSON.parse(args as string) as DockerHistoryItem[]);
    });
    setCurrentImage(images.find(i=>i.Id.includes(navigate.state.id)))
    getImageHistory();


    return () => {
      window.electron.ipcRenderer.removeAllListeners(['image-history']);
    };
  }, []);

  useEffect(()=>{
    if(currentImage!==undefined){
      extractImageName()
    }
  },[currentImage])

  const extractImageName = ()=>{
    let imageName = ''
    if(currentImage?.RepoTags) {
      const imageNameAndTag = currentImage.RepoTags[0].split(':')
      imageName = imageNameAndTag[0]
    }

    if(currentImage?.RepoDigests){
      imageName = currentImage.RepoDigests[0].split('@')[0]
    }
    setImageName(imageName)
  }

  const getImageHistory = () => {
    window.electron.ipcRenderer.sendMessage('unix-cmd',
      [`curl --unix-socket /var/run/docker.sock http://localhost/images/${navigate.state.id}/history`, 'image-history']);
  };

  return <div className='pe-5 ps-5 pt-5'>
    <div className='row'>
      <h2 className="col-6">{imageName}</h2>
      <h2 className="col-3">Size: {currentImage?.Size && prettyBytes(Number(currentImage?.Size))}</h2>
      <h2 className="col-3">Created: {currentImage&&timeago(Number(currentImage?.Created)*1000)}</h2>
      <Table className='col h-75'>
        <thead>
        <tr key='history-head'>
          <td>
            #
          </td>
          <td>
            Befehl
          </td>
          <td>
            Größe
          </td>
        </tr>
        </thead>
        <tbody>
        {historyItems.map((h, index) => <tr key={index} className={`${index===selectedRow&& 'bg-light'}`} onClick={()=>setSelectedRow(index)}>
          <td>{index}</td>
          <td className="docker-td" >{h.CreatedBy}</td>
          <td>{h.Size}</td>
        </tr>)}
        </tbody>
      </Table>
      <div className='col bg-light ms-5'>
        {historyItems[selectedRow]!==undefined&& historyItems[selectedRow].CreatedBy}
      </div>
    </div>
  </div>
};
