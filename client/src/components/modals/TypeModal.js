import React, {useState} from 'react'
import { Form, FormControl, Modal, Button } from 'react-bootstrap'
import {createType} from '../../http/deviceApi'

const TypeModal = ({show,onHide}) => {

  const [value, setValue] = useState('');
  const addType = ()=>{
  createType({name:value}).then(data => setValue(''))
  onHide()
}
  return (
    <Modal
    show = {show}
    onHide = {onHide}
    size="lg"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Добавить тип
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <FormControl 
            value = {value}
            onChange = {e=> setValue(e.target.value)}
            placeholder='Введите type'/>
        </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant = 'outline-success' onClick={addType}>Добавить</Button>
    <Button variant = 'danger' onClick={onHide}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default TypeModal