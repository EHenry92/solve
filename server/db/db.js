var knex = require('knex')({client: 'mysql', connection: process.env.MYSQL_DATABASE_CONNECTION });
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users',
  equation: function() {
    return this.hasMany(Equation);
  }
});

var Equation = bookshelf.Model.extend({
  tableName: 'equation',
  user: function () {
    return this.belongsTo(User);
  }
});


// User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {
//   console.log(user.related('posts').toJSON());
// }).catch(function(err) {
//   console.error(err);
// });
