"use client"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = (props) => {
    const param=useParams();
    const Router=useRouter();
    const [taskData, settaskData] = useState([])
   const [taskID, settaskID] = useState(param.id);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [taskToDelete, setTaskToDelete] = useState(null);
 
   const openModal = (taskId) => {
     setTaskToDelete(taskId);
     setIsModalOpen(true);
   };
 
   const closeModal = () => {
     setTaskToDelete(null);
     setIsModalOpen(false);
   };
 
  
   const deleteHandler=async()=>{
       Router.push("/profile")
       await axios.get(`http://localhost:5000/api/tasks/delete/${taskToDelete}`)

   }
   useEffect(()=>{
      
        const fetchData=async()=>{
            const response=await fetch(`http://localhost:5000/api/tasks/taskdata/${taskID}`)
            if(response){
                const data = await response.json();
                settaskData([...taskData,data.task])
            }
        } 
        fetchData();
    },[])
   console.log(taskData)
  return (
    <div className='w-full h-screen '>
        <h1 className='text-2xl'>Task</h1>
        <button onClick={()=>Router.push("/profile")} className='bg-blue-600 p-2 text-white'>Back</button>
        <div className=" flex justify-center w-full h-96">

        <div className="container w-1/2 p-5 rounded-md h-full bg-gray-200">
        {taskData.map((data,index)=>(
            <div key={index}>

                <h2 className='text-3xl text-center'>Title</h2>
                <h3 className='text-xl uppercase text-center text-blue-500' key={index}>{data.title}</h3>
                <h4 id={index}>Description : {data.description}</h4>
                <div>Status : {data.status == "pending" ? <h4 className='text-red-600 text-lg'>Pending</h4>:<h4 className='text-green-500'>completed</h4>}</div>
                <div>Priority :<h4 className='text-xl font-bold'>{data.priority}</h4> </div>
            <div>Due Date : <h4 className='font-mono font-bold'>{data.dueDate}</h4></div>

           <a href={`/taskupdate/${data._id}`}>
           
            <button className='bg-blue-400 mx-2 text-white p-2'>
                update Task
            </button>
           </a>

    <button onClick={()=>openModal(data._id)} className='bg-red-400 text-white p-2'>Delete</button>
    
            </div>
        ))}
        </div>
        {isModalOpen && (
            <div className="modal absolute rounded-lg top-5 bg-red-600 text-white p-5">
              <div className="modal-content">
                <p >Are you sure you want to delete this task?</p>
               <div className='flex justify-center'> <button className='bg-yellow-400 p-1 mx-2' onClick={deleteHandler}>Yes</button>
               <button className='bg-yellow-400 p-1' onClick={closeModal}>No</button></div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default page