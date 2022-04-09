import React, { useState, useEffect } from 'react'
import './style.css'
import { Card } from '../../components/card'

export function Home() {

  const[studentName, setStudentName] = useState('')
  const[students, setStudents] = useState([])
  const[user, setUser] = useState({name: '', avatar:''})

  function handleAddStudent(){
    if(!studentName) return
    const newStudent = {
      id: Math.floor(Math.random() * 999),
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", { hour: '2-digit', minute: '2-digit', second: '2-digit'})
    }
    setStudents(prevState => [...prevState, newStudent])
    // ['Rodrigo']
    // [['Rodrigo'], Amanda]
    // Usamos o spread para pegar todo o conteudo dentro do array
  }
  
  useEffect(() => { //executa sempre que a página é renderizada
    async function fetchData() {
      try {
        const response = await fetch('https://api.github.com/users/danielcaze')
        const data = await response.json()
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [students]) //Quais estados o useEffect depende (vazio = executado uma única vez)

  return (
    <main className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Profile Image" />
        </div>
      </header>
      
      <input type="text" placeholder="Digite um nome..." onChange={e => setStudentName(e.target.value)}/>

      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => (
        <Card key={student.id} student={student} setStudents={setStudents}students={students} />
        )) //Geralmente utiliza-se o id para a key
      }

    </main>
  )
}