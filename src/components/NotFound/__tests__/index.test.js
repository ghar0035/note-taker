import renderer from "react-test-renderer";
import NotFound from "../index.js";
import { MemoryRouter as Router } from "react-router-dom";

test("renders NotFound", () => {
    const tree = renderer
      .create(
        <Router>
          <NotFound />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });