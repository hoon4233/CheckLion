import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logo from '../logo.png';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 400px;
`;

const Header = styled.div`
  padding-left: 45px;
  padding-top: 35px;
  padding-bottom: 30px;
`;

const Body = styled.div`
  height: 70%;
`;

const Logo = styled.img`
  display: inline-block;
  vertical-align: center;
  width: 180px;
  padding-left: 32.5px;
  padding-top: 3px;
`;

const Footer = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  background-color: #dedede;

`;

const ItemWrapper = styled.div`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const Button = styled.button`
  background-color: #ACACAC;
  font-size: 17px;
  padding: 12px;
  padding-left: 25px;
  padding-right: 25px;
  margin-top: 25px;
  border: none;
  border-radius: 18px;
  box-shadow: 0 6px 5px rgba(0, 0, 0, 0.16);
`;

const InputBox = styled.div`
  margin: 15px;
  &:hover{
    color: #ff9e1b;
  }
`;

function Login() {

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const data = {username: userid, password: password}
  const API = "http://localhost:8000";

  const idOnChange = (e) => {
    setUserid(e.target.value);
  }

  const passOnChange = (e) => {
    setPassword(e.target.value);
  }


  // 로그인 상태 유지할 때 쓰는 상수
  // const JWT_EXPIRY_TOKEN = 1 * 3600 * 1000;

  const onLogin = () => {
    fetch(API, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:8000",
        "Access-Control-Allow-Methods": "OPTIONS,POST"
    },
      body: JSON.stringify({
        username: userid,
        password: password
      }),
    })
      .then(response => response.json())
      .then(result => {
        if(result.Authorization){
          console.log(result.Authorization)
          localStorage.setItem("token", result.Authorization);
        }
        console.log(result.Authorization)
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    alert(token)
  }

  return (
    <Container>
      <Header>
        <Logo src={logo} alt='logo' />
      </Header>
      <Body>
        <ItemWrapper>
        <p style={{fontFamily: 'nexon-bold', fontSize: '30px', marginTop: '0px', marginBottom: '10px'}}>계정이 있으신가요?</p>
        <p style={{fontFamily: 'nexon-light', marginTop: '0px', marginBottom: '28px'}}>본인 계정으로 로그인해주세요</p>
        <form>
          <InputBox>
            <label style={{marginRight: '5px'}}>ID </label>
            <input style={{borderRadius: '5px'}} type="text" value={userid} onChange={ idOnChange } />
          </InputBox>
          <InputBox>
            <label style={{marginRight: '5px'}}>PW </label>
            <input style={{borderRadius: '5px'}} type="password" value={password} onChange={ passOnChange } />
          </InputBox>
            <br />
            <Button onClick={ onLogin } >
                입장하기
            </Button>
        </form>
        </ItemWrapper>
      </Body>
      <Footer></Footer>
    </Container>
  );
}

export default Login;
