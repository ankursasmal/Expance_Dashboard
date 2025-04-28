"use client"
import React, { useContext, useEffect, useState } from 'react'
import { contextdatas } from '../ContexHookData/contextApidata'
import { useSelector } from 'react-redux';
import MonthlyExpensesChart from '../_components/MonthlyExpence';
import MonthlyExpensesPieChart from '../_components/MonthlYExpencePie';
 
function Expance() {
    let [expance,setExpance]=useState([])
 let {handelAuthUser}=useContext(contextdatas);
 let userData=useSelector(state=>state.user.user)
let [Types,setType]=useState(false);

    let handelExpences=async(setExpance)=>{
      try{
         let res=await fetch(`http://localhost:3000/api/transitions`,{
          method: 'GET',
          credentials:'include'
        })
      
        let data=await res.json();
        if(data.success){
            setExpance(data.data);

         }
      }
      catch(e){
        console.log('dtaa not come');
      }
      }

 
      //  console.log( 'expance',expance)

      useEffect(()=>{
handelExpences(setExpance);
handelAuthUser();
      },[])

       let tatal_create=()=>{
        let s=0;
        expance?.forEach(val => {
          s+=val.credit;
        }); 
return s;
        }
      
      let tatal_debt=()=>{
        let s=0;
        expance?.map(val => {
         s+=val.debt;
        })
        return s;
      }
      
      
  return (
    <div className='flex mt-4 flex-col w-[100vw] items-center'>
    <div className='flex    items-center  gap-2  justify-around '>
      <div className='flex flex-col p-[2vw] rounded-xl border-[1px] bg-gray-400 border-black shadow-2xl'>
      <span>Account Holder:{" "+userData?.name}</span>
      <span>{`Credit Ammount: `}{ tatal_create()}Rs</ span>
      </div>

      <div className='flex flex-col p-[2vw] rounded-xl border-[1px]  bg-gray-400 border-black shadow-2xl'>
      <span>Account Holder:{"  "+userData?.name}</span>
      <span>{`Debt Ammount: `}{ tatal_debt()}"Rs</ span>
      </div>
      <div className='flex flex-col p-[2vw] rounded-xl border-[1px]  bg-gray-400 border-black shadow-2xl'>
      <span>Account Holder:{"  "+userData?.name}</span>
      <span>{`Total Rest Ammount: `}{ " "+ tatal_create()-tatal_debt()}Rs</ span>
      </div>
    </div>


    {/* yearly expance */}
    <div className='flex  justify-between mt-4 '>
<a></a>
<div className='flex   '>
<button
                          className="px-4 py-1 ml-[2vw] rounded-xl text-[1.2rem]  bg-blue-600 text-white   my-[.5vh]"
                          onClick={() => {   setType(false) }}
                        >
                          Cratid
                        </button>
                        <button
                          className="px-4 py-1 ml-4 rounded-xl text-[1.2rem] bg-red-600 text-white  "
                          onClick={() => 
                          {setType(true) }
                            }
                          >
                          Debt
                           </button></div>
    </div>



    {/* for chat section */}
    <div className='flex flex-col'> 
    {Types?
        <div className='flex flex-col'> 
<div className='w-[100vw] self-center mt-[2vw] flex flex-col items-center'>
      <span className='text-[3vw] font-semibold text-red-600'>Yearly Debt Bar Chart</span> 
    <MonthlyExpensesChart  expance={expance} TransitonTyppe='debt' />
    </div>

    <div className='w-[100vw] self-center mt-[2vw] flex flex-col items-center'>
      <span className='text-[3vw] font-semibold text-red-600'>Yearly Debt Pie Chart</span> 
    <MonthlyExpensesPieChart expance={expance} TransitonTyppe='debt'  />
    </div>
    </div>
:    <div className='flex flex-col'> 

    <div className='w-[100vw] self-center mt-[2vw] flex flex-col items-center'>
      <span className='text-[3vw] font-semibold text-blue-600'>Monthly Debt Bar Chart</span> 
    <MonthlyExpensesChart expance={expance}  TransitonTyppe='credit'/>
    </div>

    <div className='w-[100vw] self-center mt-[2vw] flex flex-col items-center'>
      <span className='text-[3vw] font-semibold text-blue-600'>Monthly Debt Pie Chart</span> 
    <MonthlyExpensesPieChart expance={expance}  TransitonTyppe='credit'/>
    </div>
    </div>
    }
    </div>

    </div>
  )
}

export default Expance
