import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({children}) {
  return (
    <div>
      <Header />
      <div className="relative min-h-screen -z-10">
        <div className='pb-40'>
          {children}
        </div>
        
      <div className="absolute bottom-0 w-full  ">
        <Footer />
        </div>
      </div>

    </div>
  );
}
