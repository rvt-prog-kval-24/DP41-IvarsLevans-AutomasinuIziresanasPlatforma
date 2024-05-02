import { prisma } from "@/lib/prisma";
import { dayjs } from "@/lib/dayjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { car, userEmail, startDate, finishDate } = body;

    const totalPrice =
      car.rental_price * (dayjs(finishDate).diff(startDate, "day") + 1);

    const newRental = await prisma.rental.create({
      data: {
        car: { connect: { id: car.id } },
        user: { connect: { email: userEmail } },
        startDate,
        endDate: finishDate,
        totalPrice,
        ongoing: false,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        car: true,
      },
    });

    await prisma.car.update({
      where: { id: car.id },
      data: { available: false },
    });

    return NextResponse.json({ newRental });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rentals = await prisma.rental.findMany({
      include: {
        car: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ rentals }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
