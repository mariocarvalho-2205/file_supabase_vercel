import { useState } from "react";
import api from "../../services/api"; // Importando o serviço de API

function AddAluno() {
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };
  // console.log(nome, endereco, file, pdfFile)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // setLoading(true); // Inicia o estado de loading
    // setError(null); // Limpa qualquer erro anterior
    // setSuccess(null); // Limpa qualquer mensagem de sucesso anterior

    if (!file || !pdfFile) {
      alert("Por favor, insira o arquivo e o imagem.");
      return;
    }

    console.log(nome, endereco, "antes do append front");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pdfFile", pdfFile);
      formData.append("nome", nome);
      formData.append("endereco", endereco);

      const response = await api.post("/alunos/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message, "response front");
      // alert(`Upload bem-sucedido: ${response.data.fileUrl}`);
      if (response.status === 200) {
        setSuccess(response.data.message); // Define mensagem de sucesso
      }
      console.log(success)
    } catch (error) {
      // console.error("Erro ao fazer upload do arquivo:", error);
      // alert("Erro ao fazer upload do arquivo.");
      // Captura o erro do backend
      setError(error.response?.data?.message || "Erro ao adicionar aluno");
    } finally {
      setLoading(false); // Finaliza o loading independente de sucesso ou erro
      
    }
  };

  return (
    <div>
      <h2>Upload de Arquivo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome do Aluno:</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />
        </div>
        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Endereço"
          />
        </div>
        <div>
          <label htmlFor="file">Selecione uma imagem:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pdfFile">Selecione um arquivo:</label>
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            accept="application/pdf"
            onChange={handlePdfChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Adicionar Aluno"}
        </button>
      </form>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default AddAluno;
