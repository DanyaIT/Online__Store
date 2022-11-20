import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { Row, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import DeviceItem from "../components/DeviceItem";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  const [price, setPrice] = useState([]);
  const [value, setValue] = useState("");

  let sortDevice = [...device.devices].filter((item) =>item.name.toLowerCase().includes(value.toLowerCase()));
  let filterPrice = [...sortDevice].sort((a,b)=> price ==='Top'? a.price - b.price: price ==='Bottom'? b.price - a.price :'')


  return (
    <div>
      <input
        style={{
          marginTop: "5px",
          padding: "5px",
          maxWidth: "700px",
          width: "100%",
          borderRadius: "16px",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите название"
      />
      <div>
        <select onChange={(e)=> setPrice(e.target.value)}  class="form-select" aria-label="Default select example" style={{marginTop:'10px', maxWidth:'300px'}}>
          <option disabled selected>Сортировка по цене</option>
          <option value="Bottom">По убыванию</option>
          <option value="Top">По возрастанию</option>
        </select>
      </div>
      <Form className="d-flex">
        {filterPrice.map((device) => (
          <DeviceItem key={device.id} device={device} />
        ))}
      </Form>
    </div>
  );
});

export default DeviceList;
