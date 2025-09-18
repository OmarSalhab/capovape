import { NextResponse } from 'next/server';
import dbConnect from '../../../../../../lib/mongoose';
import Product from '../../../../../../models/Product';
import { deleteObject } from '../../../../../../lib/s3';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: Request, context: any) {
  try {
    await dbConnect();
  const maybeParams = context?.params;
  const params = typeof maybeParams?.then === 'function' ? await maybeParams : maybeParams;
    const { productId } = params || {};
    const prod = await Product.findOne({ productId }).lean();
    if (!prod) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

    // delete R2 object if imageKey present
  const imageKey = (prod as unknown as Record<string, unknown>)['imageKey'] as string | undefined;
      const R2_BUCKET = process.env.R2_BUCKET || process.env.CLOUDFLARE_R2_BUCKET;
    if (imageKey && R2_BUCKET) {
      try {
        console.log('[R2 delete] deleting key=', imageKey, 'from bucket=', R2_BUCKET);
        const delRes = await deleteObject(R2_BUCKET, imageKey);
        console.log('[R2 delete] result=', delRes);
      } catch (e) {
        console.error('R2 delete failed', e);
      }
    }

    const res = await Product.deleteOne({ productId });
    if (res.deletedCount && res.deletedCount > 0) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: Request, context: any) {
  try {
    await dbConnect();
  const maybeParams = context?.params;
  const params = typeof maybeParams?.then === 'function' ? await maybeParams : maybeParams;
    const { productId } = params || {};
    const body = await req.json();
    // Allow only specific fields to be updated
  const allowed: Record<string, unknown> = {};
    ['title', 'briefDescription', 'brand', 'description', 'specification', 'image', 'imageKey', 'price', 'inStock'].forEach(k => {
      if (body[k] !== undefined) allowed[k] = body[k];
    });
    const updated = await Product.findOneAndUpdate({ productId }, { $set: allowed }, { new: true }).lean();
    if (!updated) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, product: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
