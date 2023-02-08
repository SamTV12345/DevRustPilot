import {useNavigate} from "react-router-dom";
import {FC} from "react";
import * as path from "path";

type SideBarItemProps = {
    highlightPath:string,
    translationkey: string,
    icon:React.ReactElement
}

export const SideBarItem:FC<SideBarItemProps>  =({highlightPath,translationkey,icon})=>{
    const navigate = useNavigate()

    const highlightIfSelected = (path:string)=>{
        if(window.location.href.includes(path)){
            return 'bg-gray-700'
        }
        return ''
    }
    return   <li>
        <a onClick={()=>navigate(highlightPath)
        }
           className={`flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 h-20 ${highlightIfSelected(highlightPath)}`}>
            {icon}
            <span className="ml-3">{translationkey}</span>
        </a>
    </li>
}
