// app/lib/Auth_middleware/Auth.js

 import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { userModel } from '../model/User';

const secret = 'ejejijeuuu838xhxhhx8hh8h8h3hh3';  

export async function authGuard() {
  const cookieStore = await cookies();  // Use await to get the cookies correctly
  const tokon = cookieStore.get('jwt');
// console.log(tokon)
  if (!tokon) {
    throw new Error('Unauthorized: No token');
  }

  try {
    // Verify the JWT token
    const verifiedUser = jwt.verify(tokon.value, process.env.JWT_SECRET || secret);  // Use the correct secret key
    let User=await userModel.findOne({email:verifiedUser.email});
 
    // console.log('Verified User:', User);
    return User;
  } catch (error) {
    console.error('Error verifying token:', error.message);
    throw new Error('Unauthorized: Invalid token');
  }
}
