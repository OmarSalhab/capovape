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

const Product: Model<ProductDocument> = (mongoose.models?.Product as Model<ProductDocument>) || mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;

