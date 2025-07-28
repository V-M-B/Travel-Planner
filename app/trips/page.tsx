import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default async function Trips() {
  const session = await auth()

  if (!session) {
    return (
      <div className='flex justify-center items-center h-screen text-gray-700 text-xl'>Please Login...😊 </div>
    )
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      {/* This div will now use flexbox to align items */}
      <div className="flex justify-between items-center"> {/* Added flex and justify-between */}
        <h1 className="text-2xl font-bold">Dashboard</h1> {/* Added some styling for the heading */}
        <Link href="/trips/new"> {/* Removed the extra flex justify-end here */}
          <Button>New Trip</Button>
        </Link>
      </div>
      {/* Other content for your dashboard would go here */}
      {/* For example, a list of trips */}
    </div>
  )
}