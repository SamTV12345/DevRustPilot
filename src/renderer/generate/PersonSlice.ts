import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UTFConverterState {
  firstname: string,
  lastname: string,
  email: string,
  emailPrefix: string,
  emailSuffix: string
}

// Define the initial state using that type
const initialState: UTFConverterState = {
  email: '',
  emailPrefix: '',
  emailSuffix: '',
  lastname: '',
  firstname: '',
}

export const personSlice = createSlice({
  name: 'personSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    modifyFirstname: (state, action)=>{
      state.firstname = action.payload
    },
    modifyLastname: (state, action)=>{
      state.lastname = action.payload
    },
    modifyEmail: (state, action)=>{
      state.email = action.payload
    },
    modifyEmailPrefix: (state, action)=>{
      state.emailPrefix = action.payload
    },
    modifyEmailSuffix: (state, action)=>{
      state.emailSuffix = action.payload
    }
  },
})

export const { modifyFirstname,modifyEmail,modifyEmailSuffix,modifyEmailPrefix,modifyLastname} = personSlice.actions

export const personReducer = personSlice.reducer
