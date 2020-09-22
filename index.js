const express = require("express");

var taskAPIRouter = require('./tasks/taskAPI');
var indexRouter = require('./tasks/index');

const app = express();
app.use(express.json());

app.use('/', indexRouter);
app.use('/api/tasks', taskAPIRouter);


const PORT = process.env.PORT||3000;

app.listen(PORT, ()=>{console.log(`Servers start PORT = ${PORT}`)});