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

function Home() {
    const [rankings, setRankings] = useState(null);
    const [isLogIn, setIsLogIn] = useState(false);
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
            console.log(e.response);
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
                        {!loading ? (
                            <div>
                                {rankings.map((item, index) => (
                                    <RankingItem rank={index + 1} name={item.name} score={item.total_point}/>
                                ))}
                            </div>

                        ) : <CircularProgress/>}
                    </RankingContainer>
                </Container>
            </Sidebar>
        </div>
    );

}

export default Home;