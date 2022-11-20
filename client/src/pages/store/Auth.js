import React, {useState, useContext}from "react";
import { Container, Form, Card, Button} from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { login,registration } from "../../http/userApi";
import { observer } from "mobx-react-lite";
import {Context} from '../../index'


const Auth =  observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const {user} = useContext(Context);
  const navigate = useNavigate();

  const click = async ()=>{
    try{
      let data;
      if(isLogin){
        data = await login(email, password, role)

      } else {
        data = await registration(email, password, role)      
      }
      user.setUser(data);
      user.setUserId(data.id);
      user.setIsAuth(true)
      user.setIsRole(data.role)
      navigate(SHOP_ROUTE)

    }catch(e){
      alert(e.response.data.message)
    }
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 680 }} className="p-5">
        <h2 className="m-auto">{isLogin? "Авторизация": "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control value={email} onChange = {(e)=> setEmail(e.target.value)} className="mt-3" placeholder="Введите ваш email..." />
          <Form.Control value={password} onChange = {(e)=> setPassword(e.target.value)} className="mt-3" placeholder="Введите ваш пароль..." type = 'password' />
          <div className = "d-flex justify-content-between mt-3 pr-3 pl-3">
            {isLogin? <div> Нет аккаунта?
              <NavLink style={{paddingLeft:5}} to = {REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
            </div>
            :
            <div> Есть аккаунт?
              <NavLink style={{paddingLeft:5}} to = {LOGIN_ROUTE}>Войдите!</NavLink>
            </div>}
            <Button className="align-self-end" variant={"outline-success"} onClick = {click}>
              {isLogin?"Войти":"Зарегистрироваться"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
