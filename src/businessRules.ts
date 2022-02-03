import toml from "@iarna/toml";
import { IDependencySpecificationRegex } from "./models";

const regexList: IDependencySpecificationRegex[] = [
    { dependencySpecification: ">=", regex: new RegExp("^>=\\w") },
    { dependencySpecification: ">", regex: new RegExp("^>\\w") },
    { dependencySpecification: "<=", regex: new RegExp("^<=\\w") },
    { dependencySpecification: "<", regex: new RegExp("^<\\w") },
    { dependencySpecification: "!=", regex: new RegExp("^!=\\w") },
    { dependencySpecification: "^", regex: new RegExp("^\\^\\w") },
    { dependencySpecification: "~", regex: new RegExp("^~\\w") },
    { dependencySpecification: "*", regex: new RegExp("^\\*") },
];


export function discoveryDependencySpecification(dependency: string): string {
    let dependencies = [];
    for (let i = 0; i < regexList.length; i++) {
        const { dependencySpecification, regex } = regexList[i];
        if (regex.test(dependency)) {
            dependencies.push(dependencySpecification);
        }
    }
    return dependencies.join(", ");
}


export function canChangeDependencySpecification(dependencyDiscovered: string): boolean {
    return [">=", "*"].includes(dependencyDiscovered);
}

export function canUpdateDependency(dependency: string): boolean {
    const dependencies = discoveryDependencySpecification(dependency);
    return canChangeDependencySpecification(dependencies);
}

export function removeEmptyString(list: string[]): string[] {
    return list.filter((value: string) => !!value);
}

export function splitTextLinesIntoList(versions: string): string[] {
    return removeEmptyString(versions.split("\n"));
}

export function getNameAndVersionOfEachDependency(versions: string[]): string[][] {

    return versions.map((value: string) => {
        return value.replace(/\s+/g, " ").split(" ").slice(0, 2);
    });
}

export function processDependency(
    dependency: string,
    section: string,
    version: string,
    pyProjectFileToml: any
): any {
    if (
        dependency in pyProjectFileToml.tool.poetry[section] &&
        canUpdateDependency(pyProjectFileToml.tool.poetry[section][dependency])
    ) {
        pyProjectFileToml.tool.poetry[section][dependency] = `>=${version}`;
    }

    return pyProjectFileToml;
}

export function processDependencyList(
    pyProjectFileToml: any,
    currentDependenciesVersions: string[][]
): any {
    currentDependenciesVersions.forEach(([dependency, version]) => {
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

export function processPyProjectAndVersion(pyProjectFileToml: any, versions: string): any {
    const versionsList = getNameAndVersionOfEachDependency(
        splitTextLinesIntoList(versions)
    );
    return processDependencyList(pyProjectFileToml, versionsList);
}

export function producePinnedVersions(pyProjectFile: string, versions: string) {
    let pyProjectFileToml = undefined;
    let newPyProjectFile = undefined;
    try {
        pyProjectFileToml = toml.parse(pyProjectFile);
        newPyProjectFile = processPyProjectAndVersion(pyProjectFileToml, versions);
    } catch (_) {
        return { content: "", hasError: true };
    }

    return {
        content: toml.stringify(newPyProjectFile).replace(/" {2}"/g, ""),
        hasError: false,
    };
}