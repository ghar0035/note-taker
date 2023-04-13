import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../images/logo.png";
import getCurrentUserName from "../../utilities/getCurrentUserName";

const StyledHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 4rem;
  }

  span {
    display: flex;
    position: relative;
  }
  svg {
    width: 20px;
  }
`;

export const LogoutWindow = styled.div`
position: absolute;
background-color: #fff;
z-index: 3;
padding: 1rem;
top: 200%;
border: 1px solid #ddd;
`;

const Header = () => {
  const navigate = useNavigate();
  const [showLogOut, setShowLogout] = useState(false);
  const showLogout = () => {
    setShowLogout((prevState) => !prevState);
  };

  const logout = () => {
    axios.get('http://127.0.0.1:8001/logout').then(res => {
      window.localStorage.removeItem('user')

      setTimeout(() => {
        navigate('/')
      })
    })
   
    
  }

  return (
    <StyledHeader>
      <Link to="/dashboard">
        <img src={logo} alt="logo" />
      </Link>
      <span onClick={showLogout}>
        <Icon path={mdiAccount} /> {getCurrentUserName()}
        {showLogOut && (
          <LogoutWindow>
            <Link onClick={logout}>Logout</Link>
          </LogoutWindow>
        )}
      </span>
    </StyledHeader>
  );
};

export default Header;
