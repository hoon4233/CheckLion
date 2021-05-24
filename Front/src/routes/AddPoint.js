import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import RankingItem from "../components/RankingItem";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {addPointApi, rankingApi} from "../apis/TeamApi";
import {getToken} from "../modules/auth";
import {weekOfToday} from "../modules/date";
import Status from "../components/Status";

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

const InputItem = styled.div`
  margin-top: 20px;
  align-items: center;
  text-align: left;
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

const AddPoint = () => {
    const [teams, setTeams] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const weekList = useRef([]);

    const [inputs, setInputs] = useState({
        week: weekOfToday,
        first_team: null,
        second_team: null,
        third_team: null
    })

    const {week, first_team, second_team, third_team} = inputs;

    const fetchTeams = async () => {
        setLoading(true);
        await rankingApi.getRanking(getToken()).then((res) => {
                setTeams(res.data);
                setIsLogIn(true);
                setLoading(false);
            }
        ).catch(e => {
            setIsLogIn(false);
            localStorage.removeItem('checkLionAuth');
        });
    }

    const handleChange = (e) => {
        console.log(e.target);
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const postAddPint = async () => {
        let tempInputs = new Set(Object.values(inputs));
        if (Object.values(inputs).length !== tempInputs.size) {
            alert('중복 선택 된 팀이 있습니다.')
        }

        await addPointApi.postAddPoint(getToken(), inputs).then(res => {
            alert('저장 완료!')
        }).catch(e => {
            console.log(e.response);
            setError(e.response.data)
        })
    }

    useEffect(() => {

        for (let i = 1; i <= weekOfToday; i++) {
            weekList.current.push(i);
        }
        fetchTeams();
    }, []);


    return (
        <div>
            <Sidebar isLogin={isLogIn} width={300} height={"100vh"} name="관리자">
                <Container>
                    <Title>추가 점수</Title>
                    <AddPointContainer>
                        {/*<RankingItem rank={'순위'} name={"팀명"} score={"점수"}/>*/}
                        {/*<hr style={{width: '600px'}}/>*/}
                        {!isLogIn ? (
                                <LoginMsg>
                                    <p>로그인 후 이용해 주세요.</p>
                                </LoginMsg>) :
                            <div>
                                {!loading ? (
                                    <InputContainer>
                                        <InputItem>
                                            <FormControl className={'weekForm'} style={{width: '300px'}}>
                                                <InputLabel id="week" style={{
                                                    fontFamily: 'nexon-bold',
                                                    fontSize: 'large'
                                                }}> Week</InputLabel>
                                                <Select
                                                    labelId="weekLabel"
                                                    id="week"
                                                    value={week}
                                                    name={'week'}
                                                    onChange={handleChange}
                                                    style={{fontFamily: 'nexon-light'}}
                                                >

                                                    {weekList.current.map((week, index) => (
                                                        <MenuItem key={index} value={week}
                                                                  style={{fontFamily: 'nexon-light'}}>{week}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {error && error.week && <div style={{color: 'red'}}>{error.week}</div>}

                                        </InputItem>

                                        <InputItem>
                                            <FormControl className={'firstTeam'} style={{width: '300px'}}>
                                                <InputLabel id="firstTeam" style={{
                                                    fontFamily: 'nexon-bold',
                                                    fontSize: 'large'
                                                }}>1등</InputLabel>
                                                <Select
                                                    labelId="firstTeamLabel"
                                                    id="firstTeam"
                                                    value={first_team}
                                                    name={'first_team'}
                                                    onChange={handleChange}
                                                    style={{fontFamily: 'nexon-light'}}
                                                >

                                                    {teams.map((team, index) => (
                                                        <MenuItem key={index} value={team.name}
                                                                  style={{fontFamily: 'nexon-light'}}>{team.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {error && error.first_team &&
                                            <div style={{color: 'red'}}>{error.first_team}</div>}
                                        </InputItem>
                                        <InputItem>
                                            <FormControl className={'secondTeam'} style={{width: '300px'}}>
                                                <InputLabel id="secondTeam" style={{
                                                    fontFamily: 'nexon-bold',
                                                    fontSize: 'large'
                                                }}>2등</InputLabel>
                                                <Select
                                                    id="secondTeam"
                                                    labelId="secondTeamLabel"
                                                    value={second_team}
                                                    name={'second_team'}
                                                    onChange={handleChange}
                                                    style={{fontFamily: 'nexon-light'}}
                                                >

                                                    {teams.map((team, index) => (
                                                        <MenuItem key={index} value={team.name}
                                                                  style={{fontFamily: 'nexon-light'}}>{team.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {error && error.second_team &&
                                            <div style={{color: 'red'}}>{error.second_team}</div>}
                                        </InputItem>

                                        <InputItem>
                                            <FormControl className={'thirdTeam'} style={{width: '300px'}}>
                                                <InputLabel id="thirdTeam" style={{
                                                    fontFamily: 'nexon-bold',
                                                    fontSize: 'large'
                                                }}>3등</InputLabel>
                                                <Select
                                                    id="thirdTeam"
                                                    labelId="thirdTeamLabel"
                                                    value={third_team}
                                                    name={'third_team'}
                                                    onChange={handleChange}
                                                    style={{fontFamily: 'nexon-light'}}
                                                >
                                                    {teams.map((team, index) => (
                                                        <MenuItem key={index} value={team.name}
                                                                  style={{fontFamily: 'nexon-light'}}>{team.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {error && error.third_team &&
                                            <div style={{color: 'red'}}>{error.third_team}</div>}
                                        </InputItem>

                                        <Button onClick={postAddPint}>저장하기</Button>
                                    </InputContainer>


                                ) : <CircularProgress/>}
                            </div>
                        }
                    </AddPointContainer>
                </Container>
            </Sidebar>
        </div>
    );
};

export default AddPoint;