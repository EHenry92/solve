/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

'use strict';
let db = require('../server/db');
const {Equation} = require('../server/db/models')
var Promise = require('bluebird');

const list = [
	{var: 'x', lCo: [4], lConst: [2], rCo: [6], rConst: [-3]},
	{var: 'y', lCo: [3, 2], lConst: [4], rCo: [8], rConst: [14]},
	{var: 'x', lCo: [5], lConst: [3], rCo: [2, 4], rConst: [7]}
];

function generateEquations() {
    var equations = [];
    for (var i = 0; i < list.length; i++)  {
      equations.push(
        Equation.build(list[i])
      )
    }
    return equations;
}
function createEquation () {
  return Promise.map(generateEquations(), function(equ){
    return equ.save()
  });
}

function seed () {
    return createEquation();
}

  console.log('Loading solve database');
  db.sync({force: true})
  .then(function () {
    console.log('Seeding database');
    return seed();
  })
  .then(function () {
    console.log('Seeding successful');
  }, function (err) {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(function () {
    db.close();
    return null;
  });
