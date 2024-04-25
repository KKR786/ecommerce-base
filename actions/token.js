import jwt from "jsonwebtoken";

export const encodeToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '7d' })
}

export const decodeToken = async (token) => {
    try {
        if(token) {
            const decodedToken = jwt.verify(token, process.env.SECRET);
            return decodedToken._id;
        }
    } catch (err) {
        //throw new Error(err.message);
    }
}