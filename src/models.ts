export interface IDependencySpecificationRegex {
    readonly dependencySpecification: string;
    readonly regex: RegExp;
}

export interface ICurrentDependencyInfo {
    readonly dependency: string;
    readonly version: string;
}
