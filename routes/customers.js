const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');   
const {Customer , validateCustomer} = require('../models/customer');

router.get('/', async(req, res)=>{
   const customer = await Customer.find().sort('name');
   res.send(customer);
});   

router.post('/', auth,  async(req, res)=>{  

   const { error } = validateCustomer(req.body); 
   if (error) return res.status(400).send(error.details[0].message);  

   const customer = new Customer({
     isGold: req.body.isGold,
     name: req.body.name,
     phone: req.body.phone   
   });  
   const result = await customer.save();
   res.send(customer);
});   

router.delete('/:id', [auth , admin], async(req, res)=>{
  const customer = await Customer.findByIdAndDelete(req.params.id)
  if(!customer)  res.status(404).send('The genre with the given ID was not found.');

  res.send(customer);
});  

router.put('/:id', auth,  async(req, res)=>{  
   const { error } = validateCustomer(req.body); 
   if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer
                    .findByIdAndUpdate(req.params.id,
                    {isGold: req.body.isGold,  name: req.body.name, phone: req.body.phone  },
                     {new: true});
    if(!customer)  res.status(404).send('The genre with the given ID was not found.');  

    res.send(customer);
});

router.get('/:id', async(req, res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('The Customer with the given ID was not found.');
    res.send(customer);
 });   

 module.exports = router; 