var jwt    = require('jsonwebtoken');
var superSecret = require('../config/config');

jwtVerify=(function(req,res,next){
    console.log('headers',req.headers)
 var token= req.body.token || req.params.token || req.headers['x-access-token'];

 if(token){
     jwt.verify(token,superSecret.secret,function(err,decoded){
         if(err){
            
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
         }
         else{
             req.decoded=decoded;
             next();
         }
     });

 }
 else{
     return res.status(403).send({
        success: false, 
        message: 'No token provided.'
     });
 }
});

module.exports =jwtVerify;
