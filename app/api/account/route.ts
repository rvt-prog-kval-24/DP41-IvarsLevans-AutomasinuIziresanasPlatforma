import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Retrieve user by email and include associated rentals
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        rentals: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete each rental booking one by one
    await Promise.all(
      user.rentals.map(async (rental) => {
        await prisma.rental.delete({
          where: {
            id: rental.id,
          },
        });
      })
    );

    // Once all rental bookings are deleted, delete the user
    await prisma.user.delete({
      where: {
        email,
      },
    });

    return NextResponse.json({ message: "User and associated rentals deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}