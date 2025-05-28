import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Alunos from "./pages/Alunos";

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes >
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<Upload />}/>
          <Route path="/all" element={<Alunos />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
