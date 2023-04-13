import { mdiCog, mdiNote, mdiTimeline } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  border-right: 1px solid #ddd;
  padding: 1rem;

  li {
    margin-bottom: 1rem;

    svg {
      width: 20px;
      margin-right: 0.5rem;
    }
  }

  a {
    color: #333;
    text-decoration: none;
    display: flex;
    padding: 0.5rem;
    border-radius: 4px;
    align-items: center;
  }

  a.active {
    background-color: #006aff;
    color: #fff;
  }
`;

const Nav = () => (
  <StyledNav>
    <ul>
      <li>
        <NavLink to="/dashboard" end>
          <Icon path={mdiNote} />
          Notes
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/todo">
          <Icon path={mdiTimeline} />
          To Dos
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/setting">
          <Icon path={mdiCog} />
          Setting
        </NavLink>
      </li>
    </ul>
  </StyledNav>
);

export default Nav;
