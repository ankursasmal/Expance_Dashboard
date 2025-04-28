import mongoose from 'mongoose';
  import   { connections } from '../db/connection';

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
   const schema = {
    name: {
        type: String,
     },
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
     },
    role: {
        type: String,
     },
    }

   export const userModel = mongoose.models.userModel || mongoose.model('userModel', schema);
