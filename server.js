var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var Beer = require("./beerModel");
mongoose.connect('mongodb://localhost/beers');

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/beers', function(req, res, next){
  Beer.find(function(error, beer){
    if(error){ 
      return next(error)
    } else {
      return res.send(beer)
    }
  })  
})


app.post('/beers', function (req, res, next) {
  Beer.create(req.body, function(err, beer) {
    if (err) {
      return next(err);
    } else {
      return res.send(beer);
    }
  });
});

app.delete('/beers/:id', function(req, res, next){
  Beer.findByIdAndRemove(req.params.id, function(err, beer){
    if(err){
      return next(err)
    } else{
      res.send(beer)
    }
  })
})


app.post('/beers/:id/ratings', function(req, res, next) {
  //code a suitable update object 
  //using req.body to retrieve the new rating

  var updateObject = {$push: {ratings: req.body.rating}}; 

  Beer.findByIdAndUpdate(req.params.id, updateObject, { new: true }, function(err, beer) {
      if (err) {
          return next(err);
      } else {
          res.send(beer);
      }

  });
});

app.put('/beers/:id', function(req, res, next) {
  Beer.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

app.use(function(req, res, next) {
  var err = new Error('Not Fooound');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function() {
  console.log("yo yo yo, on 8000!!")
})
