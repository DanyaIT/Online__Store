import React, {useContext, useEffect, useState} from "react";
import { Container, Col, Row,Form } from "react-bootstrap";
import TypeBar from "../../components/TypeBar";
import BrandBar from "../../components/BrandBar";
import DeviceList from "../../components/DeviceList";
import { observer } from "mobx-react-lite";
import {Context} from '../../index'
import { fetchBrand, fetchDevice, fetchType } from "../../http/deviceApi";
import Pages from '../../components/Pages'
import Select from '../../UI/select/Select'


const Shop = observer(() => {
  const {device} = useContext(Context);


  useEffect(()=>{
    fetchType().then(data => device.setType(data))
    fetchBrand().then(data=> device.setBrand(data))
    fetchDevice(null,null, 2,3).then(data=> 
    {device.setDevice(data.rows)
    device.setCount(data.count)
    })
  }, [])
  
  useEffect(()=>{
    fetchDevice (device.activeType.id, device.activeBrand.id, device.page, 4).then(data=> 
      {device.setDevice(data.rows)
      device.setCount(data.count)
      })
  }, [device.page,device.activeType, device.activeBrand])



  return (
    <Container>
      <Form className="mt-2 d-flex  ">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9} style={{ marginLeft: "20px" }}>
          <BrandBar/>
          <DeviceList/>
          <Pages/>
        </Col>
      </Form>
    </Container>
  );
});

export default Shop;
