import React, {useEffect, useState} from "react";
import Sidebar from '../components/Sidebar'
import Status from '../components/Status'
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import '../App.css';
import {teamScoreOfWeekApi, usersOfTeamAPi} from "../apis/TeamApi";
import {getToken} from "../modules/auth";
import {CircularProgress} from "@material-ui/core";
import {weekOfToday} from "../modules/date";

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
  border: 2px solid #ECECEC;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WeekContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeekSpan = styled.span`
  margin-left: 50px;
  margin-right: 50px;
`;

const StatusWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const StatusContainer = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
`;

const LeftStatusContainer = styled.div`
  width: 84%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RightStatusContainer = styled.div`
  width: 16%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TableHeaderContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-end;
`;

const RightTableHeaderContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdditionPointContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const TableHeader = styled.span`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  border: 2px solid #e7e7e7; /* Green */
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 12px;
`;

const SubmitContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  background-color: #555555;
  border: 2px solid #e7e7e7;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 12px;
`;


function Team(props) {
    const [users, setUsers] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [loading, setLoading] = useState(true);
    const [scoreLoading, setScoreLoading] = useState(true);
    const [week, setWeek] = useState(weekOfToday);
    const [teamScores, setTeamScores] = useState(null);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        await usersOfTeamAPi.getUsers(getToken(), props.match.params['name']).then(res => {
            setUsers(res.data);
            setIsLogIn(true);
            setLoading(false);
        }).catch(e => {
            console.log(e.response);
            if (e.response.data.detail === "이 작업을 수행할 권한(permission)이 없습니다.") {
                alert('권한이 없습니다.')
                props.history.goBack();
            } else {
                setIsLogIn(false);
                localStorage.removeItem('checkLionAuth');
            }

        })
    }

    const fetchTeamScore = async () => {
        setScoreLoading(true);
        await teamScoreOfWeekApi.getScoreOfWeek(getToken(), props.match.params['name'], week).then(res => {
            setTeamScores(res.data);
            setScoreLoading(false)
        }).catch(e => {
            setScoreLoading(false)
            console.log(e.response);
        });
    }


    useEffect(() => {
        console.log(week);
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchTeamScore()
    }, [week]);


    const onLastWeek = () => {
        if (week > 1) {
            setWeek(week - 1);
        }

    }
    const onNextWeek = () => {
        if (week < weekOfToday) {
            setWeek(week + 1);
        }

    }


    return (
        <div className="Team">
            <Sidebar isLogin={isLogIn} width={300} height={"100vh"} name="관리자">
                <InnerContainer>
                    <CenterContainer>
                        <TitleContainer>
                            <h1>{props.match.params['name']}</h1>
                        </TitleContainer>
                        <WeekContainer>
                            <FontAwesomeIcon size="2x" icon={faChevronLeft} onClick={onLastWeek}/>
                            <WeekSpan><h2>Week {week}</h2></WeekSpan>
                            <FontAwesomeIcon size="2x" icon={faChevronRight} onClick={onNextWeek}/>
                        </WeekContainer>
                        <StatusWrapper>
                            <StatusContainer>
                                <LeftStatusContainer>
                                    <TableHeaderContainer>
                                        <TableHeader><h3></h3></TableHeader>
                                        <TableHeader><h3></h3></TableHeader>
                                        <TableHeader><h3>과제</h3></TableHeader>
                                        <TableHeader><h3>출석</h3></TableHeader>
                                        <TableHeader><h3>강의</h3></TableHeader>
                                        <TableHeader><h3>모두 체크</h3></TableHeader>
                                    </TableHeaderContainer>
                                    {!isLogIn ? (
                                            <div>
                                                <p>로그인 후 이용해 주세요.</p>
                                            </div>) :
                                        <div>
                                            {!loading ? (
                                                <div>
                                                    {users.map((item, index) => (
                                                        <Status name={item.name} userId={item.id} key={index}
                                                                teamName={props.match.params['name']} week={week}
                                                                email={item.email}
                                                                score={teamScores}/>
                                                    ))}
                                                </div>
                                            ) : <CircularProgress/>}
                                        </div>
                                    }
                                </LeftStatusContainer>
                            </StatusContainer>
                        </StatusWrapper>
                        <SubmitContainer>
                            <SubmitButton>
                                저장하기
                            </SubmitButton>
                        </SubmitContainer>
                    </CenterContainer>
                </InnerContainer>
            </Sidebar>
        </div>
    );
}

export default React.memo(Team);
