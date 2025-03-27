'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const Router=useRouter();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
      e.preventDefault();
      setFormData({ ...formData, [e.target.name]: e.target.value });
      
    };
    const submitHandler=async (e)=>{
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          const { token } = await response.json();
  
          localStorage.setItem('authToken', token);
          Router.push('/profile');
        } else {
          
          console.error('Login failed');
        }
      } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
              setError(error.response.data.message);
          } else {
              setError('Please check your email or password.');
            }
        console.error('Error logging in:', error);
      }
    console.log(JSON.stringify(formData))
  
  };
    return (
      <div className='loger md:block sm:w-full  lg:w-screen h-screen bg-black '>
        <div className="container w-full h-full flex justify-center items-center">
          <div className="card p-5 h-auto  flex flex-col justify-center items-center gap-5 ">
            <h2 className='text-gray-200 text-2xl'>Login </h2>
           
          
            {/* <form method='post' onSubmit={submitHandler}> */}
            <input onChange={handleChange} type="email" value={formData.email} name='email' placeholder='email' />
            <input onChange={handleChange} type="password" value={formData.password} name='password' placeholder='password' />
            <button type='submit' onClick={submitHandler} className='bg-black m-2 px-3 py-2 rounded-md text-white font-medium'>Login here</button>
            {/* </form> */}
          <p className='text-red-500 text-lg '>{error}</p>      </div>
        </div>
      </div>
    )
  }

export default page