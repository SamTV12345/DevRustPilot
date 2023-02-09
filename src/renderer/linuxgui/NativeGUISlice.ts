import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppModalProps} from "../modals/ModalSlice";

type NativeGUIProps = {
    apps: AppModalProps[]
}


const initialState: NativeGUIProps = {
    apps: []
}

type AppStatusUpdate  = {
    id: string,
    status: boolean
}

const nativeGUISlice = createSlice({
    name: 'nativeGUI',
    initialState,
    reducers: {
       setApps: (state, action:PayloadAction<AppModalProps[]>) => {
            state.apps = action.payload
        },
        addApp: (state, action:PayloadAction<AppModalProps>) => {
            state.apps.push(action.payload)
        },
        setAppStatus: (state, action:PayloadAction<AppStatusUpdate>) => {
           state.apps = state.apps.map(app=>{
                if(app.id === action.payload.id){
                     app.status = action.payload.status
                }
                return app
           })
        },
        removeApp: (state, action:PayloadAction<string>) => {
            state.apps = state.apps.filter(app=>app.id !== action.payload)
        },
        updateApp: (state, action:PayloadAction<AppModalProps>) => {
            state.apps = state.apps.map(app=>{
                if(app.id === action.payload.id){
                    return action.payload
                }
                return app
            })
        }
}})

export const NativeGUIActions = nativeGUISlice.actions
export const NativeGUIReducer = nativeGUISlice.reducer
