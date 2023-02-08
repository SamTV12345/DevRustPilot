import { useAppDispatch, useAppSelector } from '../store/hooks';
import { modifyInput, modifyOutput } from './UTFConverterSlice';
import {clipboard} from "@tauri-apps/api";
import {Input} from "../components/Input";
import {PrimaryButton} from "../components/PrimaryButton";
import {CenteredBackground} from "../components/CenteredBackground";

export const UTFConverter = () => {
  const input = useAppSelector(state=>state.utfReducer.input)
  const output = useAppSelector(state=>state.utfReducer.output)
  const dispatch = useAppDispatch()

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
    dispatch(modifyOutput((resultingString)))
    clipboard.writeText(resultingString)
  };

  return (
      <CenteredBackground>
        <h1 className=" text-3xl text-white text-center">UTF-8 to UTF-16</h1>
        <Input  onChange={(e) => dispatch(modifyInput(e))} value={input}/>
        <PrimaryButton onClick={() => convert(input)}>
          Umwandeln
        </PrimaryButton>
        <textarea className="text-white" disabled value={output} />
      </CenteredBackground>
  )
}
