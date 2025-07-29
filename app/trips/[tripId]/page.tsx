import { auth } from "@/auth";
import TripDetailsClient from "@/components/TripDetailsClient";
import { prisma } from "@/lib/prisma";

export default async function TripDetails({ params }:
    { params: { tripId: string }})
     {
    const tripId = params.tripId;
    // Fetch trip details using tripId  

    const session = await auth();
    if (!session || !session.user?.id) {
        throw new Error("Please login to view trip details.");
    }
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { user: true }, // Include user details if needed
    });

  if (!trip) {
    throw new Error("Trip not found.");
  }
  return (<TripDetailsClient trip={trip} />);
}