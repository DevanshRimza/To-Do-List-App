const mongoose = require('mongoose');

const todoItemsSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    isCompleted: { 
        type: Boolean, default: false 
    },
});


module.exports = mongoose.model('ToDo', todoItemsSchema);