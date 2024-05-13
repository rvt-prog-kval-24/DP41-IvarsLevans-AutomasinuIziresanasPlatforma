import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, isAdmin } = await req.json();

    // Find the user by email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, return an error
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found with provided email" },
        { status: 404 }
      );
    }

    // Toggle the admin status
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        admin: !existingUser.admin, // Toggle the admin status
      },
    });

    return NextResponse.json(
      { user: updatedUser, message: "User admin status updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}