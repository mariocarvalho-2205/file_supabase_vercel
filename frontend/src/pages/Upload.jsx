import React from "react";
import AddAluno from "../FileUpload/AddAluno";
import { NavLink } from "react-router-dom";

const Upload = () => {
  return (
    <div>
        <h1>Upload de Dados</h1>
      <AddAluno />
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default Upload;
