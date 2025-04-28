"use client"
import React, { createContext, useEffect, useState } from 'react'
  import { useDispatch } from 'react-redux';
import { AuthUser } from '../redux/userSlice';
let contextdatas=createContext(null);


function ContextApiData({children}) {
 
 let [data,setData]=useState({});
//  for redux toolkit store
let dispatch=useDispatch();

// auth info get
 let handelAuthUser=async(setAuth)=>{
   try{
      let res=await fetch('http://localhost:3000/api/user',{
       method: 'GET',
       credentials:'include'
     })
   
     let data=await res.json();
     if(data.success){
        setData(data.data);
        dispatch(AuthUser(data.data));
       console.log('data',data)
     }
   }
   catch(e){
     console.log('dtaa not come');
   }
   }

//  console.log(data)


 useEffect(()=>{
    handelAuthUser();
 
 },[])
  return (
    <contextdatas.Provider  value={{handelAuthUser:handelAuthUser,userId:data._id}} >
      {children}
    </contextdatas.Provider>
  )
}

export default ContextApiData
export {contextdatas};