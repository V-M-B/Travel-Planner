'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { login, logout } from '@/lib/auth-actions'
import { Session } from 'next-auth'

const Navbar = ({session}:{session: Session | null}) => {
  return (
    <nav className='bg-white shadow-md py-4 border-b border-gray-200'> 
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href="/" className='flex items-center space-x-2'>
          {/* Use a local image path and required props for next/image */}
          <Image 
            src="/logo.png" 
            alt="Travel Planner Logo" 
            width={48} 
            height={48} 
            priority
          />
          <span className='text-2xl font-bold text-gray-800'>Travel Planner</span>
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href={"/trips"} className='text-slate-900  hover:text-sky-500 font-semibold '>My Trip</Link>
              <Link href={"/global"} className='text-slate-900 hover:text-sky-500 font-semibold'>Globel</Link>

                         <button className='bg-sky-500 text-white px-2 py-1 rounded-md hover:bg-sky-600 transition-colors duration-200 font-semibold cursor-pointer'
              onClick={logout}
            >
              Sign Out
            </button>
            </>
          ) : (
            <button className='bg-sky-500 text-white px-2 py-1 rounded-md hover:bg-sky-600 transition-colors duration-200 font-semibold cursor-pointer'
              onClick={login}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar