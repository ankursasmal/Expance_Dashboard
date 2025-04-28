import mongoose from "mongoose";
import { connections } from "@/app/lib/db/connection";
import { NextResponse } from "next/server";
import { Transition } from "@/app/lib/model/Transition";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { authGuard } from "@/app/lib/Auth_middleware/Auth";

const secret = '3y2yxhx829299292hc2rhh9h2rhcj9j2rj9r9rj92'; // your JWT secret

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
    // 1. Auth
    const user = await authGuard(); // 👈 Auth check


    // 2. Create Transition
    const payload = await req.json();
    // console.log(payload)
    const transition = new Transition(payload);
    const data = await transition.save();

    return NextResponse.json({
      success: true,
      error: false,
      status: 200,
      data: data
    });

  } catch (e) {
    console.log('❌ Error in adding transition:', e.message);
    return NextResponse.json({
      success: false,
      error: true,
      status: 500,
      mess: e.message
    });
  }
}
