const express = require("express");
//const Joi = require('joi');
//const  taskModul = require('./tasks/task');

var taskAPIRouter = require('./tasks/taskAPI');

const app = express();
app.use(express.json());

app.use('/api/tasks', taskAPIRouter);


const PORT = process.env.PORT||3000;

app.listen(PORT, ()=>{console.log(`Servers start PORT = ${PORT}`)});