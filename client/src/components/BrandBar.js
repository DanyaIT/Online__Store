import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import {Card,Form} from 'react-bootstrap'

const BrandBar = observer(() => {
    const {device} = useContext(Context)
   

  return (
        <div className='d-flex'>
            {device.brands.map(brand =>
               <Card
               style = {{cursor:'pointer'}} 
               border = {brand.id === device.activeBrand.id ? 'danger': 'light'}
               onClick = {() => device.setActiveBrand(brand)}
               className = 'p-2'
               key = {brand.id}>
                {brand.name}
               </Card> 
        )}
        </div>
  )
})

export default BrandBar