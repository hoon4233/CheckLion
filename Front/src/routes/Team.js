import React, {useEffect, useState} from "react";
import Sidebar from '../components/Sidebar'
import Status from '../components/Status'
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronCircleLeft, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import '../App.css';
import {usersOfTeamAPi} from "../apis/TeamApi";
import {getToken} from "../modules/auth";
import RankingItem from "../components/RankingItem";
import {CircularProgress} from "@material-ui/core";

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

    const fetchUsers = async () => {
        setLoading(true);
        await usersOfTeamAPi.getUsers(getToken(), props.match.params['name']).then(res => {
            setUsers(res.data);
            setIsLogIn(true);
            setLoading(false);
        }).catch(e => {
            setIsLogIn(false);
            localStorage.removeItem('checkLionAuth');
        })
    }

    useEffect(() => {
        console.log(props.match.params['name']);
        fetchUsers();
    }, []);


    return (
        <div className="Team">
            <Sidebar isLogin={isLogIn} width={300} height={"100vh"} name="관리자">
                <InnerContainer>
                    <CenterContainer>
                        <TitleContainer>
                            <h1>{props.match.params['name']}</h1>
                        </TitleContainer>
                        <WeekContainer>
                            <FontAwesomeIcon size="2x" icon={faChevronLeft}/>
                            <WeekSpan><h2>Week 1 : HTML,CSS</h2></WeekSpan>
                            <FontAwesomeIcon size="2x" icon={faChevronRight}/>
                        </WeekContainer>
                        <StatusWrapper>
                            <StatusContainer>
                                <LeftStatusContainer>
                                    <TableHeaderContainer>
                                        <TableHeader><h3>과제</h3></TableHeader>
                                        <TableHeader><h3>출석</h3></TableHeader>
                                        <TableHeader><h3>강의</h3></TableHeader>
                                    </TableHeaderContainer>
                                    {!isLogIn ? (
                                            <div>
                                                <p>로그인 후 이용해 주세요.</p>
                                            </div>) :
                                        <div>
                                            {!loading ? (
                                                <div>
                                                    {users.map((item, index) => (
                                                        <Status name={item.name} key={index}/>
                                                    ))}
                                                </div>
                                            ) : <CircularProgress/>}
                                        </div>
                                    }
                                </LeftStatusContainer>
                                {/*<RightStatusContainer>*/}
                                {/*    <RightTableHeaderContainer>*/}
                                {/*        <h3>추가점수</h3>*/}
                                {/*    </RightTableHeaderContainer>*/}
                                {/*    <AdditionPointContainer>*/}
                                {/*        <Button>2</Button>*/}
                                {/*    </AdditionPointContainer>*/}
                                {/*</RightStatusContainer>*/}
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

export default Team;
