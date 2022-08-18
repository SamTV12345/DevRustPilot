import { useState } from 'react';
import { Button } from 'react-bootstrap';

export const UTFConverter = () => {
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
