import { Button, Modal } from "react-bootstrap"
import { FC } from 'react';

interface SimpleModal {
  title: string,
  closeText: string,
  acceptText: string,
  onAbort: () => void,
  onAccept: () => void,
  show: boolean,
  children?:any
}

export const SimpleModal:FC<SimpleModal> = ({onAbort,onAccept,title, closeText, acceptText,show,children})=>{
  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onAbort} variant={'secondary'}>{closeText}</Button>
        <Button variant="primary" onClick={onAccept}>{acceptText}</Button>
      </Modal.Footer>
    </Modal>
  )
}
