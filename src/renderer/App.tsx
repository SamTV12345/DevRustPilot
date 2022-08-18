import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { BasicExample } from '../main/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Home } from '../main/Home';
import {WSL} from "./WSL";
import { Person } from './generate/Person';
import { SettingsMenu } from './Settings';
import { IDs } from './generate/IDs';

const Hello = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const isASCII = (string: string) => {
    return string.charCodeAt(0) < 127;
  };

  const convert = (stringToConvert: string) => {
    let resultingString = '';
    for (const stringToConvertItem of stringToConvert) {
      let curStringToAdd = ''
      if (isASCII(stringToConvertItem)) {
        resultingString += stringToConvertItem;
      } else {
        curStringToAdd += `${stringToConvertItem
          .charCodeAt(0)
          .toString(16)}`
        const charsToAdd = 4-curStringToAdd.length
        for (let i=0; i<charsToAdd;i++){
          curStringToAdd = "0"+curStringToAdd
        }
        resultingString += "\\u"+curStringToAdd
      }
    }
    setOutput(resultingString);
    // @ts-ignore
    window.electron.ipcRenderer.sendMessage('clipboard', resultingString);
  };

  return (
    <div className="h-75 d-flex justify-content-center align-items-center">
      <div className="h-50">
        <h1 className="card-title text-center mt-3">UTF-8 to UTF-16</h1>
        <input
          value={input}
          className="m-2 w-100"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="m-2 w-100" onClick={() => convert(input)}>
          Umwandeln
        </Button>
        <textarea className="m-2 w-100 h-50" disabled value={output} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <Router basename="/">
        <BasicExample/>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"}/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/utf16" element={<Hello />} />
            <Route path="/wsl" element={<WSL/>}/>
          <Route path="/generate/person" element={<Person/>}/>
          <Route path="/generate/ids" element={<IDs/>}/>
          <Route path="/settings" element={<SettingsMenu/>}/>
        </Routes>
      </Router>
    </>
  );
}
