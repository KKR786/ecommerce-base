import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function requireAuth (req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return NextResponse.json({error: 'Authorization token required'}, {status: 401})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next();
    } catch (err) {
        NextResponse.json({error: 'Request is Unauthorized'}, { status: 401 })
    }
}