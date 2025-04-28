import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connections } from "@/app/lib/db/connection";
import { authGuard } from "@/app/lib/Auth_middleware/Auth";
import { userModel } from "@/app/lib/model/User";

async function connectDB() {
    try {
        await connections();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Error connecting to database:", error.message);
    }
}

connectDB();

export async function GET(req) {
    try {
        // Get user info from authGuard
        const Authuser = await authGuard();  
        //  console.log('Authenticated User :', Authuser);  

         const user = await userModel.findOne({ _id: Authuser._id });

        if (!user) {
            // Handle case when the user is not found
            return NextResponse.json({
                success: false,
                error: true,
                status: 404,
                message: "User not found"
             });
        }

        // Return the user data
        return NextResponse.json({
            success: true,
            error: false,
            status: 200,
            data: user
        });

    } catch (e) {
        console.log('❌ Error:', e.message);
        return NextResponse.json({
            success: false,
            error: true,
            status: 500,
            message: e.message
        });
    }
}


