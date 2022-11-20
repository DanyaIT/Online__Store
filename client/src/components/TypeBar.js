import React, { useContext } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { observer } from 'mobx-react-lite';
import { Context } from '..';



const TypeBar = observer(() => {
    const {device} = useContext(Context);
  return (
    <ListGroup >
        {device.types.map(type=>
            <ListGroup.Item
            style = {{cursor:'pointer'}} 
            key = {type.id}
            active = {type.id === device.activeType.id}
            onClick = {()=> device.setActiveType(type)}
            >
                {type.name}
            </ListGroup.Item>
            )}
    </ListGroup>

  )
})

export default TypeBar