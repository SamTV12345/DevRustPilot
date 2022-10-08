import { createSlice } from '@reduxjs/toolkit';

interface AlertProps {
  type: 'info'| 'error'| 'success',
  show: boolean,
  message: string
}

const initialState: AlertProps = {
  show: false,
  type: 'info',
  message: ''
}


export const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers:{
    setShowAlert:(state, action)=>{
      state.show = action.payload
    },
    setType: (state, action)=>{
      state.type = action.payload
    },
    setMessage: (state, action)=>{
      state.message = action.payload
    }
  }
})


export const {setShowAlert,setType, setMessage} = alertSlice.actions

export const alertReducer = alertSlice.reducer
