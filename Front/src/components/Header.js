import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import logoimg from '../styles/images/logo.png';


const Container = styled.div`
   width: 100%;
   heigth: 30%;
   padding: 30px;
   color : #FF9E1B
`;

const LogoContainer = styled.span`
    margin-left : 20px;
`;



function Header() {
  return (
    <Container>
      <div className="fa-2x">
        <FontAwesomeIcon icon={faBars} />
        <LogoContainer>
        <img src={logoimg} width='180'/>
        </LogoContainer>
      </div>
    </Container>  
  );
}

export default Header;
