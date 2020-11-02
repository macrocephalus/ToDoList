const express = require("express");

const Joi = require('joi');

const apiResponse = require('../helpers/apiResponse');

const responseMessege= require('../constants/responseMessege');

const todoService = require('./todoService'); 

const router = express.Router();

router.get('/todo', (req, res) => {
    const { page = 1, limit = 50 } = req.query;

    if (Number.isNaN(page) || Number.isNaN(limit) || page <= 0 || limit <= 0) {
        return apiResponse.validationErrorWithData(res, responseMessege.err.e400, null);
    }

    todoService.getTodos(page, limit)
    .then((todoData) => {
            console.log(responseMessege.success.pagination);

            return apiResponse.successResponseWithData(res, responseMessege.success.pagination, todoData);
        })
    .catch((err) => {
                console.log("Eror");
                console.log(err);

                return apiResponse.errorResponse(res, responseMessege.err.e500);
             });
});

router.get('/todo/:id', (req, res) => {
    const idTask = req.params.id;
   
    todoService.getTodo(idTask)
    .then((todoData) => {
            if (!todoData) { 
                return apiResponse.notFoundResponse(res, responseMessege.err.e404);
            }

            return apiResponse.successResponseWithData(res, responseMessege.success.getId, todoData);
        })
    .catch((err) => {
                console.error(err);

                return apiResponse.errorResponse(res, responseMessege.err.e500);
            }
        );
});

router.post('/todo', (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(300).required()
    });

    const valid = schema.validate(req.body);

    if (valid.error) {
        return apiResponse.validationErrorWithData(res, responseMessege.err.e400, req.body);
    }

    todoService.addTodo(req.body.title)
    .then((todoData) => {
        console.log("POST DATA:" + todoData);

        return apiResponse.successResponseWithData(res, responseMessege.success.post, todoData);
    })
    .catch((err) => {
            console.log("rejectSave:" + err);

            return apiResponse.errorResponse(res, responseMessege.err.e500);
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

        return apiResponse.validationErrorWithData(res, responseMessege.err.e400, req.body);
    }

    todoService.editTodo(idTask, req.body.title)
    .then((todoData) => {
            if (!todoData) {
                return apiResponse.notFoundResponse(res, responseMessege.err.e404);
            }

        console.log("PUT DATA:");
        console.log(todoData);

        return apiResponse.successResponseWithData(res, responseMessege.success.put, todoData);
        })
    .catch((err) => {
        console.error(err);

        return apiResponse.errorResponse(res, responseMessege.err.e500);
    });
});

router.delete('/todo/:id', (req, res) => {
    const idTask = req.params.id;

    todoService.deleteTodo(idTask)
    .then((todoData) => {
        console.log("DELETE DATA:");
        console.error(todoData);

        if (todoData.deletedCount === 0) {
            return apiResponse.notFoundResponse(res, responseMessege.err.e404);
          }

          return apiResponse.successResponseWithData(res, responseMessege.success.delete, todoData);
    })
    .catch((err) => {
        console.error(err);

        return apiResponse.errorResponse(res, responseMessege.err.e500);
    });
});

module.exports = router;
