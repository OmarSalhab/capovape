import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import Product from '../../../../models/Product';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
  const brand = url.searchParams.get('brand');
    const productId = url.searchParams.get('productId');
    const pageParam = parseInt(url.searchParams.get('page') || '1', 10) || 1;
  const limit = parseInt(url.searchParams.get('limit') || '15', 10) || 15;
  const inStockParam = url.searchParams.get('inStock');
  const minPriceParam = url.searchParams.get('minPrice');
  const maxPriceParam = url.searchParams.get('maxPrice');

    await dbConnect();

    if (productId) {
      const product = await Product.findOne({ productId }).lean();
      if (!product) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
      return NextResponse.json({ ok: true, product });
    }

    // Simple realtime search by title: ?q=partial
    const q = url.searchParams.get('q')?.trim();
    if (q) {
      // Case-insensitive partial match on title
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const matches = await Product.find({ title: regex }).sort({ title: 1 }).limit(10).lean();
      return NextResponse.json({ ok: true, products: matches, total: matches.length });
    }

  const filter: Record<string, unknown> = {};
    if (brand) filter.brand = brand;
    if (inStockParam === 'true') filter.inStock = true;
    if (inStockParam === 'false') filter.inStock = false;
    const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
    const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
    if (!isNaN(minPrice as number) && typeof minPrice === 'number') filter.price = { ...(filter.price as object || {}), $gte: minPrice };
    if (!isNaN(maxPrice as number) && typeof maxPrice === 'number') filter.price = { ...(filter.price as object || {}), $lte: maxPrice };

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
