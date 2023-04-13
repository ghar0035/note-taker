import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const StyledHeader = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 4rem;
  }

  a {
    margin-right: 1rem;
  }
`;

const Header = () => (
  <StyledHeader>
    <Link to="/">
    <img src={logo} alt="logo" className="logo" />
    </Link>
    <div>
      <Link to="/auth/register" className="lnkBtn">
        register
      </Link>
      <Link to="/auth" className="lnkBtn primary">
        login
      </Link>
    </div>
  </StyledHeader>
);

export default Header;
