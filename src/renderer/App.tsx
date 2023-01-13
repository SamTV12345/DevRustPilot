import {MemoryRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {NavBar} from '../main/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from '../main/Home';
import {WSL} from "./WSL";
import {Person} from './generate/Person';
import {SettingsMenu} from './Settings';
import {IDs} from './generate/IDs';
import {JsonViewer} from './jwt/JsonViewer';
import {Alert} from './alerts/Alert';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {UTFConverter} from './converter/UTFConverter';
import {ImageView} from './docker/ImageView';
import {HistoryDocker} from './docker/HistoryDocker';

export default function App() {
    return (
        <Provider store={store}>
            <Alert/>
            <Router basename="/">
                <NavBar/>
                    <Routes>
                        <Route path="/" element={<Navigate to={"/home"}/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/utf16" element={<UTFConverter/>}/>
                        <Route path="/wsl" element={<WSL/>}/>
                        <Route path="/generate/person" element={<Person/>}/>
                        <Route path="/generate/ids" element={<IDs/>}/>
                        <Route path="/settings" element={<SettingsMenu/>}/>
                        <Route path="/jwt" element={<JsonViewer/>}/>
                        <Route path="/docker/images" element={<ImageView/>}/>
                        <Route path="/docker/history" element={<HistoryDocker/>}/>
                    </Routes>
            </Router>
        </Provider>
    );
}
