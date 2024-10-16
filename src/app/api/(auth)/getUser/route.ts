import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from 'zod';



// Define schema for input validation

const UserSchema = z.object({
    username:z.string().min(5, 'Username cannot contain less than 5 characters').max(30, 'Username must have less than 30 characters'),
    email: z.string().min(1, 'Email is Required').email('Invalid email'),
    password: z.string().min(1, 'Password is Required').min(8, 'Password must have atleast 8 characters'),
    
  })
 




export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Request body:", body);  // Log request body
        const { email, username, password } = UserSchema.parse(body);

        if (!email || !username || !password) {
            console.error("Missing fields:", { email, username, password });
            return NextResponse.json(
                { user: null, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email }
        });
        console.log("Existing user by email:", existingUserByEmail);  // Log email check
        if (existingUserByEmail) {
            return NextResponse.json(
                { user: null, message: "A user with this email already exists" },
                { status: 409 }
            );
        }

        // Check if username already exists
        const existingUserByUsername = await db.user.findUnique({
            where: { username }
        });
        console.log("Existing user by username:", existingUserByUsername);  // Log username check
        if (existingUserByUsername) {
            return NextResponse.json(
                { user: null, message: "A user with this username already exists" },
                { status: 409 }
            );
        }

        // Hash the password
        const hashPassword = await hash(password, 10);
        console.log("Hashed password:", hashPassword);  // Log password hash

        // Create new user
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            }
        });
        console.log("New user created:", newUser);  // Log new user creation

        const {password: newUserPassword, ...rest} = newUser;

        return NextResponse.json(
            { user: rest, message: "User created successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error during user creation:", error);  // Log the specific error
        return NextResponse.json(
            { user: null, message: "Oops! Something went wrong." },
            { status: 500 }
        );
    }
}
