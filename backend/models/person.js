const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
const phoneRegex = /^(\d{2,3}-)?\d{6,}$/

console.log('connecting to', url)
mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, 'Name is required'],
    },
    number: {
        type: String,
        minLength: 8,
        required: [true, 'Number is required'],
        validate: {
            validator: function (v) {
                return phoneRegex.test(v)
            },
            message: props => `${props.value} is not a valid phone number! Use format XX-XXXXXXX or XXX-XXXXXXX.`,
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)