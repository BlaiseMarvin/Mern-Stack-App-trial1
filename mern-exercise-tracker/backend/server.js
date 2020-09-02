const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

 

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://mern-stack:'+'mern-stack'+'@mern-stack.vafje.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser:true,useCreateIndex:true, useMongoClient:true
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection established successfully');

})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

app.listen(port,()=>{
    console.log('Server is running on port ' +port);
});

