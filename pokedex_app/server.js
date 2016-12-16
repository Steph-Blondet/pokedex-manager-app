// DEPENDENCIES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// PORT
var port = 3000;

// DATABASE
var pokemonInfo = require('./pokemon.js')

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// ROOT ROUTE
app.get('/', function(req, res){
  res.redirect('/home');
});

app.get('/home', function(req, res){
  res.render('pokemon/indexcover.ejs');
});


// INDEX ROUTE
app.get('/pokemon', function(req, res){
  res.render('pokemon/index.ejs', { pokeAll: pokemonInfo });
});


// NEW ROUTE
app.get('/pokemon/new', function(req, res){
  res.render('pokemon/new.ejs');
});


// SHOW ROUTE
app.get('/pokemon/:id', function(req, res){
  res.render('pokemon/show.ejs', { onePoke: pokemonInfo[req.params.id] });
});


// EDIT ROUTE
app.get('/pokemon/:id/edit', function(req, res){
    res.render('pokemon/edit.ejs', {
      pokeIndex: req.params.id,
      pokeData: pokemonInfo[req.params.id]
  });
});


// UPDATE ROUTE
app.put('/pokemon/:id', function(req, res){
  console.log(req.body); // all the new info
  console.log(req.params.id); // pokemon index number
  console.log(req.body.id); // the new id of the updated pokemon
  pokemonInfo[req.params.id] = req.body; //

  res.redirect('/pokemon/show.ejs');
});


// DELETE ROUTE
app.delete('/pokemon/:id', function(req, res){
  pokemonInfo.splice(req.params.id, 1);
  res.redirect('/pokemon');
});


// CREATE ROUTE
app.post('/pokemon', function(req, res) {
  console.log('accessing post/create route');
  console.log(req.body);
  req.body.type = req.body.type.split(' ');

  req.body.stats = req.body.stats.split(' ');
  req.body.stats.hp = req.body.stats[0];
  req.body.stats.attack = req.body.stats[1];
  req.body.stats.defense = req.body.stats[2];
  req.body.stats.spattack = req.body.stats[3];
  req.body.stats.spdefense = req.body.stats[4];
  req.body.stats.speed = req.body.stats[5];

  pokemonInfo.push(req.body);
  res.redirect('/pokemon');
});



// LISTENER
app.listen(port, function(){
  console.log('pokedex is running');
})
