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
  }
})

module.exports = Equation;

/**
 * instanceMethods
 */
/**
 * classMethods
 */
/**
 * hooks
 */
