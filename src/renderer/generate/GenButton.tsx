import { ArrowClockwise } from 'react-bootstrap-icons';
import { FC } from 'react';
import {PrimaryButton} from "../components/PrimaryButton";

interface GenButtonProps {
  func: ()=>void,
  className: string
}

export const GenButton: FC<GenButtonProps>  = ({func, className})=>
  <PrimaryButton onClick={func} className={"w-full"}>
    <ArrowClockwise/>
</PrimaryButton>
