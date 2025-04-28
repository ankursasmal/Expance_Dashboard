// import Image from "next/image";
// <Image
// className="dark:invert"
// src="/next.svg"
// alt="Next.js logo"
// width={180}
// height={38}
// priority
// />

import React from 'react'
  
function page() {
  return (
    <div className='w-[100vw] min-h-[100vh] '>
       <div className='w-[100vw] mt-4 h-[40vh] flex items-center justify-center '> 
      <span className='font-bold  text-[5vw] mt-[6vw]  '>Welcome to our site</span>
      </div>
    </div>
  )
}

export default page

