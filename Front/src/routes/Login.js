import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.png';
import {logInApi} from "../apis/AuthApi";
import {CircularProgress} from "@material-ui/core";

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

  &:hover {
    color: #ff9e1b;
  }
`;

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogIn, setIsLogIn] = useState(null);
    const history = useHistory();

    const idOnChange = (e) => {
        setEmail(e.target.value);
    }

    const passOnChange = (e) => {
        setPassword(e.target.value);
    }


    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        await logInApi.logIn(email, password).then((res) => {
            localStorage.setItem('checkLionAuth', res.data.key);
            setLoading(false);
            alert('로그인 완료!');
          props.history.goBack();


        }).catch(e => {
            setError(e.response);
            setLoading(false);
        })

    }


    const checkToken = () => {
        if (!localStorage.getItem("checkLionAuth")) {
            setIsLogIn(false)
        } else {
            setIsLogIn(true);
        }
    }

    useEffect(() => {
        checkToken();
    }, []);


    if (isLogIn) return null;
    return (
        <Container>
            <Header>
                <Logo src={logo} alt='logo'/>
            </Header>
            <Body>
                <ItemWrapper>
                    <p style={{fontFamily: 'nexon-bold', fontSize: '30px', marginTop: '0px', marginBottom: '10px'}}>계정이
                        있으신가요?</p>
                    <p style={{fontFamily: 'nexon-light', marginTop: '0px', marginBottom: '28px'}}>본인 계정으로 로그인해주세요</p>

                    <form>
                        <InputBox>
                            <label style={{marginRight: '5px'}}>E-Mail </label>
                            <input style={{borderRadius: '5px'}} type="text" value={email} onChange={idOnChange}/>
                        </InputBox>
                        <InputBox>
                            <label style={{marginRight: '5px'}}>PW </label>
                            <input style={{borderRadius: '5px'}} type="password" value={password}
                                   onChange={passOnChange}/>
                        </InputBox>
                        {error && error.status === 400 && (<p style={{
                            fontFamily: 'nexon-light',
                            marginTop: '0px',
                            marginBottom: '28px',
                            color: 'orangered',
                            fontWeight: 'bold'
                        }}>이메일 혹은 비밀번호를 확인해주세요.</p>)}
                        <br/>

                        {loading === true ? (<CircularProgress/>) :
                            (
                                <Button onClick={onLogin}>
                                    입장하기
                                </Button>
                            )
                        }
                    </form>
                </ItemWrapper>
            </Body>
            <Footer/>
        </Container>
    );
}

export default Login;
