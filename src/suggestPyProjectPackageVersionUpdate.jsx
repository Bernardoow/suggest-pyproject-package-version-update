import React, { useEffect, useState } from "react";
import { pyProjectData, versionsData } from "./exampleData";
import { producePinnedVersions } from "./businessRules";
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
    const { content, hasError } = producePinnedVersions(
      pyProjectFile,
      versions
    );
    SetIsPyProjectFileWithProblem(hasError);
    SetNewPyProjectFile(content);
  }, [pyProjectFile, versions]);

  return (
    <div className="row">
      <ColArea
        title="PyProject.toml"
        value={pyProjectFile}
        onChange={pyProjectFileHandleChange}
        hasAlert={isPyProjectFileWithProblem}
        alertMessage="PyProject.toml with problem."
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
