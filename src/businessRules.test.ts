import {
  canChangeDependencySpecification,
  canUpdateDependency,
  discoveryDependencySpecification,
  getNameAndVersionOfEachDependency,
  processDependency,
  processDependencyList,
  removeEmptyString,
  splitTextLinesIntoList,
  processPyProjectAndVersion,
  producePinnedVersions,
} from "./businessRules";

import { pyProjectData, versionsData } from "./exampleData";
import toml from "@iarna/toml";

const each = require("jest-each").default;

describe("discoveryDependencySpecification Tests", () => {
  test("Caret requirements", () => {
    expect(discoveryDependencySpecification("^2.24.0")).toStrictEqual("^");
  });

  test("Tilde requirements", () => {
    expect(discoveryDependencySpecification("~2.24.0")).toStrictEqual("~");
  });

  describe("Inequality requirements", () => {
    each([">=", ">", "<", "<=", "!="]).test(
      "Inequality requirements",
      (inequality: string) => {
        expect(discoveryDependencySpecification(`${inequality}2.24.0`)).toEqual(
          inequality
        );
      }
    );
  });
});

describe("canChangeDependencySpecification Tests", () => {
  each([">=", "*"]).test(
    "Acceptable update version",
    (dependencyDiscovered : string) => {
      expect(
        canChangeDependencySpecification(dependencyDiscovered)
      ).toBeTruthy();
    }
  );
  each([">", "<", "<=", "!=", "<"]).test(
    "Not acceptable update version",
    (dependencyDiscovered: string) => {
      expect(
        canChangeDependencySpecification(dependencyDiscovered)
      ).toBeFalsy();
    }
  );
});

describe("canUpdate Tests", () => {
  test("Acceptable", () => {
    expect(canUpdateDependency(">=20.20.20")).toBeTruthy();
  });
  test("Not acceptable", () => {
    expect(canUpdateDependency("^20.20.20")).toBeFalsy();
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

describe("splitTextLinesIntoList Tests", () => {
  test("Valid Data", () => {
    expect(splitTextLinesIntoList(versionsData)).toStrictEqual([
      "certifi  2020.12.5 Python package for providing Mozilla's CA Bundle.",
      "chardet  3.0.4     Universal encoding detector for Python 2 and 3",
      "idna  2.10      Internationalized Domain Names in Applications (IDNA)",
      "requests 2.25.1    Python HTTP for Humans.",
      "urllib3  1.25.11   HTTP library with thread-safe connection pooling, file post, and more.",
      "pytest  6.2.5   pytest simple powerful testing with Python",
    ]);
  });

  test("Empty Data", () => {
    expect(splitTextLinesIntoList("")).toStrictEqual([]);
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

describe("processDependencyList Tests", () => {
  const pyProjectFileToml = toml.parse(pyProjectData);
  const versions = [
    ["certifi", "2020.12.5"],
    ["chardet", "3.0.4"],
    ["idna", "2.10"],
    ["requests", "2.25.1"],
    ["urllib3", "1.25.11"],
    ["pytest", "6.2.5"],
  ];

  each([
    ["chardet", ">=3.0.4"],
    ["urllib3", ">=1.25.11"],
    ["certifi", "<2020.12.5"],
    ["requests", ">=2.25.1"],
  ]).test(
    "It should update requests at dependencies",
    (dependency: string, version:string) => {
      const updatedPyProjectFileToml = processDependencyList(
        pyProjectFileToml,
        versions
      );
      expect(
        updatedPyProjectFileToml.tool.poetry["dependencies"][dependency]
      ).toStrictEqual(version);
    }
  );

  each([
    ["pytest", ">=6.2.5"],
    ["requests", "^2.24.0"],
  ]).test(
    "It should update requests at dev-dependencies",
    (dependency:string, version:string) => {
      const updatedPyProjectFileToml = processDependencyList(
        pyProjectFileToml,
        versions
      );
      expect(
        updatedPyProjectFileToml.tool.poetry["dev-dependencies"][dependency]
      ).toStrictEqual(version);
    }
  );
});


describe("processPyProjectAndVersion Tests", () => {
  const pyProjectFileToml = toml.parse(pyProjectData);

  test("It should be equal a dependencies", () => {
    const result = processPyProjectAndVersion(pyProjectFileToml, versionsData);
    const expectedDependencies = {
      python: "^3.8",
      requests: ">=2.25.1",
      urllib3: ">=1.25.11",
      chardet: ">=3.0.4",
      certifi: "<2020.12.5",
    };

    expect(result.tool.poetry.dependencies).toMatchObject(expectedDependencies);
  });

  test("It should be equal a dev-dependencies", () => {
    const result = processPyProjectAndVersion(pyProjectFileToml, versionsData);
    const expectedDevDependencies = {
      requests: "^2.24.0",
      pytest: ">=6.2.5",
    };
    expect(result.tool.poetry["dev-dependencies"]).toMatchObject(
      expectedDevDependencies
    );
  });
});


describe("producePinnedVersions Tests", () => {
  test("it should return empty content and hasError true when has error on toml.", () => {
    const { content, hasError } = producePinnedVersions("test", "");
    expect(hasError).toBe(true);
    expect(content).toBe("");
  });
  test("it sho1uld return empty content and hasError true when has error on toml.", () => {
    const pyProject = `[tool.poetry.dependencies]
python = "^3.8"

[tool.poetry.dev-dependencies]
pytest = ">=6.0.0"
`;
    const expectedPyProject = `[tool.poetry.dependencies]
python = "^3.8"

[tool.poetry.dev-dependencies]
pytest = ">=6.2.5"
`;
    const { content, hasError } = producePinnedVersions(
      pyProject,
      "pytest  6.2.5   pytest simple powerful testing with Python"
    );
    expect(hasError).toBe(false);
    expect(content).toBe(expectedPyProject);
  });
});
