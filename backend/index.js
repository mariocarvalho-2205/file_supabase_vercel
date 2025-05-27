require('dotenv').config();

const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const alunoRoutes = require('./routes/alunoRoutes')
// password Msct.142205! - mario.carvalho.devpython@gmail.com supabase
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const db = require('./db/db')

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

// Rota para upload de arquivos
app.use('/api/alunos', alunoRoutes);


db.sync()
.then(() => {
    app.listen(port, () => {
        console.log(`conectou a porta ${port}`)
    })
})
.catch(err => {
    console.log(err)
})
