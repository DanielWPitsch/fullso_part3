const mongoose = require('mongoose')

// Pegando os argumentos da linha de comando
const args = process.argv

if (args.length < 3) {
    console.log('Por favor, forneça a senha como argumento: node mongo.js <senha> [nome número]')
    process.exit(1)
}

const password = args[2]
const name = args[3]
const number = args[4]

const url =
  `mongodb+srv://danielwarellapitsch:${password}@cluster0.tboy7ef.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// Se apenas a senha foi fornecida, listar todos os contatos
if (!name && !number) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    // Se nome e número foram fornecidos, criar nova entrada
    const person = new Person({
        name,
        number,
    })

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}