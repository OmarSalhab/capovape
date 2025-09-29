import mongoose from "mongoose";
import "dotenv/config";
import { logger } from "./logger";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	// Log then throw a clear error early to surface misconfiguration
	logger.error("MONGODB_URI is not set in environment. Aborting DB connect.");
	throw new Error("MONGODB_URI is not set. Configure it in your environment variables (do not rely on dotenv in production).");
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
	if (cached.conn) {
		logger.debug("Using cached mongoose connection");
		return cached.conn;
	}

	if (!cached.promise) {
		const opts: mongoose.ConnectOptions = {
			bufferCommands: false,
			maxPoolSize: 10,
			minPoolSize: 0,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 20000,
			family: 4,
		};

		logger.info("Opening new mongoose connection", { hostProvided: !!MONGODB_URI, options: { maxPoolSize: opts.maxPoolSize } });

		cached.promise = mongoose
			.connect(MONGODB_URI!, opts)
			.then((m) => {
				logger.info("Mongoose connected");
				return m;
			})
			.catch((err) => {
				logger.error("Mongoose connection error", { message: err instanceof Error ? err.message : String(err) });
				// Reset promise so subsequent calls can retry
				cached.promise = null;
				throw err;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
