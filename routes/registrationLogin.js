var express=require('express');
var registrationLogin = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user')
var jwt    = require('jsonwebtoken'); 
var superSecret = require('../config/config');

registrationLogin.post('/registration',function(req,res){
    if(req.body.email && req.body.password){
        var userSave=new user({
            email:req.body.email,
            password:req.body.password
        })

        userSave.save(function(err,data){
            if(err){
            res.json({succsess:false})
            }
            else{
                res.json({
                    success: true,
                    data: data
                })
            }

        })
    }
    else{
        res.json({
            success: false,
            msg: "No data entered"
        })
    }

})


registrationLogin.post('/login',function(req,res){
    if(!req.body.email || !req.body.password){
        res.json({
            success:false,
            msg:"no data entered"
        })
    }
    else{
      user.findOne({
          email:req.body.email
      },function(err,user){
        if(err) throw err;
         if(!user){
             res.json({
                 success:false,
                 msg:"user is not registered"
             })
         }
         else if(user){
                if(req.body.password!=user.password){
                    res.json({
                        success:false,
                        msg:'Authentication failed. Wrong password.'
                    })
                }
                else{
                    var emailToken={
                        email:user.email
                    }
                    var token=jwt.sign(emailToken,superSecret.secret,{
                        expiresIn:86400
                    });
                }
                res.json({
                    success: true,
                    message: 'token generated',
                    token: token
                  });
         }
      })
    }
})

module.exports = registrationLogin;