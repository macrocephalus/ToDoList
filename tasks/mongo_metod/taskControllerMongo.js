const fs = require('fs');

const Task = require('./taskModel');

/**
 * 
 * Додає нове завдання
 */
async function addTask(titleData) {
    const task = {
        title : titleData
    };

    return saveTask(task)
        .then((taskData) => { 
            console.log("Add");

            logTask(taskData);
        
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
async function saveTask (taskData) {
    const task = new Task(taskData);

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
async function queryTaskPage(dataPage, dataLimit) {
    try {
        const task = await Task
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
async function getTask(idTask) {
    try {
        const task = await Task.findById(idTask);
      
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
async function editTask(idTask, dataTitle) {
    try {
        const task = await Task.findByIdAndUpdate(
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
async function deleteTask(idTask) {
    try {
        const result = await Task.deleteOne({ _id: idTask });

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
function logTask(task) {
    console.log('----------');
    console.log(`id: ${task._id}`);
    console.log(`title: ${task.title}`);
}

module.exports = {
    addTask,
    deleteTask,
    queryTaskPage,
    getTask,
    editTask,
};