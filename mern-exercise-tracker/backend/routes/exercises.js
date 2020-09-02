const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');
const mongoose = require('mongoose');



router.get('/',(req,res,next)=>{
    Exercise.find()
    .exec()
    .then(exercises=>{
        res.status(200).json(exercises);
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        });
    });
});


router.post('/add',(req,res,next)=>{
    const newExercise = new Exercise({
        username : req.body.username,
        description : req.body.description,
        duration : Number(req.body.duration),
        date: Date.parse(req.body.date)

    }); 
    newExercise.save()
    .then(()=>{
        res.status(200).json({
            message:"Exercise added"
        });
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        });
    });



});

router.get('/:id',(req,res,next)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>{
        res.json(exercise);
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        });
    });
});

router.delete('/:id',(req,res,next)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).json('Exercise deleted')
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        });
    });

});

router.post('/update/:id',(req,res,next)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>{
        exercise.username = req.body.username;
        exercise.description=req.body.description;
        exercise.duration=Number(req.body.duration);
        exercise.date=Date.parse(req.body.date);

        exercise.save()
        .then(()=>{
            res.json('Exercise updated!')

        })
        .catch(err=>{
            res.status(400).json({
                error:err
            });
        })
        .catch(err=>{
            res.status(400).json({
                error:err
            });
        });
    })
    .catch();
})

module.exports = router;