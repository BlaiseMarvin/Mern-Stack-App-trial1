const express = require('express');
const User = require('../models/user.model');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/',(req,res,next)=>{
    User.find()
    .exec()
    .then(users=>{
        res.status(200).json(users);
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        });
    });
});


router.post('/add',(req,res,next)=>{
    const newUser = new User({
        username : req.body.username
    }); 
    newUser.save()
    .then(()=>{
        res.status(200).json('User added!');
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        });
    });



});
module.exports = router;