import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BasicExample } from '../main/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from '../main/Home';
import { WSL } from "./WSL";
import { Person } from './generate/Person';
import { SettingsMenu } from './Settings';
import { IDs } from './generate/IDs';
import { UTFConverter } from './UTFConverter';


export default function App() {
  return (
    <>
      <Router basename="/">
        <BasicExample/>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"}/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/utf16" element={<UTFConverter />} />
            <Route path="/wsl" element={<WSL/>}/>
          <Route path="/generate/person" element={<Person/>}/>
          <Route path="/generate/ids" element={<IDs/>}/>
          <Route path="/settings" element={<SettingsMenu/>}/>
        </Routes>
      </Router>
    </>
  );
}
