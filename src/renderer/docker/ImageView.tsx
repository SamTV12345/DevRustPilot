import { Dropdown, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { ImageModel } from './ImageModel';
// @ts-ignore
import timeago from 'epoch-timeago';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setImages } from './DockerSlice';

export const ImageView = ()=>{
  const images = useAppSelector(state=>state.dockerReducer.images)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(()=>{
    window.electron.ipcRenderer.on('image-callback', (args) => {
      const res = JSON.parse(args) as ImageModel[]
      dispatch(setImages(res))
    })
    getImages()
    return ()=>{
      window.electron.ipcRenderer.removeAllListeners(['image-callback'])
    }
  }, [])

  const getImages = ()=>{
    window.electron.ipcRenderer.sendMessage('unix-cmd',
      ["curl --unix-socket /var/run/docker.sock http://localhost/images/json?all=true", 'image-callback']);
  }


  return     <div className="h-75 d-flex justify-content-center align-items-center">
    <div className="w-75">
    <span><h1 className="d-inline">Docker Images</h1></span>

    <ArrowClockwise className="ms-2 mb-2 h2" onClick={()=>getImages()} />

    <Table className="">
      <thead>
      <tr key="image-head">
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
        let imageName = ''
        let imageTag = ''
        let imageId = i.Id.substring(7,19)
        if(i.RepoTags) {
          const imageNameAndTag = i.RepoTags[0].split(':')
          imageName = imageNameAndTag[0]
          imageTag = imageNameAndTag[1]
        }
        else{
          imageTag = '<none>'
        }

        if(i.RepoDigests){
            imageName = i.RepoDigests[0].split('@')[0]
        }

        // @ts-ignore
        return <tr key={i.Id}>
          <td>
            {imageName}
          </td>
          <td>
            {imageTag}
          </td>
          <td>
            {imageId}
          </td>
          <td>
            {timeago(Number(i.Created)*1000)}
          </td>
          <td>
            {i.Size}
          </td>
          <td className="">
            <Dropdown className="w-50 mx-auto">
            <Dropdown.Toggle id="dropdown-basic" className="bg-transparent border-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'20%'}} className="bg-dark">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>navigate('/docker/history', {state: { id:imageId}})}>Inspect</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Pull</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Push To Hub</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Remove</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      })}
      </tbody>
    </Table>
  </div>
  </div>
  }
