const express = require("express");

const Joi = require('joi');

const apiResponse = require('../helpers/apiResponse');

const taskModul = require('./taskControllerMongo'); 

const router = express.Router();

router.get('/todo', (req, res) => {
    const { page = 1, limit = 50 } = req.query;

    if (Number.isNaN(page) || Number.isNaN(limit) || page <= 0 || limit <= 0) {
        return apiResponse.validationErrorWithData(res, "Error parameters", null);
    }

    taskModul.queryTaskPage(page, limit)
    .then((taskData) => {
            console.log("Паггінація");

            return apiResponse.successResponseWithData(res, "pagination", taskData);
        }
    )
    .catch((err) => {
                console.log("Errrror");
                console.log(err);

                return apiResponse.errorResponse(res, "Internal Server Error");
             }
        );
});

router.get('/todo/:id', (req, res) => {
    const idTask = req.params.id;
    console.log("YRAAA");
   
    taskModul.getTask(idTask)
    .then((taskData)=>
        {
            if (!taskData) { 
                return apiResponse.notFoundResponse(res, "id not found response",);
            }

            return apiResponse.successResponseWithData(res, "get:id", taskData);
        }
    )
    .catch((err)=>{
                console.log("Errrror");

                return apiResponse.errorResponse(res, "Internal Server Error ");
            }
        );
});

router.post('/todo', (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if (valid.error) {
        return apiResponse.validationErrorWithData(res, "Not valid: ", req.body);
    }

    taskModul.addTask(req.body.title)
    .then( (taskData) => {
        console.log("POST DATA:" + taskData);

        return apiResponse.successResponseWithData(res, "post",taskData);
    })
    .catch( (err) => {
            console.log("rejectSave:" + err);

            return apiResponse.errorResponse(res, "Internal Server Error ");
        });
});

router.put('/todo/:id', (req, res) => {
    idTask = req.params.id;

    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if (valid.error) {
        console.error(valid.error);

        return apiResponse.validationErrorWithData(res, "Not valid: ", req.body);
    }

    taskModul.editTask(idTask, req.body.title)
    .then((taskData) => {
            if (!taskData) {

                return apiResponse.notFoundResponse(res, "not found object");

            }
        console.log("PUT DATA:");
        console.log(taskData);

        return apiResponse.successResponseWithData(res, "put",taskData);

        }
    )
    .catch((err) => {
        console.error(err);

        return apiResponse.errorResponse(res, "Internal Server Error ");

    });
});

router.delete('/todo/:id', (req, res) => {
   
    const idTask = req.params.id;

    taskModul.deleteTask(idTask)
    .then((taskData)=>{
        console.log("DELETE DATA:");
        console.err(taskData);
        if (taskData.deletedCount === 0) {
            return apiResponse.notFoundResponse(res, "not found object");
          }

          return apiResponse.successResponseWithData(res, "delete", taskData);

    })
    .catch((err) => {
        console.error(err);

        return apiResponse.errorResponse(res, "Internal Server Error ");
    });
});

module.exports = router;


