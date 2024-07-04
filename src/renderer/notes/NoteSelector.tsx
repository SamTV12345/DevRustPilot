import {useNavigate} from "react-router-dom";

export const NoteSelector = ()=>{
    const navigate = useNavigate();

    return <div className="grid place-items-center">
        <h1 className="text-2xl text-center pt-2">Notizenauswahl</h1>
        <div className="grid grid-cols-3 w-4/5 m-5 h-[80vh] gap-5">
            <button className="grid place-items-center h-full bg-gray-700 text-white rounded" onClick={() => {
                navigate("/notes/notes")
            }}><span>Notizen</span></button>
            <button className="grid place-items-center bg-gray-700 text-white  rounded" onClick={() => {
                navigate("/notes/links")
            }}><span>Links</span></button>
            <button className="grid place-items-center bg-gray-700 text-white  rounded" onClick={() => {
                navigate("/notes/tags")
            }}><span>Tags</span></button>
        </div>
    </div>
}
