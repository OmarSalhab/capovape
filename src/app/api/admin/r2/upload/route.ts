import { NextResponse } from 'next/server';
import { uploadObject } from '../../../../../../lib/s3';

// Uploads base64 image payload to Cloudflare R2 using S3-compatible SDK
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, contentType, data, keyPrefix } = body as { filename: string; contentType: string; data: string; keyPrefix?: string };
    if (!filename || !contentType || !data) return NextResponse.json({ ok: false, error: 'missing' }, { status: 400 });

    const R2_BUCKET = process.env.R2_BUCKET || process.env.CLOUDFLARE_R2_BUCKET;
    if (!R2_BUCKET) return NextResponse.json({ ok: false, error: 'R2 bucket not configured' }, { status: 500 });

    // Build a safe key
    const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const key = keyPrefix ? `${keyPrefix.replace(/\/+$/,'')}/${safeName}` : safeName;

    const buffer = Buffer.from(data, 'base64');

    // Use S3-compatible client to upload
    await uploadObject(R2_BUCKET, key, buffer, contentType);

    // construct public URL using account-hosted endpoint
    const account = process.env.R2_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID || '';
    const publicUrl = account ? `https://${account}.r2.cloudflarestorage.com/${R2_BUCKET}/${encodeURIComponent(key)}` : `/${R2_BUCKET}/${encodeURIComponent(key)}`;

    return NextResponse.json({ ok: true, publicUrl, key });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[R2 upload error]', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
