'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const param=useParams();
  
    const [task, setTask] = useState({});
    const Router = useRouter();
  
    const handleChange = (e) => {
      setTask({ ...task,[e.target.name]: e.target.value });
      console.log(task + "strring")
    };
    const [taskData, settaskData] = useState([])
   const [taskID, settaskID] = useState(param.id);
   const handleSubmit = async (e) => {
    e.preventDefault();
 
    var token =localStorage.getItem("authToken");
    try {
      const authToken = token;
      if (!authToken) {
        // Redirect to login page if authentication token is missing
        Router.push('/');
        return;
      }
      const response = await fetch(`http://localhost:5000/api/tasks/update/${taskID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // withCredentials: true,
          authorization: `${authToken}`,
        },
        withCredentials: true,
        body: JSON.stringify(task),

      });
      if (response) {
        Router.push('/profile');
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    
  };
    useEffect(()=>{
      
        const fetchData=async()=>{
            const response=await fetch(`https://taskmanager-api-umd5.onrender.com/api/tasks/taskdata/${taskID}`)
            if(response){
                const data = await response.json();
                settaskData([...taskData,data.task])
            }
        } 
        fetchData();
    },[])
    console.log(taskData)
  return (
    <div id={1}>
        {taskData.map((data,index)=>(

<div key={index} className='w-full h-screen flex justify-center items-center'>


    
<div> <h1>update Task</h1>
<div className="container bg-blue-500 w-62 h-fit p-5">

<form className='task flex flex-col items-center gap-3' method='post' onSubmit={handleSubmit}>
  <input  name="title" placeholder="Title" defaultValue={data.title || ""} onChange={ handleChange} required />
  <textarea id={index} name="description" defaultValue={data.description || ""} placeholder="Description" onChange={handleChange} required />
  <input key={index+1} type="date"  name="dueDate" value={data.dueDate.split('T')[0]} onChange={handleChange} required />
  <select name="status" onChange={handleChange} required>
    <option value="">Select status</option>
    <option value="pending">pending</option>
    <option value="completed">completed</option>
  
  </select>
  <select name="priority" onChange={handleChange} required>
    <option value="">Select Priority</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </select>
  <button type="submit" className='bg-white w-20'>Update</button>
</form>
</div>
</div>
</div>


))}
    </div>
  )
}

export default page