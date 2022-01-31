import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ColArea from "./colArea";
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

describe("ColArea Component Tests", () => {
  test("textArea tests", () => {
    const title = "test title";
    const value = "testing value";
    act(() => {
      render(
        <ColArea title={title} value={value} onChange={(_) => {}} />,
        container
      );
    });
    const label = document.querySelector("label#test-title-label");
    expect(label.textContent).toBe(title);
    const textArea = document.querySelector("textarea#test-title-textarea");
    expect(textArea).toHaveValue(value);
  });
  each([[false], [true]]).test("textArea readOnly", (readOnly) => {
    act(() => {
      render(<ColArea readOnly={readOnly} onChange={(_) => {}} />, container);
    });
    const textArea = document.querySelector("textarea");
    if (readOnly) expect(textArea).toHaveAttribute("readOnly");
    else expect(textArea).not.toHaveAttribute("readOnly");
  });

  test("alertBar tests", () => {
    const alertMessage = "test alert Message";
    const title = "test title";
    const value = "testing value";
    act(() => {
      render(
        <ColArea
          title={title}
          value={value}
          onChange={(_) => {}}
          hasAlert={true}
          alertMessage={alertMessage}
        />,
        container
      );
    });
    const alert = document.querySelector("p#test-title-alert");
    expect(alert).not.toBeNull();
    expect(alert).toHaveTextContent(alertMessage);
  });
});
