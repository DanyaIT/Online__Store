import React, {useState} from 'react'
import { Container } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import BrandModal from '../../components/modals/BrandModal'
import TypeModal from '../../components/modals/TypeModal'
import DeviceModal from '../../components/modals/DeviceModal'

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  return (
    <Container className='d-flex flex-column justify-content-center mt-3'>
      <Button variant={'outline-dark'} className = 'mt-2'onClick = {()=> setTypeVisible(true)}>Добавить новый тип</Button>
      <Button variant={'outline-dark'} className = 'mt-2' onClick = {()=> setBrandVisible(true)}>Добавить Brand</Button>
      <Button variant={'outline-dark'} className = 'mt-2' onClick={()=> setDeviceVisible(true)}>Добавить новый девайс</Button>
      <BrandModal show = {brandVisible} onHide = {()=>setBrandVisible(false)}/>
      <TypeModal show = {typeVisible} onHide = {()=>setTypeVisible(false)}/>
      <DeviceModal show = {deviceVisible} onHide = {()=>setDeviceVisible(false)}/>
    </Container>
  )
}

export default Admin