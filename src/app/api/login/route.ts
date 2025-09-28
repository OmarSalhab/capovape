import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongoose";
import mongoose from "mongoose";
import crypto from "crypto";

const AUTH_COOKIE_NAME = "capo_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function signPayload(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;
    if (!username || !password) return NextResponse.json({ ok: false, error: "Missing credentials" }, { status: 400 });

    await dbConnect();

    // Query the users collection directly. The user will create users manually in MongoDB.
    const user = await mongoose.connection.db.collection("users").findOne({ username });
    if (!user) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    // NOTE: plain-text check — replace with hashing in production
    if (user.password !== password) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    // Build a simple signed cookie: payload = username|expiry
    const secret = process.env.AUTH_SECRET || "dev_secret_change_me";
    const expiry = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE;
    const payload = `${username}|${expiry}`;
    const signature = signPayload(payload, secret);
    const cookieValue = `${payload}.${signature}`;

    const res = NextResponse.json({ ok: true, user: { username: user.username } });
    // Set HTTP-only cookie
    res.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: cookieValue,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
