import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { login } from "@/actions/auth";
import { encodeToken } from "@/actions/token";

export async function POST (req) {
    const { email, type, password } = await req.json();

    connectToDB();

    try {
        const user = await login(email, type, password)
    
        const token = encodeToken(user._id)
        const name = user.name
        const id = user._id
        
        const response = NextResponse.json({ email, token, name, id }, { status: 200 })

        response.cookies.set('token', token, {
          httpOnly: true,
        })

        return response;

      } catch (error) {
        return NextResponse.json({error: error.message}, { status: 400 })
      }
}