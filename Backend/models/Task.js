const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task: {
        type:String,
        required:[true,"task must be present"],
        trim:true,
        maxlength:[20,"should not exceed 20 characters"]
    },
    status:{
        type:Boolean,
        required:false,
        default:false
    }
})

module.exports = mongoose.model("Task", TaskSchema)