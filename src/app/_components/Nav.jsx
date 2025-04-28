'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { data } from 'autoprefixer';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUser } from '../redux/userSlice';
import { contextdatas } from '../ContexHookData/contextApidata';


function Nav() {
 let router=useRouter();
let dispatch=useDispatch();
 
let {handelAuthUser}=useContext(contextdatas);

let user=useSelector(state=>state?.user?.user);

//for logout 
let handelLogOut=async(id)=>{
try{
  console.log("id",id)
  let res=await fetch(`http://localhost:3000/api/logout/${id}`,{
    method:"GET",
    credentials:'include'
  })
let data=await res.json();
if(data.success){
  // console.log('logout successfull');
  dispatch(AuthUser(null ));
  handelAuthUser();

  router.push('/');
 
}
else{
  throw new Error('log out not possibl');
}
}
catch(e){
  console.log('log out not possible')
}
}

  useEffect(()=>{
    handelAuthUser();
   },[]);

  return (
    <div className='flex items-center justify-between px-[2vw] py-[1.5vh] w-[100vw]  bg-red-400 '>
      <span>Home</span>
      <div className='flex items-center gap-4'>
{user?.name?   
   <div className='flex items-center gap-4'>
      <span className='text-blue-700 font-bold'>{user.name[0].toUpperCase()}</span>
      <Link href='/transition'>  <span className='text-blue-700'>Transition</span></Link>
      <Link href='/dashboard'>  <span className='text-blue-700'>Dashboard</span></Link>
      <span className='text-blue-700 font-semibold cursor-pointer' onClick={()=>handelLogOut(user._id)}>LogOut</span>

  </div>:<div className='flex items-center gap-4'>
  <Link href='/login'>  <span className='text-blue-700'>Login</span></Link>
<Link href='/signup'> <span className='text-blue-700'>Signup</span></Link>
</div>}

      </div>
    </div>
  )

}

export default Nav
