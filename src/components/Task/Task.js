import React from 'react'

const Task = ({id,status, task, taskList, setTaskList, editTask, setEditTask}) => {
  const onDelete = () =>{
    const requestOptions = {method: 'DELETE'}
    fetch("api/v1/task/"+id,requestOptions)
    .then(res => res.json())
    .then(r => r)
    setTaskList(taskList.filter((t) => t._id !== id))
  }
  const onEdit = () => {
    setEditTask({edit:true, task_id:id, task_name:task, task_status:status})
  }

  return (
    <div className='flex justify-around bg-cyan-200'>
        <p id='IsCompleted'>{status.toString()}</p>
        <p>{task}</p>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Task