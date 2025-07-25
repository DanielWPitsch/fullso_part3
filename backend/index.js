require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/person')
const errorHandler = require('./middleware/errorHandler')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error.message))

const app = express()
const PORT = process.env.PORT || 3001

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)
app.use(express.static('dist'))
app.use(express.json())


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number || body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then((savedPerson) => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const info = `
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `
            response.send(info)
        })
        .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((person) => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// ------------------------------------------------------------

//Essa parte causou o primeiro problema
// // Página inicial
// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })
//
//Essa parte causou o primeiro erro no deploy
//
// // Rota fallback para frontend (somente em produção)
// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
//   })
// }
