import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if(!cached) {
  cached = (global as any).mongoose = { connection: null, promise: null };
}

export const connectToDatabase = async () => {

  console.log(MONGODB_URL);
  
  if(cached.connection) {
    return cached.connection
  }

  if(!MONGODB_URL) {
    throw new Error(
      'Please define the MONGODB_URL environment variable'
    )
  }

  try {
  cached.promise = cached.promise || 
      mongoose.connect(MONGODB_URL, { 
        dbName: 'imaginify', bufferCommands: false 
      });
  cached.connection = await cached.promise;

  return cached.connection;

    } catch (error) {
      console.error('Error connecting to database', error)
      return null
    }
}  