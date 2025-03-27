'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: '' });
    const Router = useRouter();
  
    const handleChange = (e) => {
      setTask({ ...task, [e.target.name]: e.target.value });
    };
  
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
        const response = await fetch('http://localhost:5000/api/tasks/create', {
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
  
  return (
    <>
    
    
    
    <button onClick={()=>Router.push("/profile")} className='bg-blue-600 p-2 text-white'>Back</button>
    <div className='w-full h-screen flex justify-center items-center'>


    
    <div> <h1>Create Task</h1>
    <div className="container bg-blue-500 w-62 h-fit p-5">

    <form className='task flex flex-col items-center gap-3'  onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="date"  name="dueDate" onChange={handleChange} required />
      <select name="priority" onChange={handleChange} required>
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" className='bg-white w-20'>Create</button>
    </form>
    </div>
  </div>
  </div>
  </>
  )
}

export default page