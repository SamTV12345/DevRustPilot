import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ImageModel } from './ImageModel';

interface DockerProps {
  images: ImageModel[]
}

const initialState: DockerProps = {
  images:[]
}

const dockerSlice = createSlice({
  name:'dockerslice',
  initialState,
  reducers:{
    setImages: (state, action)=>{
      state.images = action.payload
    },
    removeImage: (state, action:PayloadAction<string>)=>{
      state.images = state.images.filter((image)=>!image.Id.includes(action.payload))
    }
  }
})

export const {setImages, removeImage} = dockerSlice.actions
export const dockerReducer = dockerSlice.reducer
