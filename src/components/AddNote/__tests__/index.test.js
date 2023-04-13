import renderer from "react-test-renderer";
import AddNote from "../index.js";
import { MemoryRouter as Router } from "react-router-dom";

test("renders AddNote", () => {
    const tree = renderer
      .create(
        <Router>
          <AddNote />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });