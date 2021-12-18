import {
  canChangeDependencySpecification,
  discoveryDependencySpecification,
  canUpdateDependency,
} from "./businessRules";
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
