import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { pyProjectData, versionsData } from "./exampleData";
import toml from "@iarna/toml";
import App from "./App";
import { processPyProjectAndVersion } from "./businessRules";

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

describe("App Component Tests", () => {
  test("It should has new PyProject.toml area", () => {
    act(() => {
      render(<App />, container);
    });

    const newPyProjectFile = processPyProjectAndVersion(
      toml.parse(pyProjectData),
      versionsData
    );

    const newPyProjectFileString = toml
      .stringify(newPyProjectFile)
      .replace(/" {2}"/g, "");
    const textArea = document.querySelector(
      "textarea#new-pyprojecttoml-textarea"
    );
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute("rows", "30");
    expect(textArea).toHaveAttribute("readOnly");
    expect(textArea).toHaveValue(newPyProjectFileString);
    expect(textArea).toHaveClass("form-control");

    const label = document.querySelector("label#new-pyprojecttoml-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("New PyProject.toml");
    expect(label).toHaveClass("form-label");
  });

  test("It should has poetry show area", () => {
    act(() => {
      render(<App />, container);
    });

    const textArea = document.querySelector("textarea#poetry-show-textarea");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute("rows", "30");
    expect(textArea).not.toHaveAttribute("readOnly");
    expect(textArea).toHaveValue(versionsData);
    expect(textArea).toHaveClass("form-control");

    const label = document.querySelector("label#poetry-show-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("poetry show");
    expect(label).toHaveClass("form-label");
  });
  test("It should has PyProject.toml area", () => {
    act(() => {
      render(<App />, container);
    });

    const textArea = document.querySelector("textarea#pyprojecttoml-textarea");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute("rows", "30");
    expect(textArea).not.toHaveAttribute("readOnly");
    expect(textArea).toHaveValue(pyProjectData);
    expect(textArea).toHaveClass("form-control");

    const label = document.querySelector("label#pyprojecttoml-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("PyProject.toml");
    expect(label).toHaveClass("form-label");
  });
});
