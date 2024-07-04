import {NotesModal} from "./NotesModal";
import {PrimaryButton} from "../components/PrimaryButton";
import {setModalOpen} from "../modals/ModalSlice";
import {Input} from "../components/Input";
import {useAppDispatch} from "../store/hooks";
import {useEffect, useState} from "react";
import {Tag} from "../models/Tag";
import {getTags} from "../constants/Database";
import {TagModal} from "./TagModal";

export const Tags = () => {
    const dispatch = useAppDispatch()
    const [tags, setTags] = useState<Tag[]>([])
    const [tagInput, setTagInput] = useState<string>('')

    useEffect(() => {
        getTags().then(t => {
            setTags(t as Tag[])
        })
    }, []);

    return (
        <div>
            <TagModal/>
            <h1 className="text-2xl text-center pt-2">Tags</h1>
            <div className="m-4">
                <PrimaryButton className="float-right mb-4" onClick={() => {
                    dispatch(setModalOpen(true))
                }}>+</PrimaryButton>
                <Input className='col-6 bg-red-500' value={tagInput}
                       onChange={(v) => setTagInput(v)}/>

                {
                    tags.map(n => {
                        return <div key={n.tag} className="bg-gray-200 p-2 m-2">
                            <h2>{n.tag}</h2>
                        </div>
                    })
                }
            </div>
        </div>
    );
}
