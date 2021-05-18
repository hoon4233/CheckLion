import React from "react";
import styled from 'styled-components';
import profileimg from '../styles/images/profile.jpg';
import {Link} from "react-router-dom";


const TeamContent = styled.div`
  border: 0.5px solid #ececec;
  width: 250px;
  height: 250px;
  margin: 10px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ProfileImg = styled.div`
  border-radius: 70%;
  overflow: hidden;
`;

const NameContent = styled.div`
  border-top: 3px solid #FF9E1B;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Teamcard = ({name, totalscore}) => {
    return (
        <div>

            <TeamContent>
                <ProfileImg>
                    <Link to={`teams/${name}`}>
                        <img src={profileimg} width='100' alt={'팀 로고'}/>
                    </Link>
                </ProfileImg>
                <NameContent>
                    <Link to={`teams/${name}`}>
                        <h3>{name}</h3>
                    </Link>
                </NameContent>

            </TeamContent>

        </div>
    );
};

export default Teamcard;
