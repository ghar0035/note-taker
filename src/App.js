import styled from "styled-components";
import "./App.css";
import Header from "./components/common/header";
import noteBanner from "./images/note_banner.png";

const Banner = styled.div`
  padding: 2rem;
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: space-around;

  .img {
    max-width: 30rem;
    height: auto;
    border-radius: 1rem;
  }
`;

const Footer = styled.div`
padding: 1rem;
`;

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Banner>
          <div>
            <h1>
              Note - the app that <br /> simplifies your note-taking!
            </h1>

            <button className="btn">Try it now!</button>
          </div>

          <div>
            <img className="img" alt="" src={noteBanner} />
          </div>
        </Banner>
      </div>
      <Footer>
        <p>all rights reserved &copy;</p>
      </Footer>
    </div>
  );
}

export default App;
