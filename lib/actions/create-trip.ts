"use server";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "../prisma";


export async function createTrip(formData: FormData) {

    const session = await auth();
    if (!session || !session.user?.id) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;  
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const imageUrl = formData.get("imageUrl") as string | null;

    if (!title || !description || !startDate || !endDate) {
        throw new Error("All fields are required");
    }

    await prisma.trip.create({
        data: {
            title,
            description,
            imageUrl: imageUrl || null,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userId: session.user.id,
        },
    });
}