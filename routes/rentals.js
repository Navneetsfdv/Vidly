const { Rental, validate }= require('../models/rental'); 
const auth = require('../middleware/auth');
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');  
const express = require('express');
const router = express.Router();  



router.get('/', async(req, res) =>{
   const rental = await Rental.find().sort('-dateOut');
   res.send(rental);
}) ;

router.post('/', auth, async(req, res) =>{    

   const { error } = validate(req.body); 
   if (error) return res.status(400).send(error.details[0].message);

   const customer = await Customer.findById(req.body.customerId);
   if(!customer) return res.status(400).send('Invalid customer');

   const movie = await Movie.findById(req.body.movieId);
   if(!movie) return res.status(400).send('Invalid movie'); 


   if(  movie.numberInStock === 0 ) 
   return res.status(400).send('Movie Out of Stock');

    let rental = new Rental({
      customer: {
         _id : customer._id,
         name: customer.name,
         phone: customer.phone
      },
      movie: {
         _id: movie._id,
         title: movie.title,
         dailyRentalRate: movie.dailyRentalRate,
       
      }
     });

    rental =  await rental.save();  
   
    movie.numberInStock--;
    await movie.save();  

    res.send(rental);

   //   try{   
      
   //    new Fawn.Task()
   //       .save('rentals', rental)
   //       .update('movies', {_id: movie._id}, {
   //          $inc: { numberInStock: -1 }
   //       })
   //       .run();

   //       res.send(rental);
   //    } 
   //   catch(ex){
   //    res.status(500).send('Something Failed.');
   //   }

});  
   
 module.exports = router;
