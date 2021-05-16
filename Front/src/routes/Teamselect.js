import React from "react";
import Sidebar from '../components/Sidebar'
import Teamcard from '../components/Teamcard'
import styled from 'styled-components';
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
   
`;

const TitleContainer = styled.div`
   width    : 100%;
   display  : flex;
   justify-content: center;
   align-items: center;
   font-weight : bold;
   font-size : 1.2rem;
`;

const TeamContainer = styled.div`
   width    : 100%;
   height   : 40%;
   display  : flex;
   justify-content: center;
   align-items: center;
   margin-bottom : 15px;
`;









function Teamselect() {
  return (
    <div className="Teamselect">
      <Sidebar login={true} width={300} height={"100vh"} name="관리자">
        <InnerContainer>
          <CenterContainer>
          <TitleContainer>
             <h2>팀을 선택해주세요</h2>
          </TitleContainer>
          <TeamContainer>
            <Teamcard name="왕십리온" />
            <Teamcard name="코딩을하지로" />
            <Teamcard name="건멋" />
          </TeamContainer>
          <TeamContainer>
            <Teamcard name="Y1K3" />
            <Teamcard name="NESI" />
            <Teamcard name="야수의심장" />
            <Teamcard name="강남멋쟁이" />
          </TeamContainer> 
          </CenterContainer>
        </InnerContainer>
      </Sidebar>
    </div>
  );
}

export default Teamselect;
