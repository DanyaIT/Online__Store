import React, {useEffect, useState, useContext} from 'react'
import { Container,Col,Image,Row,Card,Button,Form} from 'react-bootstrap'
import bigStar from '../../assets/bigStar.png'
import {useParams, useNavigate} from 'react-router-dom';
import {fetchOneDevice,createBasket} from '../../http/deviceApi'
import { BASKET_ROUTE } from '../../utils/consts';
import {Context} from "../../index"

const DevicePage = () => {
  const {user} = useContext(Context);
 
  const [devices, setDevice] = useState({info:[]});
  const {id} = useParams();
  useEffect(()=>{
    fetchOneDevice(id).then(data => setDevice(data))
  
  }, [])
  const navigate = useNavigate();

  const click = ()=>{
    // createBasket({basketId: user.users, deviceId: devices.id, count:1})
    localStorage.setItem('products', devices.id)
    alert('Товар успешно добавлен')
  }

  return (
    <Container className='mt-3'>
      <Row>
      <Col  md = {4}>
        <Image  style = {{objectFit:'cover'}} width={300} height= {300} src = {process.env.REACT_APP_API_URL + devices.img}/>
      </Col>
      <Col md = {4}>
        <Form className = 'd-flex flex-column align-items-center'>
          <h2>{devices.name}</h2>
          <Row 
          className='d-flex align-items-center justify-content-center'
          style={{background:`url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover'}}>
            {devices.rating}
          </Row>
        </Form>
      </Col>
      <Col md = {4}>
        <Card className = 'd-flex flex-column align-items-center justify-content-around'
        style={{width:400, height:300, border:'5px solid light', fontSize:32}}
        >
            <h3>{devices.price} руб.</h3>
            <Button
            variant = {'outline-dark'}
            onClick = {click}
            >Добавить в корзину</Button>
        </Card>
      </Col>
      </Row>
      <Row className='d-flex flex-column mt-3'>
        <h1 style = {{margin:0, padding:'0 0 10px'}}>Характеристики</h1>
        {devices.info.map((info ,index)=>
          <Row 
          style = {{background: index %2 === 0?'lightgray':'tranporent', padding:10}}
          key = {info.id}>
          {info.title}:{info.description}
          </Row>
          )}
      </Row>
    </Container>
  )
}

export default DevicePage