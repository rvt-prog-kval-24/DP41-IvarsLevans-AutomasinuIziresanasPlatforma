import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const dealerships = await prisma.dealership.findMany(); // Fetch all dealerships from the database

      return NextResponse.json({ dealerships }, { status: 200 }); // Return dealerships
    } catch (error: any) {
      return NextResponse.json(
        { message: "Failed to fetch dealerships", error: error.message },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed", method: req.method },
      { status: 405 }
    );
  }
}
