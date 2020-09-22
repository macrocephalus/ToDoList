const express = require("express");
const Joi = require('joi');
const taskModul = require('../tasks/task'); //???? для відносного шляшу починаємо з ..   а . з поточного

const router = express.Router();

router.get('/', function(req, res){
    
    const tasks = taskModul.fetchTask();

    res.send(tasks);
});

router.get('/page', function(req, res, next){

    const { page = 1, limit = 10 } = req.query;

    if (Number.isNaN(page) || Number.isNaN(limit) || page <= 0 || limit <= 0)
    {
        return res.status(400).send("Error parameters");
    }

    const simple = taskModul.queryTaskPage(page, limit)
    res.send(simple);
});

router.get('/:id',function(req, res, next){
    const idTask = parseInt(req.params.id);

    if (Number.isNaN(idTask))
    {
        return res.status(400).send("Error parameters");
    }

    let task = taskModul.getTask(idTask);

    if(!task || task == null || task ==[])
    {
        //res.status(404).send("The task not found");
        res.status(404);
        return res.send(`The task  id=${idTask} not found`);
    }

    res.send(task);
});

router.post('/', function(req, res, next){
  
    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if(valid.error)
    {
        res.status(400).send(valid.error);
        return valid.error;
    }

    const task = taskModul.addTask(req.body.title);

    res.send(task);
});

router.put('/:id', function (req, res, next) {
    idTask = parseInt(req.params.id);

    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if(valid.error)
    {
        res.status(400).send(valid.error);
        return valid.error;
    }

    const task = taskModul.editTask(idTask, req.body.title);

    if(!task || task == null)
    {
        res.status(404);
        return res.send(`The task  id=${idTask} not found`);
    }

    console.log(`edit task id ${idTask}`);

    res.send(task);
});

router.delete('/:id',function (req, res, next) {
   
    const idTask = parseInt(req.params.id);

    if (Number.isNaN(idTask))
    {
        return res.status(400).send("Error parameters");
    }

    const task = taskModul.deleteTask(idTask);
    
    if (task != null)
    {
        res.send(task);
    }else{
        res.status(404).send("No found element");
    }  
    
});

module.exports = router;


