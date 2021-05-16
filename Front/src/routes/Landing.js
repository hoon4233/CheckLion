import React from "react";
import { Link } from 'react-router-dom';
import lion from '../landing-lion.png';
import styled from 'styled-components';
import logo from '../logo.png';



const Container = styled.div``;
const Header = styled.div`
  /* background-color: pink; */
  padding-left: 45px;
  padding-top: 35px;
  padding-bottom: 30px;
`;
const Logo = styled.img`
  display: inline-block;
  vertical-align: center;
  width: 180px;
  padding-left: 32.5px;
  padding-top: 3px;
`;
const Info = styled.div`
  text-align: center;
  display: flex;
  vertical-align: center;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  width: 43%;
`;

const InfoText = styled.p`
  font-size: 40px;
  font-family: "nexon-bold";
  text-align: center;

`;

const SubText = styled.p`
  font-size: 30px;
  font-family: 'nexon-light';
  margin: 0;
`;

const Button = styled.button`
  font-size: 1.3rem;
  font-family: 'S-CoreDream-3Light';
  border: none;
  background: none;
  margin-top: 3rem;
  cursor: pointer;
  &:hover {
    color: #ff9e1b;}
`;

const InfoImage = styled.img`
  display: inline-block;
  padding-top: 15px;
  width: 600px;
`;

const Footer = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  background-color: #dedede;

`;

function Landing() {
  return (
    <div className="Landing">
      <Container>
      <Header>
        <Logo src={logo} alt='logo' />
      </Header>
      <Info>
        <InfoContainer>
          <InfoText>안녕하세요,</InfoText>
          <SubText>한양대학교 멋쟁이 사자처럼</SubText>
          <SubText>구성원 관리 페이지입니다</SubText>
          <Link to="/home"><Button>입장하기 </Button></Link>
        </InfoContainer>
        <InfoContainer>
          <InfoImage src={lion} alt='lion' />
        </InfoContainer>
      </Info>
      <Footer></Footer>
      </Container>
    </div>

  );
}

export default Landing;
