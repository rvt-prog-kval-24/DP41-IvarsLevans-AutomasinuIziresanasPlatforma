import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          admin: true,
        }
      });
      return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: "Failed to fetch users", error: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed", method: req.method },
      { status: 405 }
    );
  }
}