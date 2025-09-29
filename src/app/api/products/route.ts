import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongoose";
import Product from "../../../../models/Product";
import { logger } from "../../../../lib/logger";

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
	const brand = url.searchParams.get("brand");
	const category = url.searchParams.get("category");
	const sub = url.searchParams.get("sub");
		const productId = url.searchParams.get("productId");
		const pageParam = parseInt(url.searchParams.get("page") || "1", 10) || 1;
		const limit = parseInt(url.searchParams.get("limit") || "15", 10) || 15;
		const inStockParam = url.searchParams.get("inStock");
		const minPriceParam = url.searchParams.get("minPrice");
		const maxPriceParam = url.searchParams.get("maxPrice");

		logger.debug("/api/products GET", { brand, category, sub, productId, pageParam, limit, inStockParam, minPriceParam, maxPriceParam });

		const conn = await dbConnect();
		logger.debug("dbConnect returned", { conn: !!conn });

		if (productId) {
			logger.debug("Looking up single product", { productId });
			const product = await Product.findOne({ productId }).lean();
			if (!product) {
				logger.warn("Product not found", { productId });
				return NextResponse.json(
					{ ok: false, error: "Not found" },
					{ status: 404 }
				);
			}
			logger.info("Product found", { productId, title: product.title });
			return NextResponse.json({ ok: true, product });
		}

		// Simple realtime search by title: ?q=partial
		const q = url.searchParams.get("q")?.trim();
		if (q) {
			logger.debug("Search query", { q });
			// Case-insensitive partial match on title
			const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
			const matches = await Product.find({ title: regex })
				.sort({ title: 1 })
				.limit(10)
				.select({
					productId: 1,
					title: 1,
					price: 1,
					image: 1,
					briefDescription: 1,
					inStock: 1,
					brand: 1,
				})
				.lean();
			logger.info("Search results", { q, count: matches.length });
			const res = NextResponse.json({
				ok: true,
				products: matches,
				total: matches.length,
			});
			// Light caching for search suggestions (safe for public)
			res.headers.set("Cache-Control", "public, max-age=60, s-maxage=60");
			return res;
		}

		const filter: Record<string, unknown> = {};
		if (category) {
			filter.category = category;
			if (category === 'pods-devices' && sub) filter.subCategory = sub;
		}
		if (brand) filter.brand = brand;
		if (inStockParam === "true") filter.inStock = true;
		if (inStockParam === "false") filter.inStock = false;
		const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
		const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
		if (!isNaN(minPrice as number) && typeof minPrice === "number")
			filter.price = { ...((filter.price as object) || {}), $gte: minPrice };
		if (!isNaN(maxPrice as number) && typeof maxPrice === "number")
			filter.price = { ...((filter.price as object) || {}), $lte: maxPrice };

		const total = await Product.countDocuments(filter);
		logger.debug("CountDocuments result", { filter, total });
		const totalPages = Math.max(1, Math.ceil(total / limit));
		const page = Math.min(Math.max(1, pageParam), totalPages);
		const skip = (page - 1) * limit;

		const products = await Product.find(filter)
			.sort({ title: 1 })
			.skip(skip)
			.limit(limit)
			.select({
				productId: 1,
				title: 1,
				price: 1,
				image: 1,
				briefDescription: 1,
				inStock: 1,
				brand: 1,
				category: 1,
				subCategory: 1,
			})
			.lean();
		logger.info("Products query finished", { filter, returned: products.length, page, totalPages, total });

		const res = NextResponse.json({
			ok: true,
			products,
			page,
			totalPages,
			total,
		});
		// Brand/product listings can be cached briefly at the edge for public pages; admin can bypass via no-store client fetch if needed
		res.headers.set("Cache-Control", "public, max-age=30, s-maxage=60");
		return res;
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		return NextResponse.json({ ok: false, error: message }, { status: 500 });
	}
}
