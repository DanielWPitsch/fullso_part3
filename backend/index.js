require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Person = require('./models/person');
const errorHandler = require('./middleware/errorHandler');

// MongoDB connection with improved error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit if DB connection fails
  });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);
app.use(express.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name and number are required' 
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error));
});

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { 
      new: true,
      runValidators: true,
      context: 'query' 
    }
  )
    .then(updatedPerson => {
      if (!updatedPerson) {
        return response.status(404).end();
      }
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error));
});

// Catch-all route for React - must come last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
});