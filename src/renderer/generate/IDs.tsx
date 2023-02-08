import { GenButton } from './GenButton';
import { Clipboard } from './Clipboard';
import { useState } from 'react';
import { AES, MD5, SHA256, SHA512 } from 'jscrypto';
import { CenteredBackground } from '../components/CenteredBackground';
import { Input } from '../components/Input';

export const IDs = ()=>{
  const [generatedInteger, setGeneratedInteger] = useState<number>()
  const [generatedIntegerPositive, setPositiveIntegerPositive] = useState<number>()
  const [generatedUUID, setGeneratedUUID] = useState<string>()

  const [stringToConvertToSha256, setStringToConvertToSha256] = useState<string>()
  const [sha256Hash, setSha256Hash] = useState<string>()

  const [stringToConvertToMD5, setStringToConvertToMD5] = useState<string>()
  const [md5, setMD5] = useState<string>()

  const [stringToConvertToSha512, setStringToConvertToSha512] = useState<string>()
  const [sha512Hash, setSha512Hash] = useState<string>()

  const [stringToConvertToAES, setStringToConvertToAES] = useState<string>()
  const [aesHash, setAESHash] = useState<string>()
  const [keyToConvertToAES, setKeyToConvertToAES] = useState<string>()

  const getRndInteger = (min: number, max:number)=> {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const generateUUID = ()=>{
      return crypto.randomUUID()
  }

  const generateSha256 = ()=>{
      if(stringToConvertToSha256 === undefined){
        return "empty"
      }
    return SHA256.hash(stringToConvertToSha256).toString()
  }

  const generateMD5 = ()=>{
    if(stringToConvertToMD5 === undefined){
      return "empty"
    }
    return MD5.hash(stringToConvertToMD5).toString()
  }

  const generateSha512 = ()=>{
    if(stringToConvertToSha512 === undefined){
      return "empty"
    }
    return SHA512.hash(stringToConvertToSha512).toString()
  }

  const generateAES = ()=>{
    if(stringToConvertToAES === undefined || keyToConvertToAES === undefined){
      return "empty"
    }
    return AES.encrypt(stringToConvertToAES, keyToConvertToAES).toString()
  }

  return <CenteredBackground>
    <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
      <div>
        Integer
      </div>
      <Input disabled={true} value={generatedInteger} />
      <div>
        <GenButton func={() => setGeneratedInteger(getRndInteger(-2147483648,2147483647))} classNames={'col-1 ms-2'} />
        <Clipboard thingToClip={generatedInteger? generatedInteger.toString():"0"} classNames={'col-1 ms-2'} />
      </div>
      <div>
        Positive Integer
      </div>
      <Input disabled={true} value={generatedIntegerPositive} />
      <div>
        <GenButton func={() => setPositiveIntegerPositive(getRndInteger(0,2147483647))} classNames={'col-1 ms-2'} />
        <Clipboard thingToClip={generatedIntegerPositive? generatedIntegerPositive.toString():"0"} classNames={'col-1 ms-2'} />
      </div>
      <div>
        UUID
      </div>
      <Input disabled={true} value={generatedUUID} />
      <div>
        <GenButton func={() => setGeneratedUUID(generateUUID())} classNames={'col-1 ms-2'} />
        <Clipboard thingToClip={generatedUUID? generatedUUID:""} classNames={'col-1 ms-2'} />
      </div>
      <div>
        SHA256
      </div>
      <Input value={stringToConvertToSha256} onChange={(v)=>setStringToConvertToSha256(v)}/>
      <div>
        <GenButton func={() => setSha256Hash(generateSha256())} classNames={'col-1 ms-2'} />
        <Clipboard thingToClip={sha256Hash? sha256Hash:""} classNames={'col-1 ms-2'} />
      </div>
      <div>
        MD5
      </div>
      <Input value={stringToConvertToMD5} onChange={(v)=>setStringToConvertToMD5(v)}/>
      <div>
        <GenButton func={() => setMD5(generateMD5())} classNames={'col-1 ms-2'} />
        <Clipboard thingToClip={md5? md5:""} classNames={'col-1 ms-2'} />
      </div>

      <div>
        SHA512
      </div>
      <Input value={stringToConvertToSha512} onChange={(v)=>setStringToConvertToSha512(v)}/>
      <div>
      <GenButton func={() => setSha512Hash(generateSha512())} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={sha512Hash? sha512Hash:""} classNames={'col-1 ms-2'} />
      </div>

      <div className="grid col-span-3 grid-cols-[1fr_1fr_1fr_auto] gap-3">
      <div>
        AES
      </div>
      <Input value={stringToConvertToAES} onChange={(v)=>setStringToConvertToAES(v)}/>
      <Input value={keyToConvertToAES} onChange={(v)=>setKeyToConvertToAES(v)}/>
      <div>
      <GenButton func={() => setAESHash(generateAES())} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={aesHash? aesHash:""} classNames={'col-1 ms-2'} />
      </div>
      </div>
    </div>
  </CenteredBackground>
}
