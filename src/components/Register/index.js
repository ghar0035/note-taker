import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/header";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const Message = styled.p`
  background-color: darkgreen;
  display: block;
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  color: white;

  &:empty {
    display: none;
  }
`;

const Register = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8001/user", user)
      .then((res) => {
        setMessage("Your account registered successfully.");
      })
      .catch((err) => {
        console.log(err);
        if (err.request.status === 400) {
          setMessage(err.response.data.error);
        }
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <Container>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={onHandleChange}
                value={user.name}
              />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={onHandleChange}
                value={user.email}
              />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={onHandleChange}
                value={user.password}
              />
            </div>

            <p>
              Already have an account? <Link to="/auth">Login</Link>
            </p>

            <button type="submit" className="btn">
              Register
            </button>

            <Message>{message}</Message>
          </form>
        </Container>
      </div>
    </>
  );
};
export default Register;
