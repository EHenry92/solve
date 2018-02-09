const Sequelize = require('sequelize')
const db = require('../db')

const Equation = db.define('equation', {
  var: {
    type: Sequelize.STRING
  },
  lCo: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  lConst: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  rCo: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  rConst: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  solution: {
    type: Sequelize.DECIMAL(10, 3)
  }
})

module.exports = Equation;

Equation.beforeCreate(equation => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let lCo = equation.lCo.reduce(reducer),
      rCo = equation.rCo.reduce(reducer),
      lConst = equation.lConst.reduce(reducer),
      rConst = equation.rConst.reduce(reducer);
  equation.solution = (lConst - rConst) / (rCo - lCo);
})
