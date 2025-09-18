"use client";

import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import CreateModal from "@/components/admin/CreateModal";
import Image from "next/image";
import { IProduct } from "../../../models/Product";

type EditableProduct = IProduct & {
	_tmpNewImageKey?: string;
	_originalImageKey?: string | undefined;
};

function formatCurrency(n?: number) {
	if (n === undefined || n === null) return "-";
	return `$${n.toFixed(2)}`;
}

export default function AdminPage() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(false);
	const [brandFilter, setBrandFilter] = useState<string>("");
	const [inStockFilter, setInStockFilter] = useState<string>(""); // '', 'true', 'false'
	const [minPrice, setMinPrice] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");
	const [editProduct, setEditProduct] = useState<EditableProduct | null>(null);
	const [creating, setCreating] = useState(false);

	async function fetchProducts() {
		setLoading(true);
		try {
			const params = new URLSearchParams();
			if (brandFilter) params.set("brand", brandFilter);
			if (inStockFilter) params.set("inStock", inStockFilter);
			if (minPrice) params.set("minPrice", minPrice);
			if (maxPrice) params.set("maxPrice", maxPrice);
			// admin view: increase limit
			params.set("limit", "200");
			const res = await fetch(`/api/products?${params.toString()}`);
			const data = await res.json();
			if (data.ok) setProducts(data.products || []);
			else setProducts([]);
		} catch (e) {
			console.error(e);
			setProducts([]);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const params = new URLSearchParams();
				params.set("limit", "200");
				const res = await fetch(`/api/products?${params.toString()}`);
				const data = await res.json();
				if (data.ok) setProducts(data.products || []);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	async function handleDelete(productId: string) {
		if (!confirm("Delete this product?")) return;
		try {
			const res = await fetch(
				`/api/admin/products/${encodeURIComponent(productId)}`,
				{ method: "DELETE" }
			);
			if (res.ok) {
				fetchProducts();
			} else {
				console.error("Delete failed");
			}
		} catch (e) {
			console.error(e);
		}
	}

	async function handleSave(updated: IProduct) {
		try {
			const res = await fetch(
				`/api/admin/products/${encodeURIComponent(updated.productId)}`,
				{
					method: "PUT",
					body: JSON.stringify(updated),
					headers: { "Content-Type": "application/json" },
				}
			);
			if (res.ok) {
				setEditProduct(null);
				fetchProducts();
			} else {
				console.error("Update failed");
			}
		} catch (e) {
			console.error(e);
		}
	}

	// Derive unique brands for filter select
	const brands = Array.from(new Set(products.map((p) => p.brand))).filter(
		Boolean
	) as string[];

	return (
		<div className="min-h-screen bg-[#050505] text-white p-4">
			<div className="mx-auto max-w-7xl">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h1 className="text-3xl font-serif text-[var(--color-mafia)]">
							Admin Panel
						</h1>
						<p className="text-sm text-muted-foreground">Products management</p>
					</div>
					<div className="">
						<LogoutButton />
					</div>
				</div>

				<div className="bg-[#0b0b0b] rounded-lg p-4 shadow">
					<div className="flex justify-end mb-3">
						<button
							onClick={() => {
								setCreating(true);
							}}
							className="px-3 py-2 bg-green-600 rounded"
						>
							Create Product
						</button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
						<div>
							<label className="text-xs text-muted-foreground">Brand</label>
							<select
								value={brandFilter}
								onChange={(e) => setBrandFilter(e.target.value)}
								className="w-full mt-1 p-2 bg-black rounded"
							>
								<option value="">All brands</option>
								{brands.map((b) => (
									<option key={b} value={b}>
										{b}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">Stock</label>
							<select
								value={inStockFilter}
								onChange={(e) => setInStockFilter(e.target.value)}
								className="w-full mt-1 p-2 bg-black rounded"
							>
								<option value="">All</option>
								<option value="true">In stock</option>
								<option value="false">Out of stock</option>
							</select>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">Min price</label>
							<input
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
								className="w-full mt-1 p-2 bg-black rounded"
								placeholder="0.00"
							/>
						</div>
						<div>
							<label className="text-xs text-muted-foreground">Max price</label>
							<input
								value={maxPrice}
								onChange={(e) => setMaxPrice(e.target.value)}
								className="w-full mt-1 p-2 bg-black rounded"
								placeholder="999.99"
							/>
						</div>
					</div>

					<div className="flex gap-2 mb-4">
						<button
							onClick={() => fetchProducts()}
							className="px-3 py-2 bg-mafia text-black rounded"
						>
							Apply
						</button>
						<button
							onClick={() => {
								setBrandFilter("");
								setInStockFilter("");
								setMinPrice("");
								setMaxPrice("");
								fetchProducts();
							}}
							className="px-3 py-2 bg-transparent border rounded"
						>
							Reset
						</button>
					</div>

					<div className="overflow-auto">
						<table className="min-w-full text-left text-sm">
							<thead>
								<tr className="text-xs text-muted-foreground">
									<th className="px-3 py-2">Title</th>
									<th className="px-3 py-2">Brand</th>
									<th className="px-3 py-2">Price</th>
									<th className="px-3 py-2">Stock</th>
									<th className="px-3 py-2">ProductId</th>
									<th className="px-3 py-2">Edit</th>
									<th className="px-3 py-2">Delete</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td colSpan={7} className="p-4">
											Loading...
										</td>
									</tr>
								) : products.length === 0 ? (
									<tr>
										<td colSpan={7} className="p-4">
											No products
										</td>
									</tr>
								) : (
									products.map((p) => (
										<tr key={p.productId} className="border-t border-border">
											<td className="px-3 py-2 align-top max-w-xs truncate">
												{p.title}
											</td>
											<td className="px-3 py-2 align-top">{p.brand}</td>
											<td className="px-3 py-2 align-top">
												{formatCurrency(p.price)}
											</td>
											<td className="px-3 py-2 align-top">
												{p.inStock ? "Yes" : "No"}
											</td>
											<td className="px-3 py-2 align-top">{p.productId}</td>
											<td className="px-3 py-2 align-top">
												<button
													onClick={() =>
														setEditProduct({
															...p,
															_originalImageKey: p.imageKey,
														})
													}
													className="px-2 py-1 bg-yellow-500 text-black rounded"
												>
													Edit
												</button>
											</td>
											<td className="px-3 py-2 align-top">
												<button
													onClick={() => handleDelete(p.productId)}
													className="px-2 py-1 bg-red-700 rounded"
												>
													Delete
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Edit modal (simple) */}
				{editProduct && (
					<div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
						<div className="bg-[#0b0b0b] rounded-lg p-4 w-full max-w-3xl max-h-[92vh] overflow-auto shadow-lg">
							<h2 className="text-xl md:text-2xl font-semibold mb-2">
								Edit product
							</h2>
							<p className="text-sm text-muted-foreground mb-3">
								Update product details. If you replace the image, the old image
								will be removed from storage.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<div>
									<label className="block text-sm md:text-base mb-1">
										Title
									</label>
									<input
										value={editProduct.title}
										onChange={(e) =>
											setEditProduct({ ...editProduct, title: e.target.value })
										}
										className="p-3 bg-black rounded text-base md:text-lg w-full"
									/>
								</div>
								<div>
									<label className="block text-sm md:text-base mb-1">
										Price
									</label>
									<input
										type="number"
										step="0.01"
										inputMode="decimal"
										value={
											editProduct.price === 0 ? "" : String(editProduct.price)
										}
										onChange={(e) =>
											setEditProduct({
												...editProduct,
												price:
													e.target.value === ""
														? 0
														: parseFloat(e.target.value),
											})
										}
										className="p-3 bg-black rounded text-base md:text-lg w-full"
									/>
								</div>
								<div>
									<label className="block text-sm md:text-base mb-1">
										Brand
									</label>
									<input
										value={editProduct.brand || ""}
										onChange={(e) =>
											setEditProduct({ ...editProduct, brand: e.target.value })
										}
										className="p-3 bg-black rounded text-base md:text-lg w-full"
									/>
								</div>
								<select
									value={editProduct.inStock ? "true" : "false"}
									onChange={(e) =>
										setEditProduct({
											...editProduct,
											inStock: e.target.value === "true",
										})
									}
									className="p-3 bg-black rounded text-base md:text-lg"
								>
									<option value="true">In stock</option>
									<option value="false">Out of stock</option>
								</select>
								<div className="col-span-1 md:col-span-2">
									<label className="block text-sm md:text-base text-muted-foreground">
										Replace image (optional)
									</label>
									<div className="mt-2">
										<input
											type="file"
											accept="image/*"
											onChange={async (e) => {
												const file = e.target.files?.[0];
												if (!file) return;
												// upload new image to R2
												try {
													const dataUrl = await new Promise<string>(
														(resolve, reject) => {
															const reader = new FileReader();
															reader.onload = () =>
																resolve(String(reader.result));
															reader.onerror = reject;
															reader.readAsDataURL(file);
														}
													);
													const base64 = dataUrl.split(",")[1];
													const res = await fetch("/api/admin/r2/upload", {
														method: "POST",
														headers: { "Content-Type": "application/json" },
														body: JSON.stringify({
															filename: file.name,
															contentType: file.type,
															data: base64,
															keyPrefix: "products",
														}),
													});
													const data = await res.json();
													if (data.ok) {
														// store new image and key on editProduct; remember old key for deletion when saving
														setEditProduct((prev) => {
															if (!prev) return prev;
															return {
																...prev,
																image: data.publicUrl,
																imageKey: data.key,
																_tmpNewImageKey: data.key,
															};
														});
													} else {
														alert("Upload failed: " + (data.error || ""));
													}
												} catch (err) {
													console.error(err);
													alert("Upload error");
												}
											}}
											className="mt-1"
										/>
										{editProduct.image && (
											<div className="mt-3">
												<Image
													src={editProduct.image}
													alt="preview"
													width={220}
													height={220}
													className="object-contain rounded"
												/>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="mt-6 flex flex-col md:flex-row gap-3 justify-end">
								<button
									onClick={async () => {
										// if user uploaded a new image while editing but then cancelled, delete the temp image
										const newTmp = editProduct?._tmpNewImageKey;
										if (newTmp) {
											try {
												await fetch("/api/admin/r2/delete", {
													method: "POST",
													headers: { "Content-Type": "application/json" },
													body: JSON.stringify({ key: newTmp }),
												});
											} catch (e) {
												console.error("Failed to delete temp edit upload", e);
											}
										}
										setEditProduct(null);
									}}
									className="px-4 py-3 bg-transparent border rounded"
								>
									Cancel
								</button>
								<button
									onClick={async () => {
										// when saving, if a new tmp image key exists, delete the old imageKey from R2
										const oldKey = editProduct?._originalImageKey || editProduct.imageKey;
										const newTmp = editProduct?._tmpNewImageKey;
										if (newTmp && oldKey && oldKey !== newTmp) {
											try {
												await fetch("/api/admin/r2/delete", {
													method: "POST",
													headers: { "Content-Type": "application/json" },
													body: JSON.stringify({ key: oldKey }),
												});
											} catch (e) {
												console.error("Failed to delete old image", e);
											}
											// remove tmp marker before saving
											const cleanedObj: Partial<EditableProduct> = {
												...((editProduct as EditableProduct) || {}),
											};
											delete cleanedObj._tmpNewImageKey;
											delete cleanedObj._originalImageKey;
											handleSave(cleanedObj as IProduct);
										} else {
											// editProduct should be non-null here
											handleSave(editProduct as IProduct);
										}
									}}
									className="px-4 py-3 bg-mafia text-black rounded"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				)}

				<CreateModal
					visible={creating}
					onClose={() => setCreating(false)}
					onCreated={() => {
						setCreating(false);
						fetchProducts();
					}}
				/>
			</div>
		</div>
	);
}
