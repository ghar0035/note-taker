import renderer from "react-test-renderer";
import Setting from "../index";
import { MemoryRouter as Router } from "react-router-dom";

test("renders Setting", () => {
    const tree = renderer
      .create(
        <Router>
          <Setting />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });