import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faToggleOff, faToggleOn, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import {getToken} from "../modules/auth";
import {scoreCreateApi} from "../apis/TeamApi";


const Container = styled.div`
  width: 100%;
  height: 25%;
  display: flex;

`;

const InnerStatus = styled.div`
  width: 17%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleDiv = styled.span`
  width: 40%;
  height: 70%;
  border-radius: 50%;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
`;


function Status({userId, name, score, teamName, week, email, handleScoreData}) {
    const [assignment, setAssignment] = useState(false);
    const [attendance, setAttendance] = useState(false);
    const [lecture, setLecture] = useState(false);
    const [targetUserScore, setTargetUserScore] = useState(null);

    // 주차별 멤버 전체 점수에서 해당 status의 유저 점수만 뽑기
    useEffect(() => {
        if (score && score.length > 0) {
            setTargetUserScore(score.filter(item => item.user_id === userId)[0]);
        } else {
            setTargetUserScore(null);
        }
    }, [score]);

    // 이미 데이가 있으면 가져오고, 아니면 false로 초기화
    useEffect(() => {
        if (targetUserScore === null || targetUserScore === undefined  ) {
            setAssignment(false);
            setAttendance(false);
            setLecture(false);
        } else {
            setAssignment(targetUserScore.assignment);
            setAttendance(targetUserScore.attendance);
            setLecture(targetUserScore.lecture);
        }
    }, [targetUserScore]);


    // 반복되는 코드긴 한데
    // 유저별 버튼 눌렀을때 상태 관리 (handleScoreData로 상위 컴포넌트로 저장)
    const handleAssigment = async () => {
        handleScoreData(email, 'assignment', !assignment);
        setAssignment((prevState => !prevState));
    }

    const handleAttendance = async () => {
        handleScoreData(email, 'attendance', !attendance);
        setAttendance((prevState => !prevState));

    }

    const handleLecture = async () => {
        handleScoreData(email, 'lecture', !lecture);
        setLecture((prevState => !prevState));

    }

    // 전체 true로
    const handleAllCheck = () => {
        handleScoreData(email, 'all', true);
        setAssignment(true);
        setAttendance(true);
        setLecture(true);
    }

    return (
        <Container>
            <InnerStatus>
                <CircleDiv>
                    <FontAwesomeIcon color="#555555" size="2x" icon={faUserAlt}/>
                </CircleDiv>
            </InnerStatus>
            <InnerStatus>
                <h3>{name}</h3>
            </InnerStatus>
            <InnerStatus>
                <FontAwesomeIcon color="#FF9E1B" size="3x"
                                 icon={assignment ? faToggleOn : faToggleOff}
                                 onClick={targetUserScore !== null && targetUserScore !== undefined ?
                                     null : () => handleAssigment()}/>
            </InnerStatus>
            <InnerStatus>
                {/*<FontAwesomeIcon color="#FF9E1B" size="3x"*/}
                {/*                 icon={ attendance ? faToggleOn : faToggleOff}*/}
                {/*                 onClick={() => handleAttendance()}/>*/}

                <FontAwesomeIcon color="#FF9E1B" size="3x"
                                 icon={attendance ? faToggleOn : faToggleOff}
                                 onClick={targetUserScore !== null && targetUserScore !== undefined ?
                                     null : () => handleAttendance()}/>
            </InnerStatus>
            <InnerStatus>
                {/*<FontAwesomeIcon color="#FF9E1B" size="3x"*/}
                {/*                 icon={lecture ? faToggleOn : faToggleOff}*/}
                {/*                 onClick={() => handleLecture()}/>*/}

                <FontAwesomeIcon color="#FF9E1B" size="3x"
                                 icon={lecture ? faToggleOn : faToggleOff}
                                 onClick={targetUserScore !== null && targetUserScore !== undefined ?
                                     null : () => handleLecture()}/>

            </InnerStatus>
            <InnerStatus>
                <FontAwesomeIcon color="#FF9E1B" size="3x"
                                 icon={faCheck}
                                 onClick={targetUserScore !== null && targetUserScore !== undefined ?
                                     null : () => handleAllCheck()}/>
            </InnerStatus>
        </Container>
    );
}

export default React.memo(Status);
