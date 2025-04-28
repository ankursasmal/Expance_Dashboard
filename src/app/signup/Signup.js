'use client'; // ✅ very important for client-side logic

import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { handelAuthUser } from '../_components/Nav';
import { contextdatas } from '../ContexHookData/contextApidata';

function Signup() {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "", Cpassword: "" });
  let {handelAuthUser}=useContext(contextdatas) 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending request...');
      let res = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      let result = await res.json();
      // console.log(result);

      if (result.success) {
        handelAuthUser();

        // console.log('Signup Success');
        router.push('/login'); // ✅ Will work now
      } else {
        console.log('Signup Failed');
      }
    } catch (err) {
      console.log('Error occurred:', err.message);
    }
  };

  return (
    <div className='flex items-center flex-col mt-3'>
      <span className='text-[3vw] text-blue-700 font-semibold'>Signup</span>

      <form 
        className='flex flex-col items-center justify-center w-[56vw] p-4 gap-4 rounded-[0.5vw] shadow-lg' 
        onSubmit={handelSignup}
      >
        <input 
          type="text"  
          className='px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full' 
          placeholder='Enter Name' 
          value={data.name}
          name='name'  required
          onChange={handleChange}
        />

        <input 
          type="email"  
          className='px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full' 
          placeholder='Enter Email' 
          value={data.email}
          name='email' required
          onChange={handleChange}
        />

        <input 
          type="password"  
          className='px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full' 
          placeholder='Enter Password' 
          value={data.password}
          name='password' required
          onChange={handleChange}
        />

        <input 
          type="password"  
          className='px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full' 
          placeholder='Confirm Password' 
          value={data.Cpassword} required
          name='Cpassword' 
          onChange={handleChange}
        />

        <button 
          type="submit"  
          className='px-4 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
