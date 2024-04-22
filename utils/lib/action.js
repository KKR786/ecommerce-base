import User from "@/models/user";
import bcrypt from "bcrypt";

export async function login(email, type, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
      }
    
      const user = await User.findOne({ email, type })
      if (!user) {
        throw Error('Incorrect email')
      }
    
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw Error('Incorrect password')
      }
      return user
}