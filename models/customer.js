const mongoose = require('mongoose'); 
const Joi = require('joi'); 

const Customer = mongoose.model('customer', new mongoose.Schema({  
    isGold: {
             type:Boolean,   default: false  }, 

     name: {
          type:String,   required: true,   minlength: 5,  maxlength: 50  },

    phone: {
          type:String,  required: true,  minlength: 5,   maxlength: 50   }
    })
    );    

    function validateCustomer(customer) {
      const schema = Joi.object({
        name: Joi.string().min(3).required(), 
        phone: Joi.string().min(5).required()
      });
    
      return schema.validate(customer);
    } 

    module.exports.Customer = Customer;
    module.exports.validateCustomer = validateCustomer;

    