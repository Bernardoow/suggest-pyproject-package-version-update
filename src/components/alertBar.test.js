import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import AlertBar from "./alertBar";
const each = require("jest-each").default;
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("AlertBar Component Tests", () => {
  each([
    [false, "not should display", ""],
    [true, "alert message", "alert message"],
    [true, "", ""],
  ]).test(
    "It should update requests at dev-dependencies",
    (isPyProjectFileWithProblem, message, expected) => {
      act(() => {
        render(
          <AlertBar
            isPyProjectFileWithProblem={isPyProjectFileWithProblem}
            message={message}
          />,
          container
        );
      });
      expect(container.textContent).toBe(expected);
    }
  );
});
