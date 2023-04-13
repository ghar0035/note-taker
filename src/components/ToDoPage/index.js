import { mdiPencil, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import noNoteImg from "../../images/todo.png";
import AddToDoForm from "../AddToDo";
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

const ToDoPage = () => {
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    id: 0,
  });

  const renderNotes = () => {
    axios
      .get("http://127.0.0.1:8001/note")
      .then((res) => {
        const allNotes = res.data.notes.filter(note => note.user_id === getCurrentUserId() && 
        note.due_date !== 'None')
        setNotes(allNotes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    renderNotes();
  }, []);

  const deleteToDo = (id) => {
    axios.delete("http://127.0.0.1:8001/note/" + id).then(() => {
      renderNotes();
    });
  };

  const addToDo = () => {
    setModal({ open: true });
  };

  const closeModal = () => {
    setModal({ open: false });


      renderNotes();
 
  };

  const editToDo = (id) => {
    setModal({ open: true, id });
  };

  if (notes.length === 0)
    return (
      <Container>
        <img src={noNoteImg} alt="no note found" width="400" />
        <p>No ToDo is added</p>
        <button className="btn" onClick={addToDo}>
          Add ToDo
        </button>

        <ReactModal isOpen={modal.open}>
          <AddToDoForm closeModal={closeModal} />
        </ReactModal>
      </Container>
    );

  return (
    <div>
      
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <h4>ToDo</h4>
      <button className="btn" onClick={addToDo}>
          Add ToDo
        </button>
      </div>

      <StyledNoteTable>
        <thead>
          <tr>
            <th>ToDo title</th>
            <th>ToDo Content</th>
            <th>Due date</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>{note.due_date}</td>
              <td>
                <Icon
                  path={mdiTrashCan}
                  size="2rem"
                  color="red"
                  onClick={() => deleteToDo(note.id)}
                />
              </td>
              <td>
                <Icon
                  path={mdiPencil}
                  size="2rem"
                  color="#333"
                  onClick={() => editToDo(note.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </StyledNoteTable>
      <ReactModal isOpen={modal.open}  ariaHideApp={false}>
        <AddToDoForm closeModal={closeModal} id={modal.id} />
      </ReactModal>
    </div>
  );
};
export default ToDoPage;
