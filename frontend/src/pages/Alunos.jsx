import {NavLink} from 'react-router-dom'
import api from "../../services/api"
import { useEffect, useState } from 'react'

const Alunos = () => {
  const { alunos, setAlunos} = useState([])

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get("/alunos/all")
        setAlunos(response.data)
      } catch (error) {
        console.error("erro no fetch", error)
      }
    }
  }, [])

  return (
    <div>
        <h1>Alunos</h1>
      <NavLink to="/">Home</NavLink>
      {alunos && alunos.map((a) => (<p>{a.nome}</p>))}

    </div>
  )
}

export default Alunos