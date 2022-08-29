import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UTFConverterState {
  input: string,
  output: string,
}

// Define the initial state using that type
const initialState: UTFConverterState = {
  output: '',
  input: ''
}

export const utfConverterSlice = createSlice({
  name: 'jwt',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    modifyInput: (state, action)=>{
      state.input = action.payload
    },
    modifyOutput: (state, action)=>{
      state.output = action.payload
    }
  },
})

export const { modifyInput, modifyOutput} = utfConverterSlice.actions

export const utfReducer = utfConverterSlice.reducer
