'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const Router=useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const submitHandler=async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: true,
        },
        body: JSON.stringify(formData),
      });
      
      if (response) {
        const { token } = await response.json();

        localStorage.setItem('authToken', token);
        Router.push('/profile');
      } else {
        console.error('Login failed');
    
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  console.log(JSON.stringify(formData))

};
  return (
    
       <div className='md:block sm:w-full loginpage lg:w-screen h-screen bg-black'>
      <div className="container w-full h-full flex justify-center items-center ">
        <div className="card bg-black p-5 h-auto absolute flex flex-col justify-center items-center gap-5 ">
          <h2 className='text-gray-200 text-2xl'>Create Account</h2>
         {/* <form method='POST' className='flex flex-col gap-2' onSubmit={submitHandler}> */}
         <input onChange={handleChange} type="text" value={formData.name} name='name' placeholder='name' />
          <input onChange={handleChange} type="email" value={formData.email} name='email' placeholder='email' />
          <input onChange={handleChange} type="password" value={formData.password} name='password' placeholder='password' />
          <button type='submit' onClick={submitHandler} className='bg-black m-2 px-3 py-2 rounded-md text-white font-medium'>Create Now</button>
         <h3 className='text-white text-2xl'>or</h3>
          <button type='submit' onClick={(e)=>{e.preventDefault(); Router.push('/login')}} className='bg-black m-2 px-3 py-2 rounded-md text-white font-medium'>Go to login </button>
         
         {/* </form> */}
        </div>
      </div>
    </div>
    
  )
}

export default page