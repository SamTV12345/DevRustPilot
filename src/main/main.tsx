import React from 'react'
import ReactDOM from 'react-dom/client'
import {Home} from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import {NavBar} from "./NavBar";
import {Provider} from "react-redux";
import {SettingsMenu, SettingsSchema} from "../renderer/Settings";
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import {Alert} from "../renderer/alerts/Alert";
import {store} from "../renderer/store/store";
import {UTFConverter} from "../renderer/converter/UTFConverter";
import {WSL} from "../renderer/WSL";
import {Person} from "../renderer/generate/Person";
import {IDs} from "../renderer/generate/IDs";
import {JsonViewer} from "../renderer/jwt/JsonViewer";
import {ImageView} from "../renderer/docker/ImageView";
import {HistoryDocker} from "../renderer/docker/HistoryDocker";
import {NativeGUI} from "../renderer/linuxgui/NativeGUI";
import "./main.css"
import {AppModal} from "../renderer/modals/AppModal";
import Database from "tauri-plugin-sql-api";




ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Alert/>
            <BrowserRouter basename="/">
                <NavBar/>
                <AppModal/>
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
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
