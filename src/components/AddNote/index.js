import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getCurrentUserId from "../../utilities/getCurrentUserId";

const Container = styled.div`
  max-width: 12rem;
  margin: 3rem auto;
`;

const AddNoteForm = (props) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if(!props.id) return;

   axios.get('http://127.0.0.1:8001/note/' + props.id).then((res) => {
      const {title, content} = res.data.note;
      setNote({
        title,
        content
      })
   })
  }, [props.id]);

  const addNote = (e) => {
    e.preventDefault();

    if(props.id) {
      axios.put("http://127.0.0.1:8001/note/" + props.id, note).then(() => {
        props.closeModal();
      })

      return;
    }

    axios
      .post("http://127.0.0.1:8001/note", {
        ...note,
        user_id: getCurrentUserId(),
      })
      .then(() => {
        props.closeModal();
      })
      .catch((err) => console.log(err));
  };

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={addNote}>
      <Container>
        <div className="form-control">
          <label htmlFor="title">Tile</label>
          <input
            required
            id="title"
            name="title"
            type="text"
            onChange={onHandleChange}
            value={note.title}
          />
        </div>
        <div className="form-control">
          <label htmlFor="content">Content</label>
          <textarea
            required
            id="content"
            name="content"
            onChange={onHandleChange}
            value={note.content}
          />
        </div>
        <div className="btn-group">
          <button type="button" className="btn secondary" onClick={() => props.closeModal()}>Cancel</button>
          <button type="submit" className="btn">
            Save note
          </button>
        </div>
      </Container>
    </form>
  );
};

export default AddNoteForm;
