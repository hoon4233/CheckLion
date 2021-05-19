import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';




const Container = styled.div`
   width: 100%;
   height: 25%;
   display : flex;

`;

const InnerStatus = styled.div`
    width: 20%;
    height: 100%;
    display : flex;
    justify-content: center;
    align-items : center;
`;

const CircleDiv = styled.span`
    width: 40%;
    height: 70%;
    border-radius : 50%;
    background-color : #ececec;
    display : flex;
    justify-content: center;
    align-items : center;
`;





const Toggle = false;

function Status({name}) {
    const [assignment, setAssignment] = useState(true);
    const [attendance, setAttendance] = useState(true);
    const [lecture, setLecture] = useState(true);


  return (
    <Container>
      <InnerStatus>
          <CircleDiv>
             <FontAwesomeIcon color="#555555" size="2x" icon={faUserAlt} />
          </CircleDiv> 
      </InnerStatus>
      <InnerStatus>
          <h3>{name}</h3>
      </InnerStatus>
      <InnerStatus>
        <FontAwesomeIcon color="#FF9E1B" size="3x" icon={ assignment ? faToggleOn :faToggleOff}
                         onClick={() => setAssignment((prevState => !prevState)) } />
      </InnerStatus>
      <InnerStatus>
      <FontAwesomeIcon color="#FF9E1B" size="3x" icon={ attendance ? faToggleOn :faToggleOff}
                       onClick={() => setAttendance((prevState => !prevState)) } />
      </InnerStatus>
      <InnerStatus>
      <FontAwesomeIcon color="#FF9E1B" size="3x" icon={ lecture ? faToggleOn :faToggleOff}
                       onClick={() => setLecture((prevState => !prevState)) } />
      </InnerStatus>

        <InnerStatus>
            <FontAwesomeIcon color="#FF9E1B" size="3x" icon={ lecture ? faToggleOn :faToggleOff}
                             onClick={() => setLecture((prevState => !prevState)) } />
        </InnerStatus>
    </Container>  
  );
}

export default Status;
