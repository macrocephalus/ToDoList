const express = require("express");
const Joi = require('joi');
const taskModul = require('../tasks/task'); //???? для відносного шляшу починаємо з ..   а . з поточного

const router = express.Router();



const tasks = taskModul.fetchTask();

router.get('/', function(req, res){
    
    const tasks = taskModul.fetchTask();

    res.send(tasks);
});

router.get('/page', function(req, res){

    const { page = 1, limit = 10 } = req.query;

    if (Number.isNaN(page) || Number.isNaN(limit) || page <= 0 || limit <= 0)
    {
        return res.status(400).send("Error parameters");
    }

    const simple = taskModul.queryTaskPage(page, limit)
    res.send(simple);
});

router.get('/:id',function(req, res){
    const idTask = parseInt(req.params.id);

    if (Number.isNaN(idTask))
    {
        return res.status(400).send("Error parameters");
    }

    let task = taskModul.getTaskId(idTask);

    if(!task || task == null || task ==[])
    {
        //res.status(404).send("The task not found");
        res.status(404);
        return res.send(`The task  id=${idTask} not found`);
    }

    res.send(task);
});

router.post('/', function(req, res){
  
    /*const shemaValid = {
        title : Joi.string().min(3).required()
    }*/
    const task = {
        id : tasks.length,
        title : req.body.title
    }

    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);


    if(valid.error)
    {
        res.status(400).send(valid.error);
        return valid.error;
    }

    tasks.push(task);
    res.send(task);
});

router.put('/:id', function (req, res) {
    idTask = parseInt(req.params.id);

    let task = tasks.find(t=>t.id == idTask);
    if(!task || task == null)
    {
        //res.status(404).send("The task not found");
        res.status(404);
        return res.send(`The task  id=${idTask} not found`);
    }

    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if(valid.error)
    {
        res.status(400).send(valid.error);
        return valid.error;
    }

    task.title = req.body.title;
    res.send(task);
});

router.delete('/:id',function (req, res) {
   
    const idTask = parseInt(req.params.id);

    if (Number.isNaN(idTask))
    {
        return res.status(400).send("Error parameters");
    }

    const idDelete = tasks.findIndex(t => t.id === idTask);

    //res.send("YES ELEMENT" + idTask + "   " + idDelete,);
    if (idDelete > -1)
    {
        //const task = tasks[idDelete];
        const task = tasks.splice(idDelete, 1);
        res.send(task);
    }else{
        res.status(404).send("No found element");
    }
    
});

module.exports = router;


