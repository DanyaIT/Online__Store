import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { Card, Col, Image, Row, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneDevice,fetchDevice, fetchBasket, fetchDeviceBasket } from "../../http/deviceApi";
import { Context } from "../..";
import star from '../../assets/star.png'


const Basket = () => {
const [basket, setBasket] = useState([]);
const [device, setDevice] = useState([]);
const {user} = useContext(Context)
const [total, setTotal] = useState({})


const deviceIdBascet = basket.map(a=> a.deviceId)

let deviceId = localStorage.getItem('productc')
console.log(deviceId)

console.log(basket)
console.log(deviceIdBascet)
console.log(user.users)
console.log(device)
useEffect(() => {
  fetchBasket().then(data=> setBasket(data.filter(item=> item.basketId == user.users)))
  fetchDeviceBasket({deviceId:112}).then(data => setDevice(data))
  summProduct()
},[])


useEffect(() => {
  summProduct()
},[device])

  const deleteItem = (id)=>{
    setDevice([...device].filter((cart)=> cart.id !== id))
  }



const summProduct = ()=>{
  const countProduct = {
    totalCount : [...device].reduce((prev, curr)=>{return prev + curr.count},0),
  }
  setTotal(countProduct)
}




  const plusNumber = (id)=>{
    setDevice((device)=>{
      return device.map(product=>{
        if(product.id === id){
          return {
            ...product,
            count: product.count +1
          }
        }
        return product
      })
    })
  }
  
  const minusNumber = (id)=>{
    setDevice((device)=>{
      return device.map((product)=>{
        if(product.id == id){
          return{
            ...product,
            count: product.count <= 0? 0: product.count-1
          }
        }
        return product
      })
    })
  }

  let sums = 0;
  return (
   <Container>
    <h1 className="mt-2">Корзина продуктов</h1>
    <div style={{display:'flex', flexDirection:'column', maxWidth:'1100px'}}>
      {device.map(item=>
        <Row key = {item.id}className="mt-5 align-items-center border border-dark border rounded-5 p-2 bg-light">
          <Col md = {3}>
            <div className="d-flex align-items-center">
            <img style={{objectFit:'cover', borderRadius:'30%'}} width = {150} height = {150} src = {process.env.REACT_APP_API_URL + item.img}/>
            <div style={{marginLeft:'10px'}}>
            <h3>{item.name}</h3>
            <h4>{item.rating}</h4>
            </div>
            </div>
          </Col>
          <Col md = {3} className = 'd-flex justify-content-center'>
            <Button  onClick={()=>minusNumber(item.id)}>-</Button>
            <div style={{alignItems:'center', display:'flex', margin:'0px 5px 0px', fontSize:'20px'}}>{item.count}</div>
            <Button onClick={()=>plusNumber(item.id)}>+</Button>
          </Col>
          
          <Col style={{display:'none'}}> 
            Стоимость: {sums += item.price * item.count} руб.
          </Col>
          <Col md = {3} className = 'd-flex justify-content-center' style={{fontSize:'20px', fontWeight:500}}>
            Стоимость: {item.price * item.count} руб.
          </Col>
          <Col md = {3} style = {{display:'flex', justifyContent:'flex-end', alignItems:'flex-end', height:'130px' }}>
            <Button 
            onClick={()=> deleteItem(item.id)}
            className = 'btn btn-danger'>
              Удалить
            </Button>
          </Col>
        </Row>
        )}
        <div style={{display:'flex', flexDirection:'column', alignContent:'flex-end', 
        border:'1px solid black', maxWidth:'250px', marginTop:'10px', borderRadius: '16px', padding:'5px', backgroundColor: '#007bff', color:'white', fontWeight:500, fontSize:'20px'}}>
        {[total].map(item=>
          <div>Общее количество: {item.totalCount} ед.</div>
          )}
        <div>Итого: {sums} руб.</div>
        </div>
    </div>
    
   </Container>

  ) 
}
export default Basket;
