import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const vehicles = await prisma.car.findMany({
      orderBy: [{ rental_price: "asc" }],
    });

    const vehiclesWithPrice = vehicles.map((vehicle) => {
      return {
        ...vehicle,
        rental_price: Math.ceil(75 * vehicle.rental_factor),
      };
    });

    return NextResponse.json({ vehicles: vehiclesWithPrice }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Method not allowed", method: req.method },
      { status: 200 }
    );
  }
}
