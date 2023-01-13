import { Dropdown, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { ImageModel } from './ImageModel';
// @ts-ignore
import timeago from 'epoch-timeago';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {removeImage, setImages} from './DockerSlice';
import {Command} from "@tauri-apps/api/shell";

export const ImageView = ()=>{
  const images = useAppSelector(state=>state.dockerReducer.images)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(()=>getImages(),
      [])

  const getImages = ()=>{
    new Command('execute-directly-in-wsl',
      ["curl", "--unix-socket", "/var/run/docker.sock", "http://localhost/images/json?all=true"])
        .execute()
        .then(c=>{
          const res = JSON.parse(c.stdout as string) as ImageModel[]
          dispatch(setImages(res))
        })
  }

  const performPull = (id: string)=>{
    const foundImage = images.find(i=>i.Id.includes(id))
    if(foundImage) {
      const { imageTag, imageName } = determineImageProps(foundImage)
      new Command('unix-cmd',
        [`curl -X POST --unix-socket /var/run/docker.sock localhost/images/create?fromImage=${encodeURI(imageName)}:${imageTag}`,
          'alert-update']).execute()
    }
  }

  const performPush = (id: string)=>{
    const foundImage = images.find(i=>i.Id.includes(id))
    if(foundImage) {
      const { imageTag, imageName } = determineImageProps(foundImage)
      new Command("execute-in-wsl", [`curl -X POST --unix-socket /var/run/docker.sock localhost/images/create?fromImage=${encodeURI(imageName)}:${imageTag}`]).execute()
    }
  }


  const deleteImage = (id: string)=>{
    const foundImage = images.find(i=>i.Id.includes(id))
    if(foundImage) {
      let { imageTag, imageName } = determineImageProps(foundImage)
      imageTag = ':'+imageTag
      if (imageTag.includes('none')){
        imageTag = ''
        imageName=id
      }
      new Command("run-docker", ["docker","rmi",`${imageName+imageTag}`])
          .execute()
          .then(c=>{
            dispatch(removeImage(id))
          })
          .catch(i=>console.log(i))
    }
  }

  const determineImageProps=(i: ImageModel)=> {
    let imageName = '';
    let imageTag = '';
    let imageId = i.Id.substring(7, 19);
    if (i.RepoTags) {
      const imageNameAndTag = i.RepoTags[0].split(':');
      imageName = imageNameAndTag[0];
      imageTag = imageNameAndTag[1];
    } else {
      imageTag = '<none>';
    }

    if (i.RepoDigests) {
      imageName = i.RepoDigests[0].split('@')[0];
    }
    return { imageName, imageTag, imageId };
  }

  return     <div className="justify-content-center space-between align-items-center overflow-auto">
    <div className="w-75 mx-auto">
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
      {images && images.length>0&& images.map(i=>{
        let { imageName, imageTag, imageId } = determineImageProps(i);

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'20px'}} className="bg-dark">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>navigate('/docker/history', {state: { id:imageId}})}>Inspect</Dropdown.Item>
              <Dropdown.Item onClick={()=>performPull(imageId)} disabled={imageTag.includes('none')}>Pull</Dropdown.Item>
              <Dropdown.Item onClick={()=>performPush(imageId)} disabled={imageTag.includes('none')}>Push To Hub</Dropdown.Item>
              <Dropdown.Item onClick={()=>deleteImage(imageId)}>Remove</Dropdown.Item>
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
