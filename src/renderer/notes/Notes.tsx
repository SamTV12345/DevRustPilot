import { useEffect, useState } from "react"
import { Input } from "../components/Input"
import { getNotes } from "../constants/Database"
import { PrimaryButton } from "../components/PrimaryButton"
import { useAppDispatch } from "../store/hooks"
import { setModalOpen } from "../modals/ModalSlice"
import { NotesModal } from "./NotesModal"
import { Note } from "../models/Note"

export const Notes = () => {
    const [inputForNoteSearch, setInputForNoteSearch] = useState<string>('')
    const [notes, setNotes] = useState<Note[]>([])
    const dispatch = useAppDispatch()

    useEffect(()=>{
        getNotes().then(n=>{
            setNotes(n)
        })
    
    }, [])

    useEffect
    (() => {
        console.log('inputForNoteSearch', inputForNoteSearch)
    }, [inputForNoteSearch])


    return <div>
        <NotesModal/>
        <h1 className="text-2xl text-center pt-2">Notes</h1>
        <div className="m-4">
        <PrimaryButton className="float-right mb-4" onClick={()=>{
                dispatch(setModalOpen(true))
            }}>+</PrimaryButton>
        <Input className='col-6 bg-red-500' value={inputForNoteSearch} onChange={(v) => setInputForNoteSearch(v)} />

        {
            notes.map(n=>{
                return <div key={n.id} className="bg-gray-200 p-2 m-2">
                    <h2>{n.title}</h2>
                    <p>{n.description}</p>
                </div>
            })
        }
        </div>
    </div>
}