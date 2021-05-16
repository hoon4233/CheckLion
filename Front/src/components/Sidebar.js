import React, {useState} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import logoimg from '../styles/images/logo.png';
import {logoutApi} from "../apis/AuthApi";


const Header = styled.div`
  width: 100%;
  height: 30%;
  padding: 30px;
  color: #FF9E1B;
`;

const LogoContainer = styled.span`
  margin-left: 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 700px;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 90%;
`;


const Content = styled.div`
  width: 100%;
  max-width: 300px;
  height: 80%;
  position: absolute;
  border-top-right-radius: 40px;
  background-color: white;
  font-weight: 600;
  border: 0.5px solid #ececec;
  letter-spacing: .03em;
`;

const UserInfo = styled.div`
  margin-top: 60px;
  padding-left: 30px;
  margin-bottom: 60px;
`;

const Navi = styled.div`
  z-index: 2;
  transition: 0.3s ease;
  width: 40%;
  position: fixed;
  height: 90vh;
  min-height: height;

`;

const Menu = styled.ul`
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const MenuList = styled.li`
  padding: 10px 5px;
  display: block;
  text-transform: uppercase;
  transition: color .1s;
`;

const Logout = styled.div`
  background-color: #ececec;
  padding: 10px 5px;
  display: block;
  text-transform: uppercase;
  width: 97%;
  height: 20px;
`
const LogoutContent = styled.span`
  float: right;
  font-weight: normal;
  color: #4a4a4a
`

const LogoutLetter = styled.span`
  margin-left: 10px;
`

const Sidebar = ({name, width, height, children}) => {
    const [xPosition, setX] = React.useState(-width);
    const [isLogIn, setIsLogIn] = useState(null);


    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
        } else {
            setX(-width);
        }
    };

    const checkToken = () => {
        if (!localStorage.getItem("checkLionAuth")) {
            setIsLogIn(false)
        } else {
            setIsLogIn(true);
        }
    }

    React.useEffect(() => {
        setX(0);
    }, []);


    React.useEffect(() => {
        checkToken();
    }, []);


    const handleLogout = async () => {
        await logoutApi.logout().then(()=> {
            localStorage.removeItem('checkLionAuth');
            setIsLogIn(false);
            window.location.reload();
        }).catch(e => {
            alert('로그아웃 실패 다시 시도해주세요.');
            }
        )
    };


    return (
        <React.Fragment>
            <Header>
                <div className="fa-2x">
                    <FontAwesomeIcon
                        onClick={() => toggleMenu()}
                        icon={faBars}/>
                    <Link to={'/home'}>
                        <LogoContainer>
                            <img src={logoimg} alt="logo" width='180'/>
                        </LogoContainer>
                    </Link>
                </div>
            </Header>
            <Container className="Background">
                <Navi
                    style={{
                        transform: `translatex(${xPosition}px)`,
                    }}
                >
                    <Content>
                        <UserInfo>
                            {isLogIn ? "환영합니다 " + name + "님!" : "로그인해주세요"}
                        </UserInfo>
                        {
                            isLogIn ?
                                <Menu>
                                    <MenuList onClick={handleLogout}>Logout</MenuList>
                                </Menu>
                                : <Menu>
                                    <Link to="/login"><MenuList>Login</MenuList></Link>
                                </Menu>
                        }

                        {isLogIn ?
                            <>
                                <Menu>
                                    <Link to="/home"><MenuList>Ranking</MenuList></Link>
                                    <Link to="/teamselect"><MenuList>Team</MenuList></Link>
                                </Menu>
                                <Logout>
                                    <LogoutContent
                                        onClick={() => toggleMenu()}
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} rotation={180}/>
                                        <LogoutLetter>logout</LogoutLetter>
                                    </LogoutContent>
                                </Logout>
                            </>
                            : null
                        }
                    </Content>
                </Navi>
                <BodyContainer>
                    {
                        children
                    }
                </BodyContainer>
            </Container>
        </React.Fragment>
    );
};

export default Sidebar;