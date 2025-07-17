const express = require('express');
const Person = require('../models/person');

const router = express.Router();

// Buscar todas as pessoas
router.get('/', async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

// Buscar uma pessoa por ID
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) res.json(person);
    else res.status(404).end();
  } catch (error) {
    res.status(400).json({ error: 'ID mal formatado' });
  }
});

// Criar nova pessoa
router.post('/', async (req, res) => {
  const { name, number } = req.body;
  const person = new Person({ name, number });
  const savedPerson = await person.save();

  res.status(201).json(savedPerson);
});

// Atualizar uma pessoa
router.put('/:id', async (req, res) => {
  const { name, number } = req.body;
  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  );

  res.json(updatedPerson);
});

// Deletar uma nota
router.delete('/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
