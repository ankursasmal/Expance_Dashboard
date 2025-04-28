import mongoose from 'mongoose';
  import   { connections } from '../db/connection';
import { data } from 'autoprefixer';

  async function fun(req) {
    try {
      await connections();
      console.log("✅ Database connected successfully!");
      
     } catch (error) {
      console.error("❌ Error connecting to database:", error.message);
    }
  }
  
  fun();
 
  const schema = new mongoose.Schema({
     
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    debt: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'userModel',  
    },
    credit: {
      type: Number,
      required: true,
    }
  }, { timestamps: true });
  
  export const Transition = mongoose.models.Transition || mongoose.model('Transition', schema);
  