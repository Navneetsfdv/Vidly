const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre } = require('../models/genre');  
const {Movie , validate} = require('../models/movie');
const express = require('express');
const router = express.Router();


router.get('/', async(req, res)=>{
    const movie = await Movie.find();
    res.send(movie);
 });   
 
 router.post('/', auth, async(req, res)=>{  
  
   const { error } = validate(req.body); 
   if (error) return res.status(400).send(error.details[0].message);

    const genre =  await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.'); 

   const movie = new Movie({
     title: req.body.title,
     genre: {
       _id: genre._id,
       name: genre.name
     } ,
     numberInStock: req.body.numberInStock ,
     dailyRentalRate: req.body.dailyRentalRate
      
    });  
     await movie.save();
    res.send(movie);
 }); 

 router.delete('/:id', [auth, admin], async(req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

 module.exports = router;