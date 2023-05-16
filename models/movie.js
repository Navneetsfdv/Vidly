const mongoose = require('mongoose');
const {genreSchema } = require('./genre');
const Joi = require('joi');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {type: String, required: true},

    genre: { type: genreSchema, required: true },

    numberInStock: {type: Number , required: true , min: 0, max: 255 },
    dailyRentalRate: {type: Number , required: true, min: 0 , max: 255 }
}));    

function validateMovie(movie) {
    const schema = Joi.object({  
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.string().min(0).required(),
    dailyRentalRate: Joi.string().min(0).required(),
    });
  
    return schema.validate(movie);
  }  

exports.Movie = Movie;
exports.validate = validateMovie;
