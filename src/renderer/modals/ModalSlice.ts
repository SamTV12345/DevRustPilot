import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface AppModalProps {
    id: string
    app: string,
    path: string,
    icon: string,
    status: boolean //true = running, false = stopped
}

// Define a type for the slice state
interface ModalProps {
    openModal:boolean,
    openUpdateModal: boolean,
    openAddModal: boolean,
    appToUpdate: undefined|AppModalProps
}

// Define the initial state using that type
const initialState: ModalProps = {
    openModal: false,
    openUpdateModal: false,
    openAddModal: false,
    appToUpdate: undefined
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        setModalOpen: (state, action)=>{
            state.openModal = action.payload
        },
        setOpenAddModal: (state, action)=>{
            state.openAddModal = action.payload
        },
        setAppToUpdate: (state, action:PayloadAction<AppModalProps>)=>{
            state.appToUpdate = action.payload
        },
        setAppToUpdateModal: (state, action:PayloadAction<boolean>)=>{
            state.openUpdateModal = action.payload
        }
}})

export const {setModalOpen, setOpenAddModal, setAppToUpdateModal, setAppToUpdate} = modalSlice.actions

export const modalReducer = modalSlice.reducer
