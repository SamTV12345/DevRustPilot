import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CommonProps {
    sideBarCollapsed: boolean,
}

const initialState: CommonProps = {
    sideBarCollapsed: false,
}


export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {
        setSideBarCollapsed: (state, action:PayloadAction<boolean>) => {
            state.sideBarCollapsed = action.payload
        }
    }
})

export const commonReducer = commonSlice.reducer
export const {setSideBarCollapsed} = commonSlice.actions
