import React from "react";
import { Link } from 'react-router-dom';
import Background from "../components/Background";
import logo from '../logo.png';
import styled from 'styled-components';
import Ranking from '../components/Ranking';
import Sidebar from '../components/Sidebar';
import RankingItem from '../components/RankingItem';

// const numbers = [1, 2, 3, 4, 5, 6, 7]
// const Teams = ['코딩을 하지로', '왕십리온', '강남사자', '야수의 심장', '건멋', 'NESI', 'Y1K3']
// const points = [42, 37, 34, 32, 26, 21, 17]

// const Team = {

// }

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

const Logo = styled.img`
  display: inline-block;
  vertical-align: center;
  z-index: 4;
  margin-top: 1.7rem;
  margin-left: 2rem;
  width: 309px;
  height: 43px;
`;

const RankingContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  opacity: 0.85;
  width: 700px;
  height: 580px;
  border: 1px solid #ECECEC;
`;

const Button = styled.button`
  z-index: 2;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'nexon-bold';
  &:hover {
    color: #ff9e1b;
  }
`;

function Home() {
  return (
    <div>
      <Sidebar login={false} width={300} height={"100vh"} name="관리자">
      <Container>
        <Title>Ranking</Title>
        <RankingContainer>
          <RankingItem rank={'순위'} name={"팀명"} score={"점수"}></RankingItem>
          <hr style={{width: '600px'}}></hr>
          <RankingItem rank={1} name={'코딩을 하지로'} score={42}></RankingItem>
          <RankingItem rank={2} name={'왕십리온'} score={37}></RankingItem>
          <RankingItem rank={3} name={'강남사자'} score={42}></RankingItem>
          <RankingItem rank={4} name={'야수의 심장'} score={42}></RankingItem>
          <RankingItem rank={5} name={'건멋'} score={42}></RankingItem>
          <RankingItem rank={6} name={'NESI'} score={42}></RankingItem>
          <RankingItem rank={7} name={'Y1K3'} score={42}></RankingItem>
        </RankingContainer>
      </Container> 
      </Sidebar>
    </div>
  );
  
}

export default Home;