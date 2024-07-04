import {Note} from "../models/Note";
import {Tag} from "../models/Tag";
import {LinkType} from "../notes/LinkType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface NotesSliceProps {
    notes: Note[]
    tags: Tag[]
    links: LinkType[]
}

const initialState: NotesSliceProps = {
   links: [],
    notes: [],
    tags: [],
}


export const noteSlice = createSlice({
    name: 'initialState',
    initialState,
    reducers: {
        setNotes: (state, action:PayloadAction<Note[]>) => {
            state.notes = action.payload
        },
        setTags: (state, action:PayloadAction<Tag[]>) => {
            state.tags = action.payload
        },
        setLinks: (state, action:PayloadAction<LinkType[]>) => {
            state.links = action.payload
        }
    }
})


export const noteReducer = noteSlice.reducer
export const {setNotes,setTags,setLinks} = noteSlice.actions
