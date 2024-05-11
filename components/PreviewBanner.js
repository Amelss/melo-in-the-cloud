import React from 'react'
import Link from "next/link";

export default function PreviewBanner() {
  return (
    <div className='bg-red-500 text-white text-lg flex justify-center  h-14 items-center font-bold'>

      <h2>PREVIEW MODE ENABLED</h2>
      <Link prefetch={false} href={'/api/exit-preview'}>
      
      

      <div className='bg-white rounded-lg px-2 py-2 ml-5 text-xs font-bold '>
        <button className='text-black'>
          EXIT PREVIEW MODE
        </button>
      </div>
</Link>
    </div>
  )
}
