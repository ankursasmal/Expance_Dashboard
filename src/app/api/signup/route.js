import mongoose from "mongoose";
import { userModel } from "@/app/lib/model/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { connections } from "@/app/lib/db/connection";

async function fun(req) {
    try {
      await connections();
      console.log("✅ Database connected successfully!");
      
      // you can now safely use your database operations here
    } catch (error) {
      console.error("❌ Error connecting to database:", error.message);
    }
  }
  
  fun();

  
export async function POST(req) {
    try {
        const payload = await req.json();

        // Basic validation (optional but good practice)
        const { name, email, password, Cpassword } = payload;
        if (!name || !email || !password || !Cpassword) {
            return NextResponse.json({
                success: false,
                error: true,
                status: 400,
                message: 'All fields are required'
            });
        }

        if (password !== Cpassword) {
            return NextResponse.json({
                success: false,
                error: true,
                status: 400,
                message: 'Confirm password does not match'
            });
        }

        // Check if user already exists
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return NextResponse.json({
                success: false,
                error: true,
                status: 400,
                message: 'User already signed up'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new userModel({
            ...payload,
            password: hashedPassword,
            role: 'GENERAL'
        });

        const data = await user.save();
        // console.log('User signed up:', data);

        return NextResponse.json({
            success: true,
            error: false,
            status: 200,
            data
        });

    } catch (e) {
        console.log('Signup error:', e.message);
        return NextResponse.json({
            success: false,
            error: true,
            status: 500,
            message: e.message
        });
    }
}
