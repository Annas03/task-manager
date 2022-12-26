import React, { useState, useEffect} from 'react'
import Task from '../Task/Task'
import EditPage from '../EditPage/EditPage'

const Home = () => {
  const [taskList, setTaskList] = useState([])
  const [taskName, updatetaskName] = useState("")
  const [error, seterror] = useState("")
  const [editTask, setEditTask] = useState({edit:false, task_id:"", task_name:"", task_status:false})

  const FetchAllTasks = () => {
    fetch("/api/v1/task")
    .then(res => res.json())
    .then(res => setTaskList(res))
  }
  
  const onSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task:taskName })
    }
    fetch("api/v1/task/", requestOptions)
    .then(response => response.json())
    .then(res => {(typeof res === 'string') ? seterror(res): FetchAllTasks()})
    updatetaskName("")
    seterror("")
  }
     
  const AddTask = (event) => {
    updatetaskName(event.target.value)
  }

  useEffect(FetchAllTasks,[])

  if(!editTask.edit){
    return (
      <div className="w-11/12 font-semibold text-center max-w-xs mx-auto mt-20 sm:max-w-xs md:max-w-xs">
        <div className="bg-gray-300">
          <h1 className="text-2xl">Task Manager</h1>
          <div>
            <input value={taskName} type={'text'} id={'task'} placeholder='e.g. wash dishes' onChange={AddTask}></input>
            <button onClick={onSubmit}>Submit</button>
          </div>
        </div>
        {(taskList.length === 0) ? <p className='mt-4'>No Tasks Remaining</p> : taskList.map((t) => <Task key={t._id} id={t._id} task = {t.task} status={t.status} taskList={taskList} setTaskList={setTaskList} editTask={editTask} setEditTask={setEditTask}/>)}
        {(error !== "") && <p>{error}</p>}
      </div>
    )
  }
  else{
    return(
      <EditPage editTask={editTask} setEditTask={setEditTask} FetchAllTasks={FetchAllTasks}/>
    )
  }
}

export default Home