import {FC, HTMLInputTypeAttribute} from "react";

type FormInputProps = {
    value?: string|number|undefined,
    onChange?: (e:any)=>void,
    className?: string,
    type?: HTMLInputTypeAttribute
    disabled?: boolean,
    accept?: string,
    ref?:any
    name?: string,
    id?: string,
    register?: any,
    errors?: any,
    required?: boolean,
    validationSchema?: any,
}




export const Input: FC<FormInputProps> = ({value,ref,
                                              onChange, className
                                              ,name, id
                                              , type, disabled, required, validationSchema,errors,accept}) => {

    return   value?   <input value={value} disabled={disabled} type={type} name={name} id={id}
                       className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  disabled:bg-slate-600" + className}
                       onChange={(v)=> onChange ? onChange(v.target.value) :()=>{}}/>
        :<input disabled={disabled} type={type} name={name} id={id} {...{required: required, ...validationSchema}}
                className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  disabled:bg-slate-600" + className}
                onChange={(v)=> onChange ? onChange(v.target.value) :()=>{}}/>
}
