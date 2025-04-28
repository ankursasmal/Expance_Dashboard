import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connections } from "@/app/lib/db/connection";
import { Transition } from "@/app/lib/model/Transition";
  import { authGuard } from "@/app/lib/Auth_middleware/Auth";

 
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
         const user = await authGuard();  
        //  console.log(user)
         if(user.role=='GENERAL'){

         
        // 🔥 DATA: Now safely fetch data
        const data = await Transition.find({userId:user._id});
        // console.log(data)
        return NextResponse.json({
            success: true,
            error: false,
            status: 200,
            data: data
        });
    }
    else{
        console.log('❌ Data not fetched:');
        return NextResponse.json({
            success: false,
            error: true,
            status: 500,
         }); 
    }
    } catch (e) {
        console.log('❌ Data not fetched:', e.message);
        return NextResponse.json({
            success: false,
            error: true,
            status: 500,
            message: e.message
        });
    }
}
