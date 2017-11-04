const router = require('express').Router()
const {Equation} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Equation.findAll({})
    .then(equations => res.json(equations))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Equation.findById(req.params.id)
    .then(equation => res.json(equation))
    .catch(next)
})
