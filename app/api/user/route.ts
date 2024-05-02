import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "This e-mail is already in use" },
        { status: 409 }
      );
    }

    const hashPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// New endpoint for deleting user account
export async function DELETE(req: Request) {
  try {
    const { email } = await req.json();

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

    // Delete the user
    await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json(
      { message: "User account deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}