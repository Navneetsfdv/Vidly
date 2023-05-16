const winston = require('winston');
const express = require('express');
const app = express(); 

  

 const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));  

app.use(express.static('public'));

require('./startup/logging')();
require('./startup/routes')(app); 
require('./startup/Mongodb')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);
 