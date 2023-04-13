import renderer from "react-test-renderer";
import App from "./App";
import { MemoryRouter as Router } from "react-router-dom";

test("renders App", () => {
  const tree = renderer
    .create(
      <Router>
        <App />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
