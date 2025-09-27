import mongoose, { Document, Model } from "mongoose";

export interface IProduct {
	title: string;
	briefDescription?: string;
	brand: string;
	description?: string;
	specification?: Record<string, unknown> | null;
	image?: string;
	imageKey?: string;
	price: number;
	inStock: boolean;
	productId: string;
}

export interface ProductDocument extends IProduct, Document {}

const ProductSchema = new mongoose.Schema<ProductDocument>({
	title: { type: String, required: true },
	briefDescription: { type: String },
	brand: { type: String, required: true },
	description: { type: String },
	specification: { type: mongoose.Schema.Types.Mixed },
	image: { type: String },
	imageKey: { type: String },
	price: { type: Number, required: true },
	inStock: { type: Boolean, default: true,required: true },
	productId: { type: String, required: true, unique: true },
});

// Indexes for faster filtering/sorting and lookups
// Compound index to support common admin/public listing patterns: filter by brand/inStock/price and sort by title
ProductSchema.index({ brand: 1, inStock: 1, price: 1, title: 1 });
// Unique already on productId via schema option; reinforce a single-field index on productId for fast lookups
ProductSchema.index({ productId: 1 }, { unique: true });
// Text index for faster search on title/brand (used by q param)
try {
	// Some environments can throw on duplicate index definition across reloads; wrap in try to be safe at runtime
	ProductSchema.index({ title: 'text', brand: 'text' });
} catch {
	// no-op
}

const Product: Model<ProductDocument> = (mongoose.models?.Product as Model<ProductDocument>) || mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;

