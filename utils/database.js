import mongoose from 'mongoose';

export const connectToDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Database connected successfully!')
    
  } catch (error) {
    console.log(error);
  }
}