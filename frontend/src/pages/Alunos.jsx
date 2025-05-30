import {NavLink} from 'react-router-dom'
import api from "../../services/api"
import { useEffect, useState } from 'react'

const Alunos = () => {
  const [ alunos, setAlunos] = useState([])

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get("/alunos/all")
        setAlunos(response.data.aluno)
        console.log(response.data.aluno)
      } catch (error) {
        console.error("erro no fetch", error)
      }
    }
    fetchAlunos()
  }, [])

  return (
    <div>
        <h1>Alunos</h1>
      <NavLink to="/">Home</NavLink>
      {alunos.map(a => (<p key={a.id}>{a.nome}</p>))}

    </div>
  )
}

export default Alunos