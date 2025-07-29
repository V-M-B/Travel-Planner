import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import { Card } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'


export default async function Trips() {
  const session = await auth()

  const trips = await prisma.trip.findMany({
    where:{ userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
  });

  const sortedTrips =[...trips].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortedTrips.filter(trip => new Date(trip.startDate) >= today);

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
      <Card>
        <CardHeader>Welcome Back {session.user?.name}!</CardHeader>
        <CardContent>
          <p className="text-gray-700">{trips.length === 0 ? "start planning your first trip by clicking the button above:" : `You have ${trips.length} trips planned.${upcomingTrips.length > 0 ? ` Your next trip is on ${new Date(upcomingTrips[0].startDate).toLocaleDateString()}.` : ''}`}</p>
        </CardContent>
      </Card>
        <div className="">  
          <h2 className='text-xl font-semibold mb-4 mx-4'>
            Your Recent Trips
          </h2>
          {trips.length === 0 ? (
            <Card>
              <CardContent className="text-gray-500">
                You have no trips planned yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
              {sortedTrips.map((trip) => (
                <Link href={`/trips/${trip.id}`} key={trip.id} className="block">
                <Card key={trip.id} className="hover:shadow-lg transition-shadow duration-200 hover:shadow-blue-400 ">
                  <CardHeader className="text-lg font-semibold">{trip.title}</CardHeader>
                  <CardContent>
                    <p>{trip.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      {/* </Card> */}
      {/* For example, a list of trips */}
    </div>
  )
}