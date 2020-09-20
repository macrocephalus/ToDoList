const fs = require('fs');


const patchParams = './tasks.json'
//повертає список тасків з файлу
function fetchTask() {
    try {
       let tasksStrng = fs.readFileSync('tasks.json');
       return JSON.parse(tasksStrng);
        
    } catch (error) {
        console.log(`Error read file - ${error} `);
        return [];
    }
};


function addTask(title)
{
    const tasks = fetchTask();

    const task = {
        id : tasks.length,
        title : title
    }

    tasks.push(task);
    saveTask(tasks);

    return task;
};

function saveTask (tasks) {
    try {
        fs.writeFileSync(patchParams, JSON.stringify(tasks));
        console.log(`JSON write file`);
    } catch (error) {
        console.log(`Error ${error}`);
    }
};

function queryTaskPage(page, limit) {

    const tasks = fetchTask();

    const sampleEnd = page * limit;
    const sampleStart = sampleEnd - limit;

    const simple = tasks.filter( (t)=>t.id >=sampleStart && t.id < sampleEnd) // спробувати зробити що приймаэ функцію
    //res.send(`page = ${page}  limit = ${limit}   sampleStart = ${sampleStart}  sampleEnd = ${sampleEnd} \n`);
    return simple;
} 

function getTaskId(idTask) {

    const tasks = fetchTask();

    const task = tasks.find(t=>t.id == idTask);

    return task;
}

module.exports = {
    addTask,
    //deleteTask,
    fetchTask,
    queryTaskPage,
    getTaskId,
    //getTask
    //logTask,
    //saveTask
};