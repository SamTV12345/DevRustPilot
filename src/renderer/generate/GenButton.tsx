import { Button } from 'react-bootstrap';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { FC } from 'react';

interface GenButtonProps {
  func: ()=>void,
  classNames: string
}

export const GenButton: FC<GenButtonProps>  = ({func, classNames})=>
  <Button className={classNames} onClick={func}>
    <ArrowClockwise/>
</Button>
