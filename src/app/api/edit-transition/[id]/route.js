import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connections } from "@/app/lib/db/connection";
import { authGuard } from "@/app/lib/Auth_middleware/Auth";
import { Transition } from "@/app/lib/model/Transition";

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

// edit request
export async function PUT(req, { params }) {
  try {
     const id = params.id;
     console.log(id)
     const payload = await req.json();
console.log(payload)
    // Ensure payload is valid
    if (!payload) {
      return NextResponse.json({
        success: false,
        error: true,
        status: 400,
        message: "Payload is missing or invalid",
      });
    }

    // Authenticate user
    const user = await authGuard();
    if (!user) {
      return NextResponse.json({
        success: false,
        error: true,
        status: 401,
        message: "User not authenticated",
      });
    }

    // Check if the user exists and update the Transition model
    const updatedTransition = await Transition.findByIdAndUpdate(
      {_id:id},
      payload,
      { new: true } 
    );

    // Check if the document was found and updated
    if (!updatedTransition) {
      return NextResponse.json({
        success: false,
        error: true,
        status: 404,
        message: "Transition not found",
      });
    }

    return NextResponse.json({
      success: true,
      error: false,
      status: 200,
      data: updatedTransition,
    });

  } catch (e) {
    console.log('Error in PUT request:', e.message);
    return NextResponse.json({
      success: false,
      error: true,
      status: 500,
      message: e.message,
    });
  }
}
