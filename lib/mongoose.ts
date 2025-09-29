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

// Store last connection error so health endpoints can return it for diagnostics
declare global {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	var _mongooseLastError: string | null | undefined;
}
if (global._mongooseLastError === undefined) global._mongooseLastError = null;

async function dbConnect() {
	if (cached.conn) {
		logger.debug("Using cached mongoose connection");
		return cached.conn;
	}

	if (!cached.promise) {
		// Use slightly larger timeouts for serverless environments and smaller pool to avoid too many connections
		const opts: mongoose.ConnectOptions = {
			bufferCommands: false,
			maxPoolSize: 10,
			minPoolSize: 0,
			// Allow longer server selection time so transient DNS/replica failovers don't immediately fail
			serverSelectionTimeoutMS: 20000,
			socketTimeoutMS: 20000,
			family: 4,
		};

		logger.info("Opening new mongoose connection (will retry on failure)", { hostProvided: !!MONGODB_URI, options: { maxPoolSize: opts.maxPoolSize, serverSelectionTimeoutMS: opts.serverSelectionTimeoutMS } });

		// Retry with exponential backoff (useful for cold-starts, DNS propagation, or transient network issues)
		const maxAttempts = 5;
		let attempt = 0;

		const tryConnect = async (): Promise<typeof mongoose> => {
			attempt += 1;
			logger.debug("Mongoose connect attempt", { attempt });
			try {
				const m = await mongoose.connect(MONGODB_URI!, opts);
				logger.info("Mongoose connected");
				global._mongooseLastError = null;
				return m;
			} catch (err: unknown) {
				const message = err instanceof Error ? err.message : String(err);
				logger.error("Mongoose connection error", { attempt, message });
				global._mongooseLastError = message;
				if (attempt >= maxAttempts) {
					// Give up after maxAttempts
					throw err;
				}
				const backoffMs = Math.min(30_000, 1000 * Math.pow(2, attempt - 1));
				logger.info("Mongoose will retry", { attempt, backoffMs });
				await new Promise((r) => setTimeout(r, backoffMs));
				return tryConnect();
			}
		};

		cached.promise = tryConnect();
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
