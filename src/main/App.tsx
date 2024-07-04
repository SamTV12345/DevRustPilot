import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Header} from "../renderer/Header";
import {SideBar} from "../renderer/SideBar";
import {Home} from "./Home";
import {UTFConverter} from "../renderer/converter/UTFConverter";
import {WSL} from "../renderer/WSL";
import {Person} from "../renderer/generate/Person";
import {IDs} from "../renderer/generate/IDs";
import {SettingsMenu} from "../renderer/Settings";
import {JsonViewer} from "../renderer/jwt/JsonViewer";
import {ImageView} from "../renderer/docker/ImageView";
import {HistoryDocker} from "../renderer/docker/HistoryDocker";
import {NativeGUI} from "../renderer/linuxgui/NativeGUI";
import React from "react";
import {useAppSelector} from "../renderer/store/hooks";
import {Notes} from "../renderer/notes/Notes";
import {NoteSelector} from "../renderer/notes/NoteSelector";
import {Tags} from "../renderer/notes/Tags";
import {Links} from "../renderer/notes/Links";

export const App = ()=>{
    const sideBarCollapsed = useAppSelector(state=>state.commonReducer.sideBarCollapsed)

    return  <BrowserRouter basename="/">
        <div className="grid grid-rows-[auto_1fr] h-full md:grid-cols-[300px_1fr]">
            <Header/>
            <SideBar/>
            <div className={`col-span-6 md:col-span-5 ${sideBarCollapsed?'xs:col-span-5':'hidden'} md:block w-full overflow-x-auto`}>
                <Routes>
                    <Route path="/" element={<Navigate to={"/home"}/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/utf16" element={<UTFConverter />} />
                    <Route path="/wsl" element={<WSL/>}/>
                    <Route path="/generate/person" element={<Person/>}/>
                    <Route path="/generate/ids" element={<IDs/>}/>
                    <Route path="/settings" element={<SettingsMenu/>}/>
                    <Route path="/jwt" element={<JsonViewer/>}/>
                    <Route path="/docker/images" element={<ImageView/>}/>
                    <Route path="/docker/history" element={<HistoryDocker/>}/>
                    <Route path="/nativeui" element={<NativeGUI/>}/>
                    <Route path="/notes" element={<NoteSelector/>}/>
                    <Route path="/notes/notes" element={<Notes/>}/>
                    <Route path="/notes/links" element={<Links/>}/>
                    <Route path="/notes/tags" element={<Tags/>}/>
                </Routes>
            </div>
        </div>
    </BrowserRouter>
}
