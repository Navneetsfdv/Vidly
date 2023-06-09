 const config = require('config');
 const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
   const token = req.header('x-auth-token'); 
   if(!token) return res.status(401).send('Acess denied no token , set Headers with key : x-auth-token and value : generated JWT token'); 

 try{
    const decoded = jwt.verify(token , config.get('jwtPrivateKey'));
    req.user = decoded;  
    next();
 } 
 catch(ex){
    return res.status(400).send('invalid token');
 }
   
}  
