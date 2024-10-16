import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from 'zod';

// Define schema for input validation
const UserSchema = z.object({
  username: z.string().min(5, 'Username cannot contain less than 5 characters').max(30, 'Username must have less than 30 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(8, 'Password must have at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    // Parse and validate request body using zod schema
    const body = await req.json();
    const { email, username, password } = UserSchema.parse(body);

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "A user with this username already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashPassword = await hash(password, 10);

    // Create new user
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    // Exclude password from the returned user object
    const { password: _password, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { user: userWithoutPassword, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    // Specific handling for validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { user: null, message: error.errors[0].message }, // Return first validation error message
        { status: 400 }
      );
    }

    console.error("Error during user creation:", error); // Log the specific error

    return NextResponse.json(
      { user: null, message: "Oops! Something went wrong." },
      { status: 500 }
    );
  }
}
