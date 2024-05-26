import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { rentalId } = body;

    const rental = await prisma.rental.findUnique({
      where: { id: rentalId },
    });

    if (!rental) {
      return NextResponse.json(
        { message: "Rental not found" },
        { status: 404 }
      );
    }

    const updatedRental = await prisma.rental.update({
      where: { id: rentalId },
      data: {
        ongoing: !rental.ongoing,
      },
    });

    return NextResponse.json(
      { rental: updatedRental, message: "Rental status updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}