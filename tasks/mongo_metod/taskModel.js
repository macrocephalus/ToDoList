const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	title: {type: String, required: true}
});

const Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;