import React, {useContext}from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import { Context } from '..';
import { authRoutes, publicRoutes } from '../roustes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const {user} = useContext(Context);
  return (
    <Routes>
        { user.isAuth && authRoutes.map((e)=>
            <Route key = {e.path} path = {e.path} element = {<e.element/>} exact/>
        )}
         { publicRoutes.map((e)=>
            <Route key = {e.path} path = {e.path} element = {<e.element/>} exact/>
        )}
        <Route exact path='*' element = {<Navigate to = {SHOP_ROUTE}/>}/>
    </Routes>
  )
}

export default AppRouter