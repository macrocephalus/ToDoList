const fs = require('fs');

const patchParams = './tasks.json'

/**
 * Повертає список тасків з файлу
 */
function fetchTask() {
    try {
       let tasksStrng = fs.readFileSync(patchParams);

       console.log(`JSON read file`);

       return JSON.parse(tasksStrng);
        
    } catch (error) {
        console.log(`Error read file - ${error} `);
        return [];
    }
};

/**
 * 
 * Додає нове завдання
 */
function addTask(title)
{
    const tasks = fetchTask();

    const task = {
        id : tasks.length,
        title : title
    }

    tasks.push(task);
    saveTask(tasks);

    console.log("Add");
    logTask(task);

    return task;
};
/** 
 * Зберігає масив завданнь у файл JSON
*/
function saveTask (tasks) {
    try {
        fs.writeFileSync(patchParams, JSON.stringify(tasks));
        console.log(`JSON write file`);
    } catch (error) {
        console.log(`Error ${error}`);
    }
};

/**
 *  Запит який повертає масив значень по номеру сторінки і кільсоксті записів
 */
function queryTaskPage(page, limit) {

    const tasks = fetchTask();

    const sampleEnd = page * limit;
    const sampleStart = sampleEnd - limit;

    const simple = tasks.filter( (t)=>t.id >=sampleStart && t.id < sampleEnd);
   
    return simple;
} 

/**
 * Повертає таск по id
 */
function getTask(idTask) {

    const tasks = fetchTask();

    const task = tasks.find(t=>t.id === idTask);

    if (task === undefined)
        return undefined;

    console.log("Get Task");
    logTask(task);

    return task;
}

/**
 * Редагує таск по id
 */
function editTask(idTask, title) {

    const tasks = fetchTask();
    let task = tasks.find(t=>t.id === idTask);

    if(!task || task == null)
    {
        return null;
    }

    task.title = title;
    saveTask(tasks);

    console.log("Edit Task");
    logTask(task);


    return task;
}

/**
 * Видаляє тас по id
 */
function deleteTask(idTask) {

    const tasks = fetchTask();

    const idDelete = tasks.findIndex(t => t.id === idTask);

    if (idDelete > -1)
    {
        const task = tasks.splice(idDelete, 1);
        saveTask(tasks);

        console.log("Delete Task");
        logTask(task);  

        return task;
    }else{
        return null;
    }
}
/**
 * Виведнння таску в консоль
 */
function logTask(task) {
    console.log('----------');
    console.log(`id: ${task.id}`);
    console.log(`title: ${task.title}`);
    
}

module.exports = {
    addTask,
    deleteTask,
    fetchTask,
    queryTaskPage,
    getTask,
    editTask,
};