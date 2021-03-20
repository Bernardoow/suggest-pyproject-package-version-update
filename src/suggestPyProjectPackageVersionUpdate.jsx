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

  useEffect(() => {
    try {
      const pyProjectFileToml = toml.parse(pyProjectFile);
      SetIsPyProjectFileWithProblem(false);
      SetPinedVersions(
        versions
          .split("\n")
          .filter((value) => !!value)
          .map((value) => {
            return value.replaceAll(/\s+/g, " ").split(" ").slice(0, 2);
          })
          .reduce((accumulator, currentValue) => {
            const [k, v] = currentValue;
            const packages = {
              ...pyProjectFileToml.tool.poetry["dependencies"],
              ...pyProjectFileToml.tool.poetry["dev-dependencies"],
            };
            if (k in packages) {
              return accumulator.concat(k, ">=", v, "\n");
            }
            return accumulator;
          }, "")
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
            result
          </label>
          <textarea
            className="form-control"
            id="result"
            value={pinedVersions}
            readOnly
            rows="20"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SuggestPyProjectPackageVersionUpdate;
