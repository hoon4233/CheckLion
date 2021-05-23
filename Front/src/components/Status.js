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


function Status({userId, name, score, teamName, week, email}) {
    const [assignment, setAssignment] = useState(true);
    const [attendance, setAttendance] = useState(true);
    const [lecture, setLecture] = useState(true);

    const [targetUserScore, setTargetUserScore] = useState(null);

    useEffect(() => {
        if (score && score.length > 0) {
            setTargetUserScore(score.filter(item => item.user_id === userId)[0]);
        } else {
            setTargetUserScore(null);
        }
    }, [score]);

    useEffect(() => {
        if (targetUserScore !== null && targetUserScore !== undefined) {

            console.log(targetUserScore);
            console.log(targetUserScore.assignment);
            setAssignment(targetUserScore.assignment);
            setAttendance(targetUserScore.attendance);
            setLecture(targetUserScore.lecture);
        } else {
            setAssignment(false);
            setAttendance(false);
            setLecture(false);
        }
    }, [targetUserScore]);


    const postScore = async () => {
        await scoreCreateApi.postScore(getToken(), teamName, week, assignment, attendance, lecture, userId).then(res => {

        }).catch(e => {
            alert('저장 실패')
        });
    }

    const handleAssigment = async () => {
        setAssignment((prevState => !prevState));
        // await scoreCreateApi.postScore(getToken(), teamName, week, !assignment, attendance, lecture, email).then(res => {
        //     setAssignment((prevState => !prevState));
        // }).catch(e => {
        //     console.log(e.response)
        //     alert('저장 실패')
        // });

    }

    const handleAttendance = async () => {
        setAttendance((prevState => !prevState));
        // await scoreCreateApi.postScore(getToken(), teamName, week, assignment, !attendance, lecture, email).then(res => {
        //     setAttendance((prevState => !prevState));
        // }).catch(e => {
        //     alert('저장 실패')
        // });

    }

    const handleLecture = async () => {
        setLecture((prevState => !prevState));
        // await scoreCreateApi.postScore(getToken(), teamName, week, assignment, attendance, !lecture, email).then(res => {
        //     setLecture((prevState => !prevState));
        // }).catch(e => {
        //     alert('저장 실패')
        // });

    }

    const handleAllCheck = () =>{
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
                                 icon={assignment !== undefined && assignment ? faToggleOn : faToggleOff}
                                 onClick={() => handleAssigment()}/>
            </InnerStatus>
            <InnerStatus>
                <FontAwesomeIcon color="#FF9E1B" size="3x"
                                 icon={attendance !== undefined && attendance ? faToggleOn : faToggleOff}
                                 onClick={() => handleAttendance()}/>
            </InnerStatus>
            <InnerStatus>
                <FontAwesomeIcon color="#FF9E1B" size="3x"
                                 icon={lecture !== undefined && lecture ? faToggleOn : faToggleOff}
                                 onClick={() => handleLecture()}/>

            </InnerStatus>
            <InnerStatus>
                <FontAwesomeIcon color="#FF9E1B" size="3x"
                                 icon={faCheck}
                                 onClick={() => handleAllCheck()}/>
            </InnerStatus>
        </Container>
    );
}

export default React.memo(Status);
