const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]


const url =
`mongodb+srv://fullstack:${password}@cluster0.ivem5.mongodb.net/phoneBook?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number : String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const person = new Person({
    name: personName,
    number: personNumber
  })
  person.save().then(result => {
    console.log('added', person.name, 'number', person.number, 'to phonebook')
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

