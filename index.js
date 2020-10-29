const express = require("express");

const indexRouter = require('./tasks/index');
const taskController = require('./tasks/mongo_metod/taskController');

const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://botak:asdfghjkl123@cluster0.wtkub.mongodb.net/todos?retryWrites=true&w=majority'

mongoose.connect(
    MONGODB_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log(`Now connected to MongoDB! url = ${MONGODB_URL}`))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());

app.use('/', indexRouter);
app.use('/api/mongo', taskController);

app.listen(PORT, () => { console.log(`Servers start PORT = ${PORT}`) });
