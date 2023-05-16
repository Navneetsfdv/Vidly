const winston = require('winston');  
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {  
    process.on('uncaughtException', (ex) => {
        console.log(ex.message);
        winston.error(ex.message);
       });
       
       winston.add(new winston.transports.File({ filename: 'logfile.log' }) );
      
}