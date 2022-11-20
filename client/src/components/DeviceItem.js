import React  from "react";
import { Card, Col, Image,Button, Form } from "react-bootstrap";
import star from '../assets/star.png'
import { DEVICE_ROUTE, BASCET_ROUTE } from "../utils/consts";
import {useNavigate} from 'react-router-dom'

 

const DeviceItem = ({ device }) => {
  console.log(device.name)
    const navigate = useNavigate();
  return (
    <Col md={3} onClick = {()=> navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{width: 151, cursor: "pointer", marginTop:'10px'}} border={"light"}>
        <Image style = {{objectFit:'cover'}} width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
        <div className="text-black-50 d-flex justify-content-between align-items-center ">
          <div>{device.name}</div>
          <div style={{marginLeft:"50px"}}>{device.rating}</div>
          <Image width = {15} heigth = {15} src={star}/>
        </div>
        <div>{device.price}</div>
      </Card>
    </Col>
  
  );
};

export default DeviceItem;
