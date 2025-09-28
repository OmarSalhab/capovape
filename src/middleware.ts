import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'capo_auth';

function base64UrlToUint8Array(b64url: string) {
  // Convert base64url to base64
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  // Pad with '=' to make length divisible by 4
  const pad = b64.length % 4;
  const padded = pad === 0 ? b64 : b64 + '='.repeat(4 - pad);
  const binary = atob(padded);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function verifySignedPayload(cookieValue: string | undefined, secret: string) {
  if (!cookieValue) return false;
  const parts = cookieValue.split('.');
  if (parts.length !== 2) return false;
  const [payload, signatureB64] = parts;

  // Prepare data
  const enc = new TextEncoder();
  const payloadBytes = enc.encode(payload);
  const signatureBytes = base64UrlToUint8Array(signatureB64);
  const secretBytes = enc.encode(secret);

  // Import key for HMAC-SHA256
  const key = await crypto.subtle.importKey('raw', secretBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);

  const valid = await crypto.subtle.verify('HMAC', key, signatureBytes, payloadBytes);
  if (!valid) return false;

  // payload = username|expiry
  const [username, expiryStr] = payload.split('|');
  if (!username || !expiryStr) return false;
  const expiry = Number(expiryStr);
  if (Number.isNaN(expiry)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (expiry < now) return false;
  return true;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    const cookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const secret = process.env.AUTH_SECRET || 'dev_secret_change_me';
    const ok = await verifySignedPayload(cookie, secret);
    if (!ok) {
      const loginUrl = new URL('/login', req.nextUrl.origin);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
