import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import settingImg from '../../images/setting.png'
import getCurrentUserName, { updateUserName } from "../../utilities/getCurrentUserName";
import getCurrentUserEmail from "../../utilities/getCurrentUserEmail";
import getCurrentUserId from "../../utilities/getCurrentUserId";



const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
`;

const Setting = () => {
  const [user, setUser] = useState({
    name: getCurrentUserName(),
  });

  const save = (e) => {
    e.preventDefault();

    axios.put('http://127.0.0.1:8001/user/' + getCurrentUserId(), user)
    .then(res => {
        console.log("nameSaved")
        updateUserName()
    } )
  }

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <Container>
      <form onSubmit={save}>
        <h4>Setting</h4>
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

        <p>
            <strong>Email:</strong> {getCurrentUserEmail()}
        </p>

        <button type="submit" className="btn">
          Save Changes
        </button>
      </form>
      <img  src={settingImg}  alt="" width="400" />
    </Container>
  );
};
export default Setting;
