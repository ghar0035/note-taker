import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/header";
import { Container } from "../Register";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate()

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
      .post("http://127.0.0.1:8001/login", user)
      .then((res) => {
        window.localStorage.setItem('user', JSON.stringify({
          userId: res.data.id,
          email: user.email,
          name: res.data.name
        }));

        setTimeout(() => {
          navigate('/dashboard')
        });
        
      })
      .catch((err) => {
        if (err.request.status === 401) {
          setError("Username or password is incorrect");
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
              <label htmlFor="name">Email</label>
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

            <button type="submit" className="btn">
              Login
            </button>

            <p className="error">{error}</p>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Login;
