import React, { useEffect, useState } from "react";
import toml from "@iarna/toml";
import { pyProjectData, versionsData } from "./exampleData";
import { processPyProjectAndVersion } from "./businessRules";
import ColArea from "./components/colArea";

const SuggestPyProjectPackageVersionUpdate = () => {
  const [pyProjectFile, SetPyProjectFile] = useState(pyProjectData);
  const [newPyProjectFile, SetNewPyProjectFile] = useState(pyProjectData);
  const [isPyProjectFileWithProblem, SetIsPyProjectFileWithProblem] =
    useState(false);
  const [versions, SetVersions] = useState(versionsData);

  function pyProjectFileHandleChange(event) {
    SetPyProjectFile(event.target.value);
  }
  function versionsHandleChange(event) {
    SetVersions(event.target.value);
  }

  useEffect(() => {
    function producePinnedVersions(pyProjectFileToml) {
      const newPyProjectFile = processPyProjectAndVersion(
        pyProjectFileToml,
        versions
      );

      return toml.stringify(newPyProjectFile).replace(/" {2}"/g, "");
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
      <ColArea
        title="PyProject.toml"
        value={pyProjectFile}
        onChange={pyProjectFileHandleChange}
        hasAlert={isPyProjectFileWithProblem}
        message="PyProject.toml with problem."
      />
      <ColArea
        title="poetry show"
        value={versions}
        onChange={versionsHandleChange}
      />
      <ColArea
        title="New PyProject.toml"
        value={newPyProjectFile}
        readOnly={true}
      />
    </div>
  );
};

export default SuggestPyProjectPackageVersionUpdate;
