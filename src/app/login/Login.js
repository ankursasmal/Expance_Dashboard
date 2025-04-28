'use client';

import { useRouter } from 'next/navigation';  
import React, { useContext, useState } from 'react';
import { contextdatas } from '../ContexHookData/contextApidata';

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const router = useRouter(); 
  let {handelAuthUser}=useContext(contextdatas) 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',  
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      let result = await res.json();  
      if (result.success) {
        handelAuthUser();
        router.push('/transition');  
      } else {
        console.log('Login failed');
       }
    } catch (e) {
      console.log('Error occurred:', e.message);
    }
  };

  return (
    <div className="flex items-center flex-col mt-3">
      <span className="text-[3vw] text-blue-700 font-semibold">Login</span>

      <form 
        className="flex flex-col items-center justify-center w-[56vw] p-4 gap-4 rounded-[0.5vw] shadow-lg" 
        onSubmit={handelLogin}  
      >
        <input 
          type="email"  required
          className="px-1 py-2 rounded-[0.3vw] border border-gray-400 w-full" 
          placeholder="Enter Email" 
          value={data.email}
          name="email" 
          onChange={handleChange}
        />

        <input 
          type="password"  required
          className="px-1 py-2 rounded-[0.3vw] border border-gray-400 w-full" 
          placeholder="Enter Password" 
          value={data.password}
          name="password" 
          onChange={handleChange}
        />

        <button 
          type="submit"  
          className="px-4 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
