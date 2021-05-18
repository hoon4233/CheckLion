import React, {useEffect, useState} from "react";
import Sidebar from '../components/Sidebar'
import Teamcard from '../components/Teamcard'
import styled from 'styled-components';
import '../App.css';
import {rankingApi, teamListApi} from "../apis/TeamApi";
import {getToken} from "../modules/auth";
import RankingItem from "../components/RankingItem";
import {CircularProgress, Grid} from "@material-ui/core";

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterContainer = styled.div`
  width: 70%;
  height: 100%;

`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const TeamContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

const LoginMsg = styled.div`
  font-size: 25px;
  text-align: center;
  font-family: 'S-CoreDream-3Light';
`;


function Teamselect() {
    const [teams, setTeams] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [loading, setLoading] = useState(true);

    const fetchTeams = async () => {
        setLoading(true);
        await teamListApi.getTeamList(getToken()).then((res) => {
                setTeams(res.data);
                setIsLogIn(true);
                setLoading(false);
            }
        ).catch(e => {
            setIsLogIn(false);
            localStorage.removeItem('checkLionAuth');
        });
    }

    useEffect(() => {
        fetchTeams();
    }, []);
    return (
        <div className="Teamselect">
            <Sidebar isLogin={isLogIn} width={300} height={"100vh"} name="관리자">
                <InnerContainer>
                    <CenterContainer>
                        <TitleContainer>
                            <h2>팀을 선택해주세요</h2>
                        </TitleContainer>
                      {!isLogIn ? (
                              <LoginMsg>
                                <p>로그인 후 이용해 주세요.</p>
                              </LoginMsg>) :
                          <div>
                            {!loading ? (
                                <TeamContainer>
                                  <Grid container spacing={3}>
                                  {teams.map((item, index) => (
                                      <Grid item lg={4}>
                                        <Teamcard name={item.name} />
                                      </Grid>
                                  ))}
                                    {teams.map((item, index) => (
                                        <Grid item lg={4}>
                                          <Teamcard name={item.name} />
                                        </Grid>
                                    ))}
                                  </Grid>
                                </TeamContainer>
                            ) : <CircularProgress/>}
                          </div>
                      }

                    </CenterContainer>
                </InnerContainer>
            </Sidebar>
        </div>
    );
}

export default Teamselect;
