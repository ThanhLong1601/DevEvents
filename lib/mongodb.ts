import mongoose from "mongoose";

// Extend the NodeJS global type to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Retrieve MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI as string;

// Throw an error if MONGODB_URI is not defined
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env file"
  );
}

/**
 * Global cache to store the mongoose connection across hot reloads in development.
 * This prevents creating multiple connections during Next.js fast refresh.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and returns a cached MongoDB connection using Mongoose.
 *
 * - In development: Reuses the connection across hot reloads to prevent exhausting
 *   database connection limits.
 * - In production: Creates a single connection that persists for the lifetime
 *   of the serverless function or server instance.
 *
 * @returns Promise<mongoose.Connection> - The active Mongoose connection
 */
async function connectDB(): Promise<mongoose.Connection> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if no promise exists
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable mongoose buffering to fail fast if not connected
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        // Clear the promise so the next call will retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
