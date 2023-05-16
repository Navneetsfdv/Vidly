const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {

 mongoose.connect('mongodb+srv://navneetsfdv:kumar700@cluster0.oph95xz.mongodb.net/Vidly')
.then( ()=> winston.info('Connnected to manogodb...'));

}

// mongodb://127.0.0.1:27017/vidly   