// app/dashboard/page.js
'use client';

import { contextdatas } from "@/app/ContexHookData/contextApidata";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
 
 
export default function page() {
  const [data, setData] = useState({  date: "", description: "",debt:"" ,credit:"",userId:""});
  let {userId}=useContext(contextdatas);
  const router = useRouter();
     const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
  // console.log(data)
// console.log(userId)
 

  //  for store transition
    const handelTransition = async (e) => {
      e.preventDefault();
  
      try {
        console.log('Sending request...');
        let res = await fetch('http://localhost:3000/api/add_transition', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({...data,userId:userId})
        });
  
        let result = await res.json();
        // console.log(result);
  
        if (result.success) {
          console.log('Signup Success');
          router.push('/transition');  
        } else {
          console.log('Signup Failed');
        }
      } catch (err) {
        console.log('Error occurred:', err.message);
      }
    };

 
  return (
    <div className='flex items-center flex-col mt-3'>
    <span className='text-[3vw] text-blue-700 font-semibold'>Add Transition Status</span>

    <form 
      className='flex flex-col items-center justify-center w-[56vw] p-4 gap-4 rounded-[0.5vw] shadow-lg' 
      onSubmit={handelTransition}
    >
      

      <input 
        type="date" required
        className='px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full' 
        placeholder='Enter date' 
        value={data.date}
        name='date' 
        onChange={handleChange}
      />

<input 
        type="text"  required
        className='px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full' 
        placeholder='description' 
        value={data.description}
        name='description' 
        onChange={handleChange}
      />
       <input required
      type="number"  
      className='px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full' 
      placeholder='Enter debt Ammount' 
      value={data.debt}
      name='debt' 
      onChange={handleChange}
    />

      <input required
        type="number"  
        className='px-1 py-0.5 rounded-[0.3vw] border border-gray-400 w-full' 
        placeholder='Enter credit amount' 
        value={data.credit}
        name='credit' 
        onChange={handleChange}
      />
<div className="flex w-[100%] items-center justify-between px-2"> 
<a></a>
<button 
        type="submit"  
        className='px-4 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition'
      >
        Submit
      </button>
      <button onClick={()=>router.push('/transition')}
         className='px-4 py-1 rounded-lg bg-red-600 text-white hover:bg-blue-700 transition'
      >
        Close
      </button>
      </div>
    </form>
  </div>
);
}
