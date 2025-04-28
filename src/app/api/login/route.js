import mongoose from "mongoose";
import { userModel } from "@/app/lib/model/User";
import { connections } from "@/app/lib/db/connection";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = 'ejejijeuuu838xhxhhx8hh8h8h3hh3';  

async function connectDB() {
  try {
    await connections();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
  }
}

connectDB();

export async function POST(req) {
  try {
    // 1. Get the request body
    const payload = await req.json();

    // 2. Check if the user exists
    const ExistUser = await userModel.findOne({ email: payload.email });

    if (!ExistUser) {
      throw new Error('User not found or not signed up');
    }

    // 3. Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(payload.password, ExistUser.password);

    if (isMatch) {
      // 4. Create JWT token if the passwords match
      const token = jwt.sign(
        { email: payload.email },
        secret,
        { expiresIn: '3d' }
      );

      // 5. Set the token as a secure, httpOnly cookie
      const response = NextResponse.json({
        success: true,
        error: false,
        status: 200,
        message: "Logged in successfully",
      });

      // Setting the cookie in the response
      response.cookies.set('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure cookie in production
        maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
        path: '/', // Cookie is available across the entire domain
      });

      return response;
    } else {
      throw new Error('Invalid credentials');
    }

  } catch (e) {
    console.error('Error during login:', e.message);
    return NextResponse.json({
      success: false,
      error: true,
      status: 401,
      message: e.message,
    });
  }
}
