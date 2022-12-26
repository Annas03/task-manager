import React, { useState } from 'react'

const EditPage = ({editTask,setEditTask, FetchAllTasks}) => {

  const [taskName, setTaskName] = useState(editTask.task_name)
  const [taskStatus, setTaskStatus] = useState(editTask.task_status)
  const [err, setErr] = useState("")

  const goHome = ()=> {
    FetchAllTasks();
    setEditTask(!editTask)
  }
  const changeTask = (event) => {
    setTaskName(event.target.value)
  }
  const statusChanged = () => {
    setTaskStatus((previousState) =>!previousState)
  }
  const onEdit = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task:taskName,status:taskStatus })
    }
    fetch("api/v1/task/" + editTask.task_id,requestOptions)
    .then(response => response.json())
    .then(res => {
      if(typeof res === 'string'){
        setErr(res)
      }
      else{
        setTaskName(res.task)
        setTaskStatus(res.status)
        setErr("")
      }
    })
  }
  return (
    <div className="w-11/12 max-w-xs mx-auto mt-20 sm:max-w-xs md:max-w-xs bg-cyan-200 ">
      <h1 className="text-2xl font-semibold text-center">Edit Task</h1>
      <div className='flex mt-4 pb-4 flex-wrap'>
        <div className='ml-4'>
          <p>Task ID</p>
          <p>Name</p>
          <p>Completed</p>
        </div>
        <div className='ml-4'>
          <p>{editTask.task_id}</p>
          <input className='block' value={taskName} onChange={changeTask} type="text"/>
          {(taskStatus === false) ? <input onChange={statusChanged} type="checkbox"/> : <input onChange={statusChanged} type="checkbox" checked/>}
        </div>
        {(err !== "")&&<p className='mx-auto font-semibold text-red-400'>{err}</p>}
        <button onClick={onEdit} className='w-9/12 mx-auto bg-gray-400 rounded mt-4'>Edit</button>
      </div>
      <button onClick={goHome} className="bg-red-200">Back Home</button>
    </div>
  )
}

export default EditPage