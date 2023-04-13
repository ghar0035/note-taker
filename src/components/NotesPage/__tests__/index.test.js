import renderer from "react-test-renderer";
import NotePage from "../index.js";
import { MemoryRouter as Router } from "react-router-dom";

test("renders note page", () => {
    const tree = renderer
      .create(
        <Router>
          <NotePage />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });