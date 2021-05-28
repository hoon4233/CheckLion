import React, {useState} from 'react';
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {changePwApi} from "../apis/AuthApi";
import {getToken} from "../modules/auth";

const Title = styled.p`
  font-size: 1.85rem;
  z-index: 2;
  margin-bottom: 40px;
  font-family: 'nexon-bold';
`;

const Container = styled.div`
  margin-top: 2rem;
  margin-left: 9rem;
`;

const InputBox = styled.div`
  margin: 15px;
  position: relative;

  &:hover {
    color: #ff9e1b;
  }
`;

const InputContainer = styled.div`
  margin-top: 50px;
`

const Logo = styled.img`
  display: inline-block;
  vertical-align: center;
  z-index: 4;
  margin-top: 1.7rem;
  margin-left: 2rem;
  width: 309px;
  height: 43px;
`;

const AddPointContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  opacity: 0.85;
  width: 700px;
  height: 580px;
  border: 1px solid #ECECEC;
  align-items: center;
  text-align: center;
`;

const Button = styled.button`
  z-index: 2;
  position: relative;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'nexon-bold';
  margin-top: 30px;


  &:hover {
    color: #ff9e1b;
  }
`;
const LoginMsg = styled.div`
  font-size: 25px;
  text-align: center;
  font-family: 'S-CoreDream-3Light';
`;

const ChangePassword = (props) => {
    const [inputs, setInputs] = useState({
        pw1: null,
        pw2: null
    });
    const [isLogIn, setIsLogIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {pw1, pw2} = inputs;

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
                ...inputs,
                [name]: value
            }
        )
    }

    const postChangePw = async () => {
        setLoading(true);
        await changePwApi.changePw(getToken(), inputs).then(res => {
            setLoading(false);
            alert('비밀번호 변경 완료!');
            props.history.goBack();
        }).catch(e => {
            setError(e.response.data);
        })
    }

    return (
        <div>
            <Sidebar isLogin={isLogIn} width={300} height={"100vh"} name="관리자">
                <Container>
                    <Title>비밀번호 변경</Title>
                    <AddPointContainer>

                        {!isLogIn ? (
                                <LoginMsg>
                                    <p>로그인 후 이용해 주세요.</p>
                                </LoginMsg>) :
                            <div>
                                <InputContainer>
                                    <InputBox>
                                        <label style={{marginRight: '5px'}}>NEW PW</label>
                                        <input style={{borderRadius: '5px'}} type="password" name={'pw1'}
                                               value={pw1}
                                               onChange={onChange}/>
                                        {error !== null && error.new_password1 !== null &&
                                        <p style={{
                                            fontFamily: 'nexon-light',
                                            marginTop: '0px',
                                            marginBottom: '0',
                                            color: 'orangered',
                                        }}>{error.new_password1}</p>}
                                    </InputBox>
                                    <InputBox>
                                        <label style={{marginRight: '5px'}}>PW 확인</label>
                                        <input style={{borderRadius: '5px'}} type="password" name={'pw2'}
                                               value={pw2}
                                               onChange={onChange}/>
                                        {error !== null && error.new_password2 !== null &&
                                        <p style={{
                                            fontFamily: 'nexon-light',
                                            marginTop: '0px',
                                            marginBottom: '0',
                                            color: 'orangered',
                                        }}>{error.new_password2}</p>}

                                    </InputBox>


                                    <Button onClick={postChangePw}>저장하기</Button>
                                </InputContainer>

                            </div>
                        }
                    </AddPointContainer>
                </Container>
            </Sidebar>
        </div>
    );
};

export default ChangePassword;