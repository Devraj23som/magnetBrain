"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const page = () => {
    const [userData, setUserData] = useState([]);
    const [Task, setTask] = useState([]);
    const Router=useRouter();
    const pagehandler=()=>{
        Router.push('/task')
    }
    const logoutHandler=async()=>{
      console.log("hello")
      localStorage.removeItem('authToken'); // or sessionStorage.removeItem('token');
      // Redirect to login page
      window.location.href = '/';
    };
        useEffect(() => {
      // console.log(token)
      const fetchData = async () => {
        var token =localStorage.getItem("authToken");
        try {
          const authToken = token;
          if (!authToken) {
            // Redirect to login page if authentication token is missing
            Router.push('/');
            return;
          }
          const response = await fetch('http://localhost:5000/api/users/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // withCredentials: true,
              authorization: `${authToken}`,
            },
            withCredentials: true
  
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setUserData([...userData,data]);
            setTask(data.tasks)
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
    }, []);
console.log(Task)
    return (
      <>
      {/* <Nav/> */}
     <div className='w-full h-fit overflow-x-hidden'>
     <div className='container relative w-screen h-full'>
      <div className='profilebg' >
  
      <button onClick={logoutHandler} className='bg-red-700 rounded-sm absolute right-0 text-white p-2'>Logout</button>
      </div>
        <div className=' rounded-lg box-border absolute left-72 top-10 w-3/5 h-64' >
        {userData.map((data,index)=>(
          <div className='text-center flex flex-col justify-center items-center' key={index}>
            <div className="profileImage flex justify-center items-center " key={index}>
              <h1 className=' text-center text-white text-8xl'>{data.name.charAt(0)}</h1>
            </div>
            
            <h1 className='text-white text-2xl'  id={index} >{data.name}</h1>
            <h1 className='text-white' id={index} key={data.id}>{data.email}</h1>
          </div> 
          
        ))}
        </div>
      <button onClick={pagehandler} className='bg-blue-500 text-white p-3'>Create Task</button>
      <button onClick={()=>Router.push('/tasklist')} className='bg-yellow-400 p-3 mx-2 '>Show All Task</button>
      <div className="container w-1/2 px-3">
        {Task.map((data,index)=>(
        //    <div key={index}> {data.title}</div>
        // <Link key={index} href={`/taskdetail/${data._id}`}>
        
            <div onClick={()=>Router.push(`/taskdetail/${data._id}`)}  key={index} className='flex px-2 rounded-md items-center justify-between gap-5 my-3 bg-gray-300 w-full '>
                <div key={data._id}>
                    <h2>{data.title}</h2>
                    <h2>{data.dueDate}</h2>
                </div>
                <div>
                <div key={index+3}>{data.status}</div>
                <div key={index+2}>Priority :<span className={`text-bold text-lg ${data.priority=="high"?"text-red-500":data.priority=="medium"?"text-blue-500":data.priority=="low"?"text-green-500":""}`}>{data.priority}</span> </div>

                </div>
            </div>
        // </Link>
            
        ))}
      </div>
      
      </div>
     </div>
  
        </>
    )
  }

export default page