import { GenButton } from './GenButton';
import { Clipboard } from './Clipboard';
import { useState } from 'react';
import { AES, MD5, SHA256, SHA512 } from 'jscrypto';

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

  return <div className="h-75 d-flex justify-content-center align-items-center"><div className='container p-4'>
    <div className='row mb-3'>
      <div className='col-2'>
        Integer
      </div>
      <input className='col-7' disabled={true} value={generatedInteger} />
      <GenButton func={() => setGeneratedInteger(getRndInteger(-2147483648,2147483647))} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={generatedInteger? generatedInteger.toString():"0"} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
      <div className='col-2'>
        Positive Integer
      </div>
      <input className='col-7' disabled={true} value={generatedIntegerPositive} />
      <GenButton func={() => setPositiveIntegerPositive(getRndInteger(0,2147483647))} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={generatedIntegerPositive? generatedIntegerPositive.toString():"0"} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
      <div className='col-2'>
        UUID
      </div>
      <input className='col-7' disabled={true} value={generatedUUID} />
      <GenButton func={() => setGeneratedUUID(generateUUID())} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={generatedUUID? generatedUUID:""} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
      <div className='col-2'>
        SHA256
      </div>
      <input className='col-7' value={stringToConvertToSha256} onChange={(v)=>setStringToConvertToSha256(v.currentTarget.value)}/>
      <GenButton func={() => setSha256Hash(generateSha256())} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={sha256Hash? sha256Hash:""} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
      <div className='col-2'>
        MD5
      </div>
      <input className='col-7' value={stringToConvertToMD5} onChange={(v)=>setStringToConvertToMD5(v.currentTarget.value)}/>
      <GenButton func={() => setMD5(generateMD5())} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={md5? md5:""} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
      <div className='col-2'>
        SHA512
      </div>
      <input className='col-7' value={stringToConvertToSha512} onChange={(v)=>setStringToConvertToSha512(v.currentTarget.value)}/>
      <GenButton func={() => setSha512Hash(generateSha512())} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={sha512Hash? sha512Hash:""} classNames={'col-1 ms-2'} />
    </div>
    <div className='row mb-3'>
      <div className='col-2'>
        AES
      </div>
      <input className='col-3' value={stringToConvertToAES} onChange={(v)=>setStringToConvertToAES(v.currentTarget.value)}/>
      <div className='col-1'/>
      <input className='col-3' value={keyToConvertToAES} onChange={(v)=>setKeyToConvertToAES(v.currentTarget.value)}/>
      <GenButton func={() => setAESHash(generateAES())} classNames={'col-1 ms-2'} />
      <Clipboard thingToClip={aesHash? aesHash:""} classNames={'col-1 ms-2'} />
    </div>
    </div>
  </div>
}
