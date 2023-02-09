import {FC, ReactElement} from "react";

interface PrimaryButtonProps  {
    onClick: () => void,
    children: any,
    className?:string
}


export const PrimaryButton:FC<PrimaryButtonProps> = ({onClick,children, className}) => {
    return (
        <button
        onClick={onClick}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `+className}
        >{children}</button>
    )
    }
