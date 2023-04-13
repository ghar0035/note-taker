import renderer from "react-test-renderer";
import Register from "../index.js";
import { MemoryRouter as Router } from "react-router-dom";

test("renders Register", () => {
    const tree = renderer
      .create(
        <Router>
          <Register />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });