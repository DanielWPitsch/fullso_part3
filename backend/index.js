const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
]

// // Página inicial
// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })

// GET all
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// GET by ID
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  person ? res.json(person) : res.status(404).end()
})

// DELETE
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

// POST with duplicate name check
// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
//   return maxId + 1
// }
const generateId = () => {
  let newId
  do {
    newId = Math.floor(Math.random() * 1_000_000) + 1 
  } while (persons.some(p => p.id === newId))
  return newId
}


app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const nameExists = persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())

  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

// Endpoint /info
app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

// // Rota fallback para frontend (somente em produção)
// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
//   })
// }

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

