import mongoose from "mongoose";
import "dotenv/config";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

const cached: MongooseCache = (global as { _mongooseCache?: MongooseCache })
	._mongooseCache || { conn: null, promise: null };
if (!cached)
	(global as { _mongooseCache?: MongooseCache })._mongooseCache = cached;

async function dbConnect() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		const opts: mongoose.ConnectOptions = {
			bufferCommands: false,
			maxPoolSize: 10,
			minPoolSize: 0,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 20000,
			family: 4,
		};

		cached.promise = mongoose
			.connect(MONGODB_URI!, opts)
			.then((mongoose) => mongoose);
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
