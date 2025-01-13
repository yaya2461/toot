import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable in .env.local');
}

// Cached connection object
let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;