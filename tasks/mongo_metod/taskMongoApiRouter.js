const express = require("express");

const Joi = require('joi');

const taskModul = require('./taskControllerMongo'); 

const apiResponse = require('../helpers/apiResponse');

const router = express.Router();


router.get('/todo', (req, res) => {
    const { page = 1, limit = 50 } = req.query;

    if (Number.isNaN(page) || Number.isNaN(limit) || page <= 0 || limit <= 0)
    {
       // res.status(400).send("Error parameters");
        return apiResponse.validationErrorWithData(res,"Error parameters",null);
    }

    taskModul.queryTaskPage(page, limit)
    .then(taskData=>
        {
            console.log("Паггінація");

            return apiResponse.successResponseWithData(res,"pagination",taskData);
        }
    )
    .catch(
        //вывести помилку!!!!!!!!
          
             (err)=>{
                console.log("Errrror");
                console.log(err);

                return apiResponse.errorResponse(res,"Internal Server Error ");
             }
        );
});

router.get('/todo/:id',(req, res) => {

    const idTask = req.params.id;
    console.log("YRAAA");
   
    taskModul.getTask(idTask).
    then(taskData=>
        {
            if (!taskData)
            {
                return apiResponse.notFoundResponse(res,"id not found response",);
            }
            return apiResponse.successResponseWithData(res,"get:id",taskData);
        }
    )
    .catch(
        //вывести помилку!!!!!!!!
          
             (err)=>{
                console.log("Errrror");
                return apiResponse.errorResponse(res,"Internal Server Error ");
            }
        );
});

router.post('/todo', (req, res) => {
  
    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if(valid.error)
    {
        return apiResponse.validationErrorWithData(res, "Not valid: ", req.body);
    }

    console.log(`reg body ${req.body.title}`);
    taskModul.addTask(req.body.title).then((taskData)=>{

        console.log("POST DATA:" + taskData);
        return apiResponse.successResponseWithData(res,"post",taskData);
    })
    .catch((err) => {
            console.log("rejectSave:" + err);
            return apiResponse.errorResponse(res,"Internal Server Error ");
        });
});

router.put('/todo/:id', (req, res) => {
    idTask = req.params.id;

    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if(valid.error)
    {
        res.status(400).send(valid.error);
        return valid.error;
    }

    taskModul.editTask(idTask, req.body.title).then(
        (taskData)=>{
            if (!taskData)
            {
                return  res.status(400).send("nofound element");
            }
        console.log("PUT DATA:");
        console.log(taskData);
        res.send(taskData);
        }
    ).catch((err) => {
        console.log("rejectSave:" + err);
        //висести ошибку!!!!!
    });
});

router.delete('/todo/:id', (req, res) => {
   
    const idTask = req.params.id;

    taskModul.deleteTask(idTask)
    .then((taskData)=>{
        console.log("DELETE DATA:");
        console.log(taskData);
        //res.send(taskData);
        if (taskData.deletedCount === 0) {
            return res.json('No quote to delete')
          }
        res.json(taskData);
    })
    .catch((err) => {
        console.log("rejectSave:" + err);
        //висести ошибку!!!!!
       // res.status(404).send(`No found element err = ${err}`);
    });
});

module.exports = router;


