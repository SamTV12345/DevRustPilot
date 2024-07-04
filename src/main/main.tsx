import React from 'react'
import ReactDOM from 'react-dom/client'
import {Home} from './Home'
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
import {SideBar} from "../renderer/SideBar";
import {Header} from "../renderer/Header";
import {App} from "./App";
import {AddGUIModal} from "../renderer/modals/AddGUIModal";
import {UpdateGUIModal} from "../renderer/modals/UpdateGUIModal";
import {SnackbarProvider} from "notistack";




ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider maxSnack={4} >
                <Alert/>
                <App/>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
