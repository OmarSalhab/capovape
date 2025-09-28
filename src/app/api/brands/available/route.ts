import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongoose";
import Product from "../../../../../models/Product";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const sub = url.searchParams.get("sub");

    if (!category) {
      return NextResponse.json({ ok: false, error: "category required" }, { status: 400 });
    }

    await dbConnect();
    const query: Record<string, unknown> = { category };
    if (category === "pods-devices" && sub) query.subCategory = sub;

    const brandIds: string[] = await Product.distinct("brand", query);
    const res = NextResponse.json({ ok: true, brands: brandIds });
    // Public cache for a short time; admin can bypass with no-store fetch
    res.headers.set("Cache-Control", "public, max-age=60, s-maxage=120");
    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
