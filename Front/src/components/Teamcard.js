import React from "react";
import styled from 'styled-components';
import profileimg from '../styles/images/profile.jpg';


const TeamContent = styled.div`
   border:0.5px solid #ececec; 
   width : 250px;
   height : 250px;
   margin : 10px;
   border-radius : 30px;
   display : flex;
   flex-direction : column;
   justify-content: center;
   align-items: center;
   background-color : white;
`;

const ProfileImg = styled.div`
border-radius: 70%;
overflow: hidden;
`;

const NameContent = styled.div`
border-top : 3px solid #FF9E1B;
width : 200px;
display : flex;
justify-content: center;
align-items: center;
margin-top : 30px;
`;

const Teamcard = ({ name,totalscore }) => {
  return (
    <div>
      <TeamContent>
        <ProfileImg>
        <img src={profileimg} width='100'/>
        </ProfileImg>
        <NameContent>
        <h3>{name}</h3>
        </NameContent>
      </TeamContent>
    </div>
  );
};

export default Teamcard;
