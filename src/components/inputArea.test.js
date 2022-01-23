import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import InputArea from "./inputArea";
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

describe("InputArea Component Tests", () => {
  test("It should has label", () => {
    act(() => {
      render(<InputArea title="poetry show" />, container);
    });

    const label = document.querySelector("label#poetry-show-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("poetry show");
    expect(label).toHaveClass("form-label");
  });

  test("It should has textArea", () => {
    act(() => {
      render(
        <InputArea
          title="poetry show"
          rows="30"
          value="testing"
          onChange={(_) => {}}
        />,
        container
      );
    });

    const textArea = document.querySelector("textarea#poetry-show-textarea");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute("rows", "30");
    expect(textArea).not.toHaveAttribute("readOnly");
    expect(textArea).toHaveValue("testing");
    expect(textArea).toHaveClass("form-control");
  });

  test("It should has textArea", () => {
    act(() => {
      render(<InputArea title="poetry show" readOnly={true} />, container);
    });

    const textArea = document.querySelector("textarea#poetry-show-textarea");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute("readOnly", "");
  });
});
