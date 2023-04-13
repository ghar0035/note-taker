import renderer from "react-test-renderer";
import AddTodo from "../index.js";
import { MemoryRouter as Router } from "react-router-dom";

test("renders add todo", () => {
    const tree = renderer
      .create(
        <Router>
          <AddTodo />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });