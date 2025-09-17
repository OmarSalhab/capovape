import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import Product from '../../../../models/Product';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const brand = url.searchParams.get('brand');
    const productId = url.searchParams.get('productId');
    const pageParam = parseInt(url.searchParams.get('page') || '1', 10) || 1;
    const limit = 15;

    await dbConnect();

    if (productId) {
      const product = await Product.findOne({ productId }).lean();
      if (!product) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
      return NextResponse.json({ ok: true, product });
    }

  const filter: Record<string, unknown> = {};
    if (brand) filter.brand = brand;

    const total = await Product.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const page = Math.min(Math.max(1, pageParam), totalPages);
    const skip = (page - 1) * limit;

    const products = await Product.find(filter).sort({ title: 1 }).skip(skip).limit(limit).lean();

    return NextResponse.json({ ok: true, products, page, totalPages, total });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
