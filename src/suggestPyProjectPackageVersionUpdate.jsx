import React, { useEffect, useState } from "react";
import toml from "@iarna/toml";
import { pyProjectData, versionsData } from "./exampleData";

const SuggestPyProjectPackageVersionUpdate = () => {
  const [pyProjectFile, SetPyProjectFile] = useState(pyProjectData);
  const [newPyProjectFile, SetNewPyProjectFile] = useState(pyProjectData);
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

  useEffect(() => {
    function producePinnedVersions(pyProjectFileToml) {
      const newPyProjectFile = versions
        .split("\n")
        .filter((value) => !!value)
        .map((value) => {
          return value.replaceAll(/\s+/g, " ").split(" ").slice(0, 2);
        })
        .reduce((accumulator, currentValue) => {
          const [k, v] = currentValue;

          ["dependencies", "dev-dependencies"].forEach((section) => {
            if (k in accumulator.tool.poetry[section]) {
              accumulator.tool.poetry[section][k] = `>=${v}`;
            }
          });
          return accumulator;
        }, pyProjectFileToml);

      return toml.stringify(newPyProjectFile).replaceAll("  ", "");
    }

    try {
      const pyProjectFileToml = toml.parse(pyProjectFile);
      SetIsPyProjectFileWithProblem(false);
      SetNewPyProjectFile(producePinnedVersions(pyProjectFileToml));
    } catch (_) {
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

        <div className="mb-3">
          <label htmlFor="pyProjectToml" className="form-label">
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
        <div className="mb-3">
          <label htmlFor="poetryShow" className="form-label">
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
        <div className="mb-3">
          <label htmlFor="result" className="form-label">
            New PyProject.toml
          </label>
          <textarea
            className="form-control"
            id="dependencies"
            value={newPyProjectFile}
            readOnly
            rows="30"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SuggestPyProjectPackageVersionUpdate;
