const express = require("express");

const Joi = require('joi');

const apiResponse = require('../helpers/apiResponse');
const notice = require('../helpers/notice.json');

const taskService = require('./taskService'); 

const router = express.Router();

router.get('/todo', (req, res) => {
    const { page = 1, limit = 50 } = req.query;

    if (Number.isNaN(page) || Number.isNaN(limit) || page <= 0 || limit <= 0) {
        return apiResponse.validationErrorWithData(res, notice.errNote.e400, null);
    }

    taskService.queryTaskPage(page, limit)
    .then((taskData) => {
            console.log("Паггінація");

            return apiResponse.successResponseWithData(res, notice.successNote.pagination, taskData);
        })
    .catch((err) => {
                console.log("Eror");
                console.log(err);

                return apiResponse.errorResponse(res, notice.errNote.e500);
             });
});

router.get('/todo/:id', (req, res) => {
    const idTask = req.params.id;
   
    taskService.getTask(idTask)
    .then((taskData) => {
            if (!taskData) { 
                return apiResponse.notFoundResponse(res, notice.errNote.e404);
            }

            return apiResponse.successResponseWithData(res, notice.successNote.getId, taskData);
        })
    .catch((err) => {
                console.error(err);

                return apiResponse.errorResponse(res, notice.errNote.e500);
            }
        );
});

router.post('/todo', (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if (valid.error) {
        return apiResponse.validationErrorWithData(res, notice.errNote.e400, req.body);
    }

    taskService.addTask(req.body.title)
    .then((taskData) => {
        console.log("POST DATA:" + taskData);

        return apiResponse.successResponseWithData(res, notice.successNote.post, taskData);
    })
    .catch((err) => {
            console.log("rejectSave:" + err);

            return apiResponse.errorResponse(res, notice.errNote.e500);
        });
});

router.put('/todo/:id', (req, res) => {
    const idTask = req.params.id;

    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if (valid.error) {
        console.error(valid.error);

        return apiResponse.validationErrorWithData(res, notice.errNote.e400, req.body);
    }

    taskService.editTask(idTask, req.body.title)
    .then((taskData) => {
            if (!taskData) {
                return apiResponse.notFoundResponse(res, notice.errNote.e404);
            }

        console.log("PUT DATA:");
        console.log(taskData);

        return apiResponse.successResponseWithData(res, notice.successNote.put, taskData);
        })
    .catch((err) => {
        console.error(err);

        return apiResponse.errorResponse(res, notice.errNote.e500);
    });
});

router.delete('/todo/:id', (req, res) => {
    const idTask = req.params.id;

    taskService.deleteTask(idTask)
    .then((taskData) => {
        console.log("DELETE DATA:");
        console.error(taskData);

        if (taskData.deletedCount === 0) {
            return apiResponse.notFoundResponse(res, notice.errNote.e404);
          }

          return apiResponse.successResponseWithData(res, notice.successNote.delete, taskData);
    })
    .catch((err) => {
        console.error(err);

        return apiResponse.errorResponse(res, notice.errNote.e500);
    });
});

module.exports = router;
