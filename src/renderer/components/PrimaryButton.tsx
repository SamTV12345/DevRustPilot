import {FC, ReactElement} from "react";

interface PrimaryButtonProps  {
    onClick: () => void,
    children:ReactElement|string
}


export const PrimaryButton:FC<PrimaryButtonProps> = ({onClick,children}) => {
    return (
        <button
        onClick={onClick}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded}`}
        >{children}</button>
    )
    }
