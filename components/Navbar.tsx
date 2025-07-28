'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { login, logout } from '@/lib/auth-actions'
import { Session } from 'next-auth'

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className='bg-white shadow-sm py-4 border-b border-gray-200'> {/* Reduced shadow for a cleaner look, matching the image */}
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8"> {/* Adjusted padding for better responsiveness */}
        <Link href="/" className='flex items-center space-x-2'>
          <Image
            src="/logo.png"
            alt="Travel Planner Logo"
            width={40} // Slightly adjusted size for better visual balance with text
            height={40} // Slightly adjusted size for better visual balance with text
            priority
          />
          <span className='text-xl font-bold text-gray-800 md:text-2xl'>Travel Planner</span> {/* Adjusted text size for responsiveness */}
        </Link>

        <div className="flex items-center space-x-4"> {/* Space between nav items */}
          {session ? (
            <>
              <Link href={"/trips"} className='text-slate-700 hover:text-sky-600 font-semibold text-base transition-colors duration-200'>My Trip</Link>
              <Link href={"/global"} className='text-slate-700 hover:text-sky-600 font-semibold text-base transition-colors duration-200'>Globel</Link>

              <button
                className='bg-sky-500 text-white px-3 py-1.5 rounded-md hover:bg-sky-600 transition-colors duration-200 font-semibold text-base cursor-pointer' // Increased padding for button
                onClick={logout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className='bg-sky-500 text-white px-3 py-1.5 rounded-md hover:bg-sky-600 transition-colors duration-200 font-semibold text-base cursor-pointer' // Increased padding for button
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