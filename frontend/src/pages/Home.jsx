import { NavLink } from "react-router-dom";
import AddAluno from "../FileUpload/AddAluno";

const Home = () => {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Upload de Arquivo com React e Vite agora</h1>
          <ul>
            <li><NavLink to="/create">Upload</NavLink></li>
            <li><NavLink to="/all">Alunos</NavLink></li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default Home;
