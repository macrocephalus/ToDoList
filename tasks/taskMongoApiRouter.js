const express = require("express");
const Joi = require('joi');
const taskModul = require('../tasks/taskControllerMongo'); 
const router = express.Router();

router.get('/', (req, res) => {

    const task = {
        title : "zavdania"
    }
     taskModul.saveTask(task)
        .then((taskData)=>{ console.log(`Task data = ${taskData}`); res.send(taskData);})
        .catch((reject) => {
            console.log("rejectSave:" + reject);
        });
  
 
});

router.get('/page', (req, res) => {

    const { page = 1, limit = 10 } = req.query;

    if (Number.isNaN(page) || Number.isNaN(limit) || page <= 0 || limit <= 0)
    {
        return res.status(400).send("Error parameters");
    }

    const simple = taskModul.queryTaskPage(page, limit)
    res.send(simple);
});

router.get('/:id',(req, res) => {
    const idTask = parseInt(req.params.id);

    if (Number.isNaN(idTask))
    {
        return res.status(400).send("Error parameters");
    }

    let task = taskModul.getTask(idTask);

    if(!task || task === null || task === undefined)
    {
        //res.status(404).send("The task not found");
        res.status(404);
        return res.send(`The task  id=${idTask} not found`);
    }

    res.send(task);
});

router.post('/', (req, res) => {
  
    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if(valid.error)
    {
        res.status(400).send(valid.error);

        return valid.error;
    }

    console.log(`reg body ${req.body.title}`);
    taskModul.addTask(req.body.title).then((taskData)=>{

        console.log("PUT DATA:" + taskData);
        res.send(taskData);
    })
    .catch((err) => {
            console.log("rejectSave:" + err);
        });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
   
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


