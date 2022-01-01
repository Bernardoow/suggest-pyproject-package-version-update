import {
  canChangeDependencySpecification,
  canUpdateDependency,
  discoveryDependencySpecification,
  getNameAndVersionOfEachDependency,
  processDependency,
  removeEmptyString,
  splitTextLinesIntoList,
} from "./businessRules";

import { pyProjectData, versionsData } from "./exampleData";
import toml from "@iarna/toml";

const each = require("jest-each").default;

describe("discoveryDependencySpecification Tests", () => {
  test("Caret requirements", () => {
    expect(discoveryDependencySpecification("^2.24.0")).toStrictEqual(["^"]);
  });

  test("Tilde requirements", () => {
    expect(discoveryDependencySpecification("~2.24.0")).toStrictEqual(["~"]);
  });

  describe("Inequality requirements", () => {
    each([
      [">=", [">="]],
      [">", [">"]],
      ["<", ["<"]],
      ["<=", ["<="]],
      ["!=", ["!="]],
    ]).test("Inequality requirements", (inequality, expected) => {
      expect(discoveryDependencySpecification(`${inequality}2.24.0`)).toEqual(
        expected
      );
    });
  });
});

describe("canChangeDependencySpecification Tests", () => {
  test("Acceptable update version", () => {
    expect(canChangeDependencySpecification([">="])).toBeTruthy();
  });
  each([[">"], ["<"], ["<="], ["!="], [">=", "<"]]).test(
    "Not acceptable update version",
    (dependencyDiscovered) => {
      expect(
        canChangeDependencySpecification(dependencyDiscovered)
      ).toBeFalsy();
    }
  );
});

describe("canUpdate Tests", () => {
  test("Acceptable", () => {
    expect(canUpdateDependency([">=20.20.20"])).toBeTruthy();
  });
  test("Not acceptable", () => {
    expect(canUpdateDependency(["^20.20.20"])).toBeFalsy();
  });
});

describe("splitTextLinesIntoList Tests", () => {
  test("Valid Data", () => {
    expect(splitTextLinesIntoList(versionsData)).toStrictEqual([
      "certifi  2020.12.5 Python package for providing Mozilla's CA Bundle.",
      "chardet  3.0.4     Universal encoding detector for Python 2 and 3",
      "idna  2.10      Internationalized Domain Names in Applications (IDNA)",
      "requests 2.25.1    Python HTTP for Humans.",
      "urllib3  1.25.11   HTTP library with thread-safe connection pooling, file post, and more.",
    ]);
  });

  test("Empty Data", () => {
    expect(splitTextLinesIntoList("")).toStrictEqual([]);
  });
});

describe("removeEmptyString Tests", () => {
  test("List without entry with value and empty string", () => {
    expect(removeEmptyString(["1", "", "2"])).toStrictEqual(["1", "2"]);
  });
  test("List without entry with value and without empty string", () => {
    expect(removeEmptyString(["1", "2"])).toStrictEqual(["1", "2"]);
  });
  test("Empty Data", () => {
    expect(removeEmptyString([""])).toStrictEqual([]);
  });
});

describe("getNameAndVersionOfEachDependency Tests", () => {
  test("List valid", () => {
    expect(
      getNameAndVersionOfEachDependency([
        "certifi  2020.12.5 Python package for providing Mozilla's CA Bundle.",
        "chardet  3.0.4     Universal encoding detector for Python 2 and 3",
        "idna  2.10      Internationalized Domain Names in Applications (IDNA)",
        "requests 2.25.1    Python HTTP for Humans.",
        "urllib3  1.25.11   HTTP library with thread-safe connection pooling, file post, and more.",
      ])
    ).toStrictEqual([
      ["certifi", "2020.12.5"],
      ["chardet", "3.0.4"],
      ["idna", "2.10"],
      ["requests", "2.25.1"],
      ["urllib3", "1.25.11"],
    ]);
  });
  test("List empty", () => {
    expect(getNameAndVersionOfEachDependency([])).toStrictEqual([]);
  });
});

describe("processDependency Tests", () => {
  const pyProjectFileToml = toml.parse(pyProjectData);
  test("It should update requests at dependencies", () => {
    const [dependency, section] = ["requests", "dependencies"];
    const newPyProjectFileToml = processDependency(
      dependency,
      section,
      "2.25.0",
      pyProjectFileToml
    );
    expect(newPyProjectFileToml.tool.poetry[section][dependency]).toStrictEqual(
      ">=2.25.0"
    );
  });
  test("It shouldn't update requests at dev-dependencies", () => {
    const [dependency, section] = ["requests", "dev-dependencies"];
    const newPyProjectFileToml = processDependency(
      dependency,
      section,
      "2.25.0",
      pyProjectFileToml
    );
    expect(newPyProjectFileToml.tool.poetry[section][dependency]).toStrictEqual(
      "^2.24.0"
    );
  });
  test("Dependencies not exist", () => {
    const [dependency, section] = ["requests-inex", "dev-dependencies"];
    const newPyProjectFileToml = processDependency(
      dependency,
      section,
      "2.25.0",
      pyProjectFileToml
    );
    expect(
      newPyProjectFileToml.tool.poetry[section][dependency]
    ).toBeUndefined();
  });
});
