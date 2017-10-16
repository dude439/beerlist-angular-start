var mongoose = require('mongoose');


var beerSchema = new mongoose.Schema({
    name: { type: String },
    style: { type: String },
    image_url: { type: String },
    abv: { type: Number },
    ratings: [Number]
  });

  var Beer = mongoose.model("Beer", beerSchema)
  
  module.exports = Beer;