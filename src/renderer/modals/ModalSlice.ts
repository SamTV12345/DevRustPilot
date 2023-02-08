import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type SimpleModalProps = {
    acceptText: string
    closeText: string
    show: boolean
    title: string
}

const initialState: SimpleModalProps = {
    acceptText: "",
    closeText: "",
    show: false,
    title: ""
}


export const ModalSlice = createSlice({
    initialState,
    name: 'modal',
    reducers: {
        setModal(state, action: PayloadAction<SimpleModalProps>) {
            state.show = action.payload.show
            state.title = action.payload.title
            state.acceptText = action.payload.acceptText
            state.closeText = action.payload.closeText
        },
        toggleModal(state, action:PayloadAction<boolean>) {
            state.show = action.payload
        }
    }
})

export const ModalActions = ModalSlice.actions
export const ModalReducer = ModalSlice.reducer
