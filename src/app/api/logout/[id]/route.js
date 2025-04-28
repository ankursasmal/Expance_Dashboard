import { authGuard } from "@/app/lib/Auth_middleware/Auth";
import { connections } from "@/app/lib/db/connection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
// import { connections } from "@/app/lib/db/connection";
// import { authGuard } from "@/app/lib/Auth_middleware/Auth";
// import { userModel } from "@/app/lib/model/User";

async function connectDB() {
    try {
        await connections();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Error connecting to database:", error.message);
    }
}

connectDB();

 
 

export async function GET(req, { params }) {
  try {
    // 1. authenticate
    await authGuard();

    // 2. await params before destructuring
    const { id } = await params;
    // console.log('Logging out user:', id);

    // 3. build response and delete cookie
    const res = NextResponse.json({ success: true, message: 'Logged out' });
    res.cookies.delete('jwt', { path: '/' });
    return res;

  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: err.message.startsWith('Unauthorized') ? 401 : 500 }
    );
  }
}
