import { mdiPencil, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import noNoteImg from "../../images/no_notes.png";
import AddNoteForm from "../AddNote";
import getCurrentUserId from "../../utilities/getCurrentUserId";

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const StyledNoteTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.5rem;
  }

  th {
    background-color: #f1f1f1;
  }
`;

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    id: 0,
  });

  const renderNotes = () => {
    axios
      .get("http://127.0.0.1:8001/note")
      .then((res) => {
        const allNotes = res.data.notes.filter(
          (note) =>
            note.user_id === getCurrentUserId() && note.due_date === "None"
        );
        setNotes(allNotes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    renderNotes();
  }, []);

  const deleteNote = (id) => {
    axios.delete("http://127.0.0.1:8001/note/" + id).then(() => {
      renderNotes();
    });
  };

  const addNote = () => {
    setModal({ open: true });
  };

  const closeModal = () => {
    setModal({ open: false });

    renderNotes();
  };

  const editNote = (id) => {
    setModal({ open: true, id });
  };

  if (notes.length === 0)
    return (
      <Container>
        <img src={noNoteImg} alt="no note found" width="400" />
        <p>No notes is added</p>
        <button className="btn" onClick={addNote}>
          Add Note
        </button>

        <ReactModal isOpen={modal.open}>
          <AddNoteForm closeModal={closeModal} />
        </ReactModal>
      </Container>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4>Notes</h4>
        <button className="btn" onClick={addNote}>
          Add Note
        </button>
      </div>

      <StyledNoteTable>
        <thead>
          <tr>
            <th>Note title</th>
            <th>Note Content</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>
                <Icon
                  path={mdiTrashCan}
                  size="2rem"
                  color="red"
                  onClick={() => deleteNote(note.id)}
                />
              </td>
              <td>
                <Icon
                  path={mdiPencil}
                  size="2rem"
                  color="#333"
                  onClick={() => editNote(note.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </StyledNoteTable>
      <ReactModal isOpen={modal.open} ariaHideApp={false}>
        <AddNoteForm closeModal={closeModal} id={modal.id} />
      </ReactModal>
    </div>
  );
};
export default NotesPage;
