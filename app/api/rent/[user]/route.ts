import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userEmail = req.url?.split("rent/")[1];

    if (userEmail) {
      const rentals = await prisma.rental.findMany({
        where: { user: { email: userEmail.toString() } },
        include: { car: true },
      });

      return NextResponse.json({ rentals }, { status: 200 });
    } else {
      throw new Error("Couldn't find user with provided e-mail");
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
