const { ErrorResponse } = require("@remix-run/router")
const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getOneTasks = async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id})
        if(!task){
            return res.status(404).json({msg:"task not found.Please Try Again!!"})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json(error)
    }
}
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body,{
            new:true,
            runValidators:true,
        })
        if(!task){
            return res.status(404).json({msg:"task not found.Please Try Again!!"})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error.errors.task.message)
    }
}
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id})
        if(!task){
            return res.status(404).json({msg:"task not found.Please Try Again!!"})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json(error)
    }
}
const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error.errors.task.message)
    }
}

module.exports = {getAllTasks,getOneTasks,updateTask,deleteTask, createTask}