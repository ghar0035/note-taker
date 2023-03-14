import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  background: #ddd;
  padding: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => (
  <StyledHeader>
    <Link to='/dashboard'><span>Logo</span></Link>
    <span>Username</span>
  </StyledHeader>
);

export default Header;
