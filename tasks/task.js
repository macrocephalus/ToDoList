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

};

function saveTask (tasks) {
    try {
        fs.writeFileSync(patchParams, JSON.stringify(tasks));
        console.log(`JSON write file`);
    } catch (error) {
        console.log(`Error ${error}`);
    }
};

module.exports = {
    addTask,
    //deleteTask,
    fetchTask,
    //getTask
    //logTask,
    //saveTask
};