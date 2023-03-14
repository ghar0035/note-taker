import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
background: #f1f1f1;
padding: 1rem;

li {
    margin-bottom: 1rem;
}
`;

const Nav = () => (
    <StyledNav>
        <ul>
            <li>
               <Link to="/dashboard">Notes</Link> 
            </li>
            <li>
                <Link to="/dashboard/todo">To Dos</Link>
            </li>
            <li>
                <Link to="/dashboard/setting">Setting</Link>
            </li>
        </ul>
    </StyledNav>
)

export default Nav