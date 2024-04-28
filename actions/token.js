'use server'
import { SignJWT, jwtVerify } from "jose";

const encodedKey = new TextEncoder().encode(process.env.SECRET);

export const encodeToken = async (info) => {
  const token = await new SignJWT(info)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

    return token
};

export const decodeToken = async (token) => {
  try {
    if (token) {
      const decodedToken = await jwtVerify(token, encodedKey, {
        algorithms: ["HS256"],
      });
      
      return decodedToken.payload.info;
    }
  } catch (error) {
    console.error("Error decoding token:", error.message);
    throw new Error("Invalid token");
  }
};
