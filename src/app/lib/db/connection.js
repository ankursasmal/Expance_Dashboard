import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // <--- move it to top!

const USERNAME1 = encodeURIComponent("ankursasmal2024" );
const PASSWORD1 = encodeURIComponent("@Ankur123");

console.log(USERNAME1);

// Only export function to connect, not Promise
export const connections = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USERNAME1}:${PASSWORD1}@cluster0.sgwwiml.mongodb.net/Transition?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
  }
};
