export function discoveryDependencySpecification(dependency) {
  const regexList = [
    [">=", new RegExp("^>=\\w")],
    [">", new RegExp("^>\\w")],
    ["<=", new RegExp("^<=\\w")],
    ["<", new RegExp("^<\\w")],
    ["!=", new RegExp("^!=\\w")],
    ["^", new RegExp("^\\^\\w")],
    ["~", new RegExp("^~\\w")],
    ["*", new RegExp("^\\*")],
  ];

  let dependencies = [];
  for (let i = 0; i < regexList.length; i++) {
    const [dependencySpecification, regex] = regexList[i];
    if (regex.test(dependency)) {
      dependencies.push(dependencySpecification);
    }
  }
  return dependencies.join(", ");
}

export function canChangeDependencySpecification(dependencyDiscovered) {
  return [">=", "*"].includes(dependencyDiscovered);
}

export function canUpdateDependency(dependency) {
  const dependencies = discoveryDependencySpecification(dependency);
  return canChangeDependencySpecification(dependencies);
}

export function splitTextLinesIntoList(versions) {
  return removeEmptyString(versions.split("\n"));
}

export function removeEmptyString(stringList) {
  return stringList.filter((value) => !!value);
}

export function getNameAndVersionOfEachDependency(stringList) {
  return stringList.map((value) => {
    return value.replace(/\s+/g, " ").split(" ").slice(0, 2);
  });
}

export function processDependency(
  dependency,
  section,
  version,
  pyProjectFileToml
) {
  if (
    dependency in pyProjectFileToml.tool.poetry[section] &&
    canUpdateDependency(pyProjectFileToml.tool.poetry[section][dependency])
  ) {
    pyProjectFileToml.tool.poetry[section][dependency] = `>=${version}`;
  }
  return pyProjectFileToml;
}

export function processDependencyList(
  pyProjectFileToml,
  currentDependencyVersion
) {
  currentDependencyVersion.forEach(([dependency, version]) => {
    processDependency(dependency, "dependencies", version, pyProjectFileToml);
    processDependency(
      dependency,
      "dev-dependencies",
      version,
      pyProjectFileToml
    );
  });

  return pyProjectFileToml;
}
