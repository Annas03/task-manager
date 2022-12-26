const express = require('express')
const {ConnectDB, connectionString} = require('./db/connect')
const {getAllTasks,getOneTasks,updateTask,deleteTask, createTask} = require("./Controllers/task")

const app = express()

app.use(express.json());

app.get("/api/v1/task", getAllTasks)
app.post("/api/v1/task", createTask)
app.get("/api/v1/task/:id", getOneTasks)
app.patch("/api/v1/task/:id", updateTask)
app.delete("/api/v1/task/:id", deleteTask)

const start = async () => {
    try{
        await ConnectDB(connectionString)
        app.listen(5000, ()=>{
            console.log("Server is listning at Port 5000!!")
        })
    }
    catch(error){
        console.log({err:"Database Not Connected"})
    }
}

start()


