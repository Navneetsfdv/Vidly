const auth = require('../middleware/auth')
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', auth,  async(req, res) => {  

     const { error } = validateReturn(req.body); 
     if (error) return res.status(400).send(error.details[0].message);

    

  let rental =  await  Rental.findOne({
       "customer._id" : req.body.customerId,
       "movie._id" : req.body.movieId,
       });
                   
if(!rental) return res.status(404).send('No rental found for this customer/movie');

if(rental.dateReturned) return res.status(400).send('rental already processed');


  rental.dateReturned = new Date();

 const totaldays = Math.ceil(
       (rental.dateReturned -rental.dateOut )/(1000*3600*24));

 rental.rentalFee = rental.movie.dailyRentalRate*totaldays;
     
     
 rental = await rental.save();  

 const movie = await Movie.findById(req.body.movieId);  
  movie.numberInStock++;  

  await movie.save();


  res.status(200).send(rental);
  


});  

function validateReturn(body) {
    const result =  Joi.object({
          customerId: Joi.string().required() ,
          movieId: Joi.string().required()
    }); 
    return result.validate(body);

}  

module.exports = router;