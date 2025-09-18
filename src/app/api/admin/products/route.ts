import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongoose';
import Product from '../../../../../models/Product';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    // Minimal validation
    const required = ['title', 'brand', 'price', 'productId'];
    for (const k of required) {
      if (!body[k]) return NextResponse.json({ ok: false, error: `${k} required` }, { status: 400 });
    }
    const doc = new Product({
      title: body.title,
      briefDescription: body.briefDescription || '',
      brand: body.brand,
      description: body.description || '',
      specification: body.specification || {},
      image: body.image || '',
      imageKey: body.imageKey || '',
      price: Number(body.price),
      inStock: body.inStock === undefined ? true : Boolean(body.inStock),
      productId: body.productId,
    });
    await doc.save();
    return NextResponse.json({ ok: true, product: doc.toObject() });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
