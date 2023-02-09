import {FC} from "react";

type CenteredBackgroundProps = {
    children: React.ReactNode,
    className?: string
}

export const CenteredBackground: FC<CenteredBackgroundProps> = ({children, className}) => {
    return <div className="grid place-items-center h-full bg-gray-700 md:bg-white">
        <div className={"bg-gray-700 p-12 md:rounded-2xl grid gap-4 w-full md:w-auto text-white  md:w-3/5 "+className}>
            {children}
        </div>
    </div>
}
