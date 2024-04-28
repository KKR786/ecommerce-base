import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { login } from "@/actions/auth";
import { encodeToken } from "@/actions/token";
import { cookies } from 'next/headers'

export async function POST (req) {
    const { email, role, password } = await req.json();

    connectToDB();

    try {
        const user = await login(email, role, password);
    
        const userName = user.name
        const userId = user._id
        const userRole = user.role

        const userInfo = {id: userId, role: userRole}
        const token = await encodeToken(userInfo)
        
        const response = NextResponse.json({ email, token, userName, userId, userRole }, { status: 200 })

        cookies().set('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        return response;

      } catch (error) {
        return NextResponse.json({error: error.message}, { status: 400 })
      }
}