import React, { useEffect, useState } from "react";
import toml from "toml";
import { pyProjectData, versionsData } from "./exampleData";

const SuggestPyProjectPackageVersionUpdate = () => {
  const [pyProjectFile, SetPyProjectFile] = useState(pyProjectData);
  const [isPyProjectFileWithProblem, SetIsPyProjectFileWithProblem] = useState(
    false
  );
  const [versions, SetVersions] = useState(versionsData);

  function pyProjectFileHandleChange(event) {
    SetPyProjectFile(event.target.value);
  }
  function versionsHandleChange(event) {
    SetVersions(event.target.value);
  }

  const [pinedVersions, SetPinedVersions] = useState("");
  const [pinedDevVersions, SetPinedDevVersions] = useState("");

  useEffect(() => {
    function producePinnedVersions(dependencies) {
      return versions
        .split("\n")
        .filter((value) => !!value)
        .map((value) => {
          return value.replaceAll(/\s+/g, " ").split(" ").slice(0, 2);
        })
        .reduce((accumulator, currentValue) => {
          const [k, v] = currentValue;
          if (k in dependencies) {
            return accumulator.concat(k, " = ", '">=', v, '"\n');
          }
          return accumulator;
        }, "");
    }

    try {
      const pyProjectFileToml = toml.parse(pyProjectFile);
      SetIsPyProjectFileWithProblem(false);
      SetPinedVersions(
        producePinnedVersions(pyProjectFileToml.tool.poetry["dependencies"])
      );
      SetPinedDevVersions(
        producePinnedVersions(pyProjectFileToml.tool.poetry["dev-dependencies"])
      );
    } catch (e) {
      SetIsPyProjectFileWithProblem(true);
    }
  }, [pyProjectFile, versions]);

  return (
    <div className="row">
      <div className="col">
        {isPyProjectFileWithProblem ? (
          <p className="alert alert-danger" role="alert">
            PyProject.toml with problem.
          </p>
        ) : (
          ""
        )}

        <div class="mb-3">
          <label for="pyProjectToml" class="form-label">
            PyProject.toml
          </label>
          <textarea
            className="form-control"
            id="pyProjectToml"
            value={pyProjectFile}
            onChange={pyProjectFileHandleChange}
            rows="20"
          ></textarea>
        </div>
      </div>
      <div className="col">
        <div class="mb-3">
          <label for="poetryShow" class="form-label">
            poetry show
          </label>
          <textarea
            className="form-control"
            id="poetryShow"
            value={versions}
            onChange={versionsHandleChange}
            rows="20"
          ></textarea>
        </div>
      </div>
      <div className="col">
        <div class="mb-3">
          <label for="result" class="form-label">
            Dependencies
          </label>
          <textarea
            className="form-control"
            id="dependencies"
            value={pinedVersions}
            readOnly
            rows="15"
          ></textarea>
          <label for="result" class="form-label">
            Dev-dependencies
          </label>
          <textarea
            className="form-control"
            id="dev-dependencies"
            value={pinedDevVersions}
            readOnly
            rows="15"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SuggestPyProjectPackageVersionUpdate;
