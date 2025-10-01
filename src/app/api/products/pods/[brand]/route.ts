import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../../lib/mongoose';
import Product from '../../../../../../models/Product';

export async function GET(req: NextRequest, { params }: { params: Promise<{ brand: string }> }) {
  await dbConnect();
  const { brand } =await params;
  const projection = { productId: 1, title: 1, price: 1, image: 1, brand: 1, inStock: 1, briefDescription: 1 };
  const products = await Product.find({ brand, category: 'pods-devices', subCategory: 'pods' })
    .select(projection)
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ ok: true, products }, {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
