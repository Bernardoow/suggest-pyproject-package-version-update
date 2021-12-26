export function discoveryDependencySpecification(dependency) {
  const regexList = [
    [">=", new RegExp("^>=\\w")],
    [">", new RegExp("^>\\w")],
    ["<=", new RegExp("^<=\\w")],
    ["<", new RegExp("^<\\w")],
    ["!=", new RegExp("^!=\\w")],
    ["^", new RegExp("^\\^\\w")],
    ["~", new RegExp("^~\\w")],
  ];

  const dependencies = [];
  for (let i = 0; i < regexList.length; i++) {
    const [dependencySpecification, regex] = regexList[i];
    if (regex.test(dependency)) {
      dependencies.push(dependencySpecification);
    }
  }
  return dependencies;
}

export function canChangeDependencySpecification(dependencyDiscovered) {
  return (
    dependencyDiscovered.length === 1 &&
    JSON.stringify(dependencyDiscovered) === JSON.stringify([">="])
  );
}

export function canUpdateDependency(dependency) {
  const dependencies = discoveryDependencySpecification(dependency);
  return canChangeDependencySpecification(dependencies);
}

export function splitTextLinesIntoList(versions) {
  return versions.split("\n");
}
