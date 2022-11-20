
import React, { useContext, useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Modal,
  Button,
  Dropdown,
  Col,
  Row,
} from "react-bootstrap";

import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Context } from "../..";
import { createDevice, fetchBrand } from "../../http/deviceApi";
import { fetchType } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";

const DeviceModal = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo ] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [file, setFile] = useState(null);
  const [rating, setRating] = useState();
  const [count, setCount] = useState(1)

  useEffect(()=>{
    fetchType().then(data => device.setType(data))
    fetchBrand().then(data=> device.setBrand(data))
  }, [])

  const addFile = (e)=>{
    setFile(e.target.files[0])
  }

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number:Date.now()}]);

  };

  const removeInfo = (number)=>{
    setInfo(info.filter(i=> i.number !== number))
  }

  const changeInfo = (key, value, number)=>{
    setInfo(info.map(i=> i.number === number? {...i, [key]: value} : i))
  }
  
  const addDevice = ()=>{
    const formData = new FormData()
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('rating', `${rating}`)
    formData.append('img', file);
    formData.append('brandId', device.activeBrand.id)
    formData.append('typeId', device.activeType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data=>onHide())
  }



  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <DropdownToggle>{device.activeType.name || 'Выберите тип'}</DropdownToggle>
            <DropdownMenu>
              {device.types.map(type => 
                <DropdownItem
                onClick = {()=> device.setActiveType(type)}
                 key={type.id}>
                  {type.name}
                  </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <Dropdown className="mt-2">
            <DropdownToggle>{device.activeBrand.name || 'Выберите брэнд'}</DropdownToggle>
            <DropdownMenu>
              {device.brands.map(brand => 
                <DropdownItem 
                onClick = {()=> device.setActiveBrand(brand)}
                key={brand.id}>
                  {brand.name}
                  </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <FormControl
            onChange={e=>setName(e.target.value)}
            value={name}
            placeholder="Введите название продуктв"
            type="text"
            className="mt-3"
          />
          <FormControl
            value={price}
            onChange = {e => setPrice(Number(e.target.value))}
            placeholder="Введите стоимость"
            type="text"
            className="mt-3"
          />
          <FormControl
          value={rating}
          onChange = {e=> setRating(Number(e.target.value))}
          placeholder = 'Укажите рейтинг'
          type = 'text'
          className = 'mt-3'
          />
          <FormControl onChange = {addFile} type="file" className="mt-3" />
          <hr/>
          <Button onClick={addInfo}>Добавить новое свойство</Button>
          {info.map(i => 
            <Row key = {i.number} className="d-flex mt-3">
              <Col md={4}>
                <FormControl 
                value = {i.title}
                onChange = {(e) => changeInfo('title', e.target.value, i.number)}
                className="mt-2" 
                placeholder="Введите название" />
              </Col>
              <Col md={4}>
                <FormControl 
                valie = {i.description}
                onChange = {(e)=> changeInfo('description', e.target.value, i.number)}
                className="mt-2" 
                placeholder="Введите описание" />
              </Col>
              <Col  className="mt-2" md={4}>
                <Button variant="danger" onClick={()=>removeInfo(i.number)}>Удалить</Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeviceModal;
