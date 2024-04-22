import mongoose from 'mongoose';

export const connectToDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Ecommerce",
      useUnifiedTopology: true,
    })
    console.log('Database connected successfully!')
    
  } catch (error) {
    console.log(error);
  }
}