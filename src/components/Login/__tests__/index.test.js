import renderer from "react-test-renderer";
import Login from "../index.js";
import { MemoryRouter as Router } from "react-router-dom";

test("renders Login", () => {
    const tree = renderer
      .create(
        <Router>
          <Login />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });