'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const Router=useRouter();

const [Task, setTask] = useState([])
const [priorityState, setpriorityState] = useState('')
    const [pagenation, setPagenation] = useState(1);
    const pagehandler=(e)=>{
  console.log(e)
      if(pagenation==1 && e==-1){

      }
      else{
        const oldvalue=pagenation;
        const newvalue=oldvalue+e;
        setPagenation(newvalue);
     

      }
    }
    const priorityHandler=(e)=>{
setpriorityState(e.target.value)
    }
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
          const endpoint=priorityState === 'all' || '' ? "http://localhost:5000/api/tasks/list" : `http://localhost:5000/api/tasks/list/${priorityState}`;
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // withCredentials: true,
              authorization: `${authToken}`,
            },
            body: JSON.stringify({pagenation}),
            withCredentials: true
  
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data.tasks)
          
            setTask(data.tasks)

          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
    }, [priorityState,pagenation]);
  return (
    <div>
      <button onClick={()=>Router.push("/profile")} className='bg-blue-600 p-2 text-white'>Back</button>
      <select name="priority" onChange={priorityHandler} >
        <option value="all">Select priority</option>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
       <div className="container w-1/2 h-3/4  px-3">
        {Task && Task.map((data,index)=>(
        //    <div key={index}> {data.title}</div>
    
        <Link key={index} href={`/taskdetail/${data._id}`}>
            <div  key={index} className='flex px-2 rounded-md items-center justify-between gap-5 my-3 bg-gray-300 w-full '>
                <div key={data._id}>
                    <h2>{data.title}</h2>
                    <h2>{data.dueDate}</h2>
                </div>
                <div>
                <div key={index+3}>{data.status}</div>
                <div key={index+2}>Priority :<span className={`text-bold text-lg ${data.priority=="high"?"text-red-500":data.priority=="medium"?"text-blue-500":data.priority=="low"?"text-green-500":""}`}>{data.priority}</span> </div>

                </div>
            </div>
            </Link>
            
        ))}
      </div>
        <div className="buttons container absolute flex items-center gap-3  bottom-3 w-52 h-12 " >
          <button className='bg-gray-400 p-2 ' onClick={()=>pagehandler(-1)}>prev</button>
          <h2>{pagenation}</h2>
          <button className={`bg-gray-400 p-2  `} onClick={()=>{Task.length<8 ? "":pagehandler(1)}}>next</button>
        </div>
    </div>
  )
}

export default page