import React from "react";
import Sidebar from '../components/Sidebar'
import Status from '../components/Status'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronCircleLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import '../App.css';

const InnerContainer = styled.div`
   width    : 100%;
   height   : 100%;
   display  : flex;
   justify-content: center;
   align-items: center;
`;

const CenterContainer = styled.div`
   width    : 70%;
   height   : 100%;
   border   : 2px solid #ECECEC;
   border-radius : 20px;
   display  : flex;
   flex-direction : column;
`;

const TitleContainer = styled.div`
    width    : 100%;
    height   : 10%;
    display  : flex;
    flex-direction : column;
    justify-content: center;
    align-items : center;
`;

const WeekContainer = styled.div`
    width    : 100%;
    height   : 10%;
    display  : flex;
    justify-content: center;
    align-items : center;
`;

const WeekSpan = styled.span`
    margin-left : 50px;
    margin-right : 50px;
`;

const StatusWrapper = styled.div`
    width    : 100%;
    height   : 80%;
    display  : flex;
    flex-direction : column;
    justify-content: center;
    align-items : center;
`;




const StatusContainer = styled.div`
    width    : 90%;
    height   : 70%;
    display  : flex;
`;

const LeftStatusContainer = styled.div`
    width    : 84%;
    height   : 100%;
    display  : flex;
    flex-direction : column;
`;

const RightStatusContainer = styled.div`
    width    : 16%;
    height   : 100%;
    display  : flex;
    flex-direction : column;
`;

const TableHeaderContainer = styled.div`
    width    : 100%;
    height   : 20%;
    display  : flex;
    justify-content: flex-end;
`;

const RightTableHeaderContainer = styled.div`
    width    : 100%;
    height   : 20%;
    display  : flex;
    justify-content: center;
    align-items : center;
`;

const AdditionPointContainer = styled.div`
    width    : 100%;
    height   : 80%;
    display  : flex;
    justify-content: center;
    align-items : center;
`;



const TableHeader = styled.span`
    width    : 20%;
    height   : 100%;
    display  : flex;
    justify-content: center;
    align-items : center;
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
    border-radius : 12px;
  `;

  const SubmitContainer = styled.div`
  width    : 100%;
  display  : flex;
  justify-content: center;
  align-items : center;
  margin-bottom : 20px;
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
    border-radius : 12px;
  `;


function Team() {
  return (
    <div className="Team">
      <Sidebar login={true} width={300} height={"100vh"} name="관리자">
        <InnerContainer>
          <CenterContainer>
              <TitleContainer>
                <h1>코딩을 하지로</h1>
              </TitleContainer>
              <WeekContainer>
                <FontAwesomeIcon size="2x" icon={ faChevronLeft } />
                <WeekSpan><h2>Week 1 : HTML,CSS</h2></WeekSpan>
                <FontAwesomeIcon size="2x" icon={ faChevronRight } />
              </WeekContainer>
              <StatusWrapper>
                <StatusContainer>
                  <LeftStatusContainer>
                    <TableHeaderContainer>
                      <TableHeader><h3>과제</h3></TableHeader>
                      <TableHeader><h3>출석</h3></TableHeader>
                      <TableHeader><h3>강의</h3></TableHeader>
                    </TableHeaderContainer>
                    <Status />
                    <Status />
                    <Status />
                  </LeftStatusContainer>
                  <RightStatusContainer>
                    <RightTableHeaderContainer>
                      <h3>추가점수</h3>
                    </RightTableHeaderContainer>
                    <AdditionPointContainer>
                    <Button >2</Button>
                    </AdditionPointContainer>
                  </RightStatusContainer>
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
