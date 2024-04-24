import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { login } from "@/actions/auth";
import jwt from  "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '07d' })
  }

export async function POST (req) {
    const { email, type, password } = await req.json();

    connectToDB();

    try {
        const user = await login(email, type, password)
    
        // create a token
        const token = createToken(user._id)
        const name = user.name
        const id = user._id
        
        return NextResponse.json({ email, token, name, id }, { status: 200 })
      } catch (error) {
        return NextResponse.json({error: error.message}, { status: 400 })
      }
}