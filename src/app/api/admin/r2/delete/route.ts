import { NextResponse } from 'next/server';
import { deleteObject } from '../../../../../../lib/s3';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key } = body as { key?: string };
    if (!key) return NextResponse.json({ ok: false, error: 'missing key' }, { status: 400 });

    const R2_BUCKET = process.env.R2_BUCKET || process.env.CLOUDFLARE_R2_BUCKET;
    if (!R2_BUCKET) return NextResponse.json({ ok: false, error: 'R2 bucket not configured' }, { status: 500 });

    try {
      console.log('[R2 delete API] deleting key=', key, 'from bucket=', R2_BUCKET);
      const res = await deleteObject(R2_BUCKET, key);
      console.log('[R2 delete API] result=', res);
      return NextResponse.json({ ok: true, result: res });
    } catch (e) {
      console.error('[R2 delete API] error deleting', e);
      return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[R2 delete API] invalid request', message);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
