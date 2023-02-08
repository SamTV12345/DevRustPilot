import {useNavigate} from "react-router-dom";
import {SideBarItem} from "./SideBarItem";
import {useAppSelector} from "./store/hooks";

export const SideBar  = ()=>{
  const sideBarCollapsed = useAppSelector(state=>state.commonReducer.sideBarCollapsed)


  return <aside className={`w-full h-full float-left ${sideBarCollapsed?'hidden': 'col-span-6 md:col-span-1'} z-10 w-full bg-gray-800 flex  border-none sticky`} aria-label="Sidebar">
  <div className="py-4 px-3 bg-gray-800 h-full w-full">
  <ul className="space-y-2">
    <SideBarItem highlightPath={'/home'} translationkey={"Homepage"} icon={<i className="fa-solid fa-house fa-xl"></i>}/>
    <SideBarItem highlightPath={'/utf16'} translationkey={"UTF8 To 16"} icon={<i className="fa-solid fa-user-tie fa-xl"></i>
    }/>
    <SideBarItem highlightPath={'/wsl'} translationkey={"WSL"} icon={<i className="fa-solid fa-user-tie fa-xl"></i>
    }/>
    <SideBarItem highlightPath={'/generate/person'} translationkey={"Personen"} icon={<i className="fa-solid fa-folder fa-xl"></i>}/>
    <SideBarItem highlightPath={'/generate/ids'} translationkey={"IDs"} icon={<i className="fa-solid fa-folder fa-xl"></i>}/>
    <SideBarItem highlightPath={'/jwt'} translationkey={"JWT"} icon={<i className="fa-solid fa-note-sticky fa-xl"></i>}/>
    <SideBarItem highlightPath={'/docker/images'} translationkey={"Images"} icon={<i className="fa-solid fa-note-sticky fa-xl"></i>}/>
    <SideBarItem highlightPath={'/docker/containers'} translationkey={"Containers"} icon={<i className="fa-solid fa-note-sticky fa-xl"></i>}/>
    <SideBarItem highlightPath={'/nativeui'} translationkey={"Linux GUI"} icon={<i className="fa-solid fa-note-sticky fa-xl"></i>}/>
    <SideBarItem highlightPath={'/settings'} translationkey={"Einstellungen"} icon={<i className="fa-solid fa-note-sticky fa-xl"></i>}/>

  </ul>
  </div>
  </aside>
}
