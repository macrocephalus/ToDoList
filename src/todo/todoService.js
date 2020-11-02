const fs = require('fs');

const Todo = require('./todoModel');

/**
 * 
 * Додає нове завдання
 */
async function addTodo(titleData) {
    const task = {
        title : titleData
    };

    return saveTodo(task)
        .then((taskData) => { 
            console.log("Add");

            logTodo(taskData);
        
            return taskData;
         })
        .catch((err) => {
            console.log("rejectSave:" + reject);

            return Promise.reject(err);
        });
}

/** 
 * Зберігає в Mongo
*/
async function saveTodo (taskData) {
    const task = new Todo(taskData);

    try {
        const result = await task.save();

        console.log(result);

        return Promise.resolve(result);
    } catch (err) {
        console.log(err.message)

        return Promise.reject(err);
    }
}

/**
 *  Запит який повертає масив значень по номеру сторінки і кільсоксті записів
 */
async function getTodos(dataPage, dataLimit) {
    try {
        const task = await Todo
        .find()
        .skip((dataPage-1)*dataLimit)
        .limit(dataLimit);

        console.log("Get Task");

        return Promise.resolve(task);
    } catch (err) {
        console.log(err.message);

        return Promise.reject(err);
    }
} 

/**
 * Повертає таск по id
 */
async function getTodo(idTask) {
    try {
        const task = await Todo.findById(idTask);
      
        if (!task) {
            return Promise.resolve(null);
        }

        console.log("Get Task");
        console.log(task);

        return Promise.resolve(task);
    } catch (err) {
        console.log(err.message);

        return Promise.reject(err);
    }
}

/**
 * Редагує таск по id
 */
async function editTodo(idTask, dataTitle) {
    try {
        const task = await Todo.findByIdAndUpdate(
            { _id: idTask }, 
            {
            $set: {
                title: dataTitle
            }
        },
        { new: true }
        );

        console.log(task);
        
        return Promise.resolve(task);
    } catch (err) {
        console.log(err.message);

        return Promise.reject(err);
    }
}

/**
 * Видаляє тас по id
 */
async function deleteTodo(idTask) {
    try {
        const result = await Todo.deleteOne({ _id: idTask });

        console.log("Delete");
        console.log(result);

        return Promise.resolve(result);
    } catch (err) {
        console.log(err.message);

        return Promise.reject(err);
    }
}
/**
 * Виведнння таску в консоль
 */
function logTodo(task) {
    console.log('----------');
    console.log(`id: ${task._id}`);
    console.log(`title: ${task.title}`);
}

module.exports = {
    addTodo,
    deleteTodo,
    getTodos,
    getTodo,
    editTodo,
};
