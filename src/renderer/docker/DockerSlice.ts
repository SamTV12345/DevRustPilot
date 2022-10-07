import { createSlice } from '@reduxjs/toolkit';
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
    }
  }
})

export const {setImages} = dockerSlice.actions
export const dockerReducer = dockerSlice.reducer
