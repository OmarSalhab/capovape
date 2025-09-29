import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongoose";
import mongoose from "mongoose";
import { logger } from "../../../../../lib/logger";

export async function GET() {
  try {
    logger.debug("/api/health/db - starting health check");
    // Attempt (or reuse) DB connection
    await dbConnect();
    const readyState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    logger.info("/api/health/db - success", { readyState });

    const res = NextResponse.json({ ok: true, readyState });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error("/api/health/db - failed", { message });
    const res = NextResponse.json({ ok: false, error: message }, { status: 500 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
}
