import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import RankingItem from '../components/RankingItem';
import {rankingApi} from "../apis/TeamApi";
import {CircularProgress} from "@material-ui/core";
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
const LoginMsg = styled.div`
  font-size: 25px;
  text-align: center;
  font-family: 'S-CoreDream-3Light';
`;


function Home() {
    const [rankings, setRankings] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [loading, setLoading] = useState(true);


    const fetchRanking = async () => {
        setLoading(true);
        await rankingApi.getRanking(getToken()).then((res) => {
                setRankings(res.data);
                setIsLogIn(true);
                setLoading(false);
            }
        ).catch(e => {
            setIsLogIn(false);
            localStorage.removeItem('checkLionAuth');
        });
    }

    useEffect(() => {
        fetchRanking();
    }, []);

    return (
        <div>
            <Sidebar isLogin={isLogIn} width={300} height={"100vh"} name="관리자">
                <Container>
                    <Title>Ranking</Title>
                    <RankingContainer>
                        <RankingItem rank={'순위'} name={"팀명"} score={"점수"}/>
                        <hr style={{width: '600px'}}/>
                        {!isLogIn ? (
                            <LoginMsg>
                                <p>로그인 후 이용해 주세요.</p>
                            </LoginMsg>) :
                            <div>
                                {!loading ? (
                                    <div>
                                        {rankings.map((item, index) => (
                                            <RankingItem rank={index + 1} name={item.name} score={item.total_point}/>
                                        ))}
                                    </div>


                                ) : <CircularProgress/>}
                            </div>
                        }

                    </RankingContainer>
                </Container>
            </Sidebar>
        </div>
    );

}

export default Home;