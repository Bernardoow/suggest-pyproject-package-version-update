import {
  canChangeDependencySpecification,
  canUpdateDependency,
  discoveryDependencySpecification,
  splitTextLinesIntoList,
} from "./businessRules";

import { versionsData } from "./exampleData";

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
      "",
      "certifi  2020.12.5 Python package for providing Mozilla's CA Bundle.",
      "chardet  3.0.4     Universal encoding detector for Python 2 and 3",
      "idna  2.10      Internationalized Domain Names in Applications (IDNA)",
      "requests 2.25.1    Python HTTP for Humans.",
      "urllib3  1.25.11   HTTP library with thread-safe connection pooling, file post, and more.",
      "",
    ]);
  });

  test("Empty Data", () => {
    expect(splitTextLinesIntoList("")).toStrictEqual([""]);
  });
});
