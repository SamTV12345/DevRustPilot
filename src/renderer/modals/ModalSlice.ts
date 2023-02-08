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
    openAddModal: boolean,
}

// Define the initial state using that type
const initialState: ModalProps = {
    openModal: false,
    openAddModal: false,
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
        }
}})

export const {setModalOpen, setOpenAddModal} = modalSlice.actions

export const modalReducer = modalSlice.reducer
