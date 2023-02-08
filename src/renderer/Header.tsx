import {useAppDispatch, useAppSelector} from "./store/hooks"
import {setSideBarCollapsed} from "./store/commonSlice";

import mainlogo from './img/tauri.svg'



export const Header = ()=>{
    const dispatch = useAppDispatch()
    const sideBarCollapsed = useAppSelector(state=>state.commonReducer.sideBarCollapsed)
    return (
        <div className="bg-neutral-900 w-full col-span-6 h-20 w-screen">
            <div className="flex items-center justify-between border-gray-100 py-6 md:justify-start md:space-x-10 col-span-6 w-screen h-20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                     onClick={()=>{dispatch(setSideBarCollapsed(!sideBarCollapsed))}}
                     className=" text-white  focus:animate-pulse p-4 h-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <img src={mainlogo} className="text-white p-4 h-20" alt="ElectronUtils logo"/>
                <div className="flex flex-grow">
                </div>
            </div>
        </div>
    )
}
