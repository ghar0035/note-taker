import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Nav from "./Nav";

const Container = styled.div`
display: grid;
grid-template-columns: minmax(200px, 15%) 1fr;
grid-template-rows: 50px 1fr;
height: 100%;
`

const Main = styled.div`
background-color: #fff;
padding: 1rem;
`;

const Dashboard = () => {
  return (
    <Container>
      <Header />
      <Nav />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default Dashboard;
