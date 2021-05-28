import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {checkLogin} from "../modules/auth";
import logo from "../logo.png";
import {CircularProgress} from "@material-ui/core";
import {logInApi, registrationApi} from "../apis/AuthApi";
import isEmail from "validator/es/lib/isEmail";

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
  position: relative;
  &:hover {
    color: #ff9e1b;
  }
`;


const Registration = (props) => {
    const [regInfo, setRegInfo] = useState({
        name: '',
        email: '',
        password: '',
        conPassword: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogIn, setIsLogIn] = useState(null);
    const [message, setMessage] = useState(null);

    const {name, email, password, conPassword} = regInfo;

    const onChange = (e) => {
        const {value, name} = e.target;
        setRegInfo({
                ...regInfo,
                [name]: value
            }
        )
    }

    const checkToken = () => {
        setIsLogIn(checkLogin());
    }

    const onClickRegistration = async (e) => {
        e.preventDefault();

        setMessage(null);
        setLoading(true);
        await registrationApi.register(name, email, password, conPassword).then(() => {
            setLoading(false);
            alert('회원가입 완료!');
            props.history.goBack();
        }).catch(e => {
            setError(e.response);
            console.log(e.response);
            setLoading(false);
        })


    }

    useEffect(() => {
        checkToken();
        if (isLogIn) {
            alert('이미 로그인 된 사용자 입니다.');
            props.history.goBack();
        }
    }, [isLogIn]);


    if (isLogIn) return null;
    return (
        <Container>
            <Header>
                <Logo src={logo} alt='logo'/>
            </Header>
            <Body>
                <ItemWrapper>
                    <p style={{
                        fontFamily: 'nexon-bold',
                        fontSize: '30px',
                        marginTop: '0px',
                        marginBottom: '10px'
                    }}>회원가입 </p>
                    {/*{message !== null &&*/}
                    {/*<p style={{fontFamily: 'nexon-light', marginTop: '0px', marginBottom: '28px',  color: 'orangered',}}>{message}</p>}*/}
                    <form>
                        <InputBox>
                            <label style={{marginRight: '5px'}}>NAME</label>
                            <input style={{borderRadius: '5px'}} type="text" name={'name'} value={name}
                                   onChange={onChange}/>
                            {error !== null && error.data.email !== null &&
                            <p style={{
                                fontFamily: 'nexon-light',
                                marginTop: '0px',
                                marginBottom: '0',
                                color: 'orangered',
                            }}>{error.data.username}</p>}
                        </InputBox>
                        <InputBox>
                            <label style={{marginRight: '5px'}}>E-Mail</label>
                            <input style={{borderRadius: '5px'}} type="text" name={'email'} value={email}
                                   onChange={onChange}/>
                            {error !== null && error.data.email !== null &&
                            <p style={{
                                fontFamily: 'nexon-light',
                                marginTop: '0px',
                                marginBottom: '0',
                                color: 'orangered',
                            }}>{error.data.email}</p>}
                        </InputBox>
                        <InputBox>
                            <label style={{marginRight: '5px'}}>PW</label>
                            <input style={{borderRadius: '5px'}} type="password" name={'password'} value={password}
                                   onChange={onChange}/>
                            {error !== null && error.data.email !== null &&
                            <p style={{
                                fontFamily: 'nexon-light',
                                marginTop: '0px',
                                marginBottom: '0',
                                color: 'orangered',
                            }}>{error.data.password1}</p>}
                        </InputBox>
                        <InputBox>
                            <label style={{marginRight: '5px'}}>PW 확인</label>
                            <input style={{borderRadius: '5px'}} type="password" name={'conPassword'}
                                   value={conPassword}
                                   onChange={onChange}/>
                            {error !== null && error.data.email !== null &&
                            <p style={{
                                fontFamily: 'nexon-light',
                                marginTop: '0px',
                                marginBottom: '0',
                                color: 'orangered',
                            }}>{error.data.password2}</p>}
                            {error !== null && error.data.non_field_errors !== null &&
                            <p style={{
                                fontFamily: 'nexon-light',
                                marginTop: '0px',
                                marginBottom: '0',
                                color: 'orangered',
                            }}>{error.data.non_field_errors}</p>}
                        </InputBox>
                        <br/>

                        {loading === true ? (<CircularProgress/>) :
                            (
                                <Button onClick={onClickRegistration}>
                                    가입하기
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

export default Registration;