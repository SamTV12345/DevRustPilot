import { createSlice } from '@reduxjs/toolkit'
import {JSONWebToken} from "../models/JSONWebToken";

// Define a type for the slice state
interface JWTState {
  rawJWT: string,
  decodedJWT: string,
  algJWT:string,
  parsedToken: JSONWebToken|undefined
}

// Define the initial state using that type
const initialState: JWTState = {
  rawJWT: '',
  algJWT: '',
  decodedJWT: '',
  parsedToken: undefined
}

export const jwtSlice = createSlice({
  name: 'jwt',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    modifyRawJWT: (state, action) => {
      state.rawJWT = action.payload
    },
    modifyAlgJWT: (state, action) => {
      state.algJWT = action.payload
    },
    modifyDecodedJWT: (state, action) => {
      state.decodedJWT = action.payload
    },
    modifyParsedToken: (state, action) => {
      state.parsedToken = action.payload
    }
  }
})

export const { modifyRawJWT,modifyDecodedJWT,modifyAlgJWT, modifyParsedToken} = jwtSlice.actions

export const jwtReducer = jwtSlice.reducer
