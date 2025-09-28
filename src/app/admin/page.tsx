"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import CreateModal from "@/components/admin/CreateModal";
import Image from "next/image";
import { IProduct } from "../../../models/Product";
import { BRANDS, brandLabel } from "@/lib/brands";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toast";

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
	const [categoryFilter, setCategoryFilter] = useState<string>(""); // '', 'disposable' | 'pods-devices' | 'e-liquids'
	const [subFilter, setSubFilter] = useState<string>(""); // '', 'pods' | 'devices'
	const [minPrice, setMinPrice] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const LIMIT = 15;

	// Refs to hold latest filter values so fetchProducts can be stable
	const brandRef = useRef<string>(brandFilter);
	const inStockRef = useRef<string>(inStockFilter);
	const minPriceRef = useRef<string>(minPrice);
	const maxPriceRef = useRef<string>(maxPrice);
	const categoryRef = useRef<string>(categoryFilter);
	const subRef = useRef<string>(subFilter);
	const [editProduct, setEditProduct] = useState<EditableProduct | null>(null);
	const [creating, setCreating] = useState(false);
	const [busyAction, setBusyAction] = useState<null | "apply" | "delete" | "save" | "paginate">(null);
	const [search, setSearch] = useState<string>("");
	const { addToast } = useToast();

	const fetchProducts = useCallback(async (requestPage = 1) => {
		setLoading(true);
		try {
			const params = new URLSearchParams();
			// read latest filters from refs (stable callback)
			if (brandRef.current) params.set("brand", brandRef.current);
			if (inStockRef.current) params.set("inStock", inStockRef.current);
			if (categoryRef.current) params.set("category", categoryRef.current);
			if (categoryRef.current === 'pods-devices' && subRef.current) params.set("sub", subRef.current);
			if (minPriceRef.current) params.set("minPrice", minPriceRef.current);
			if (maxPriceRef.current) params.set("maxPrice", maxPriceRef.current);
			// server-side pagination and filtering
			params.set("limit", String(LIMIT));
			params.set("page", String(requestPage));
			const res = await fetch(`/api/products?${params.toString()}`, { cache: 'no-store' });
			const data = await res.json();
			if (data.ok) setProducts(data.products || []);
			else setProducts([]);
			// update pagination state if present
			if (data && typeof data.totalPages === 'number') {
				setTotalPages(data.totalPages);
				setPage(data.page || requestPage);
			}
		} catch (e) {
			console.error(e);
			setProducts([]);
		} finally {
			setLoading(false);
		}
	}, []);

	// keep refs in sync with state
	useEffect(() => {
		brandRef.current = brandFilter;
	}, [brandFilter]);
	useEffect(() => {
		inStockRef.current = inStockFilter;
	}, [inStockFilter]);
	useEffect(() => {
		categoryRef.current = categoryFilter;
		// clear sub filter if category is not pods-devices
		if (categoryFilter !== 'pods-devices') {
			setSubFilter("");
			subRef.current = "";
		}
	}, [categoryFilter]);
	useEffect(() => {
		subRef.current = subFilter;
	}, [subFilter]);
	useEffect(() => {
		minPriceRef.current = minPrice;
	}, [minPrice]);
	useEffect(() => {
		maxPriceRef.current = maxPrice;
	}, [maxPrice]);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				// initial load: first page with server-side filters
				await fetchProducts(1);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		})();
	}, [fetchProducts]);

	async function handleDelete(productId: string) {
		if (!confirm("Delete this product?")) return;
		try {
			const res = await fetch(
				`/api/admin/products/${encodeURIComponent(productId)}`,
				{ method: "DELETE" }
			);
			if (res.ok) {
				fetchProducts(page);
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
				fetchProducts(page);
				addToast({ kind: "success", message: "Product updated" });
			} else {
				console.error("Update failed");
				addToast({ kind: "error", message: "Update failed" });
			}
		} catch (e) {
			console.error(e);
			addToast({ kind: "error", message: "Update error" });
		}
	}

	// Static brands for filter select
	const brands = BRANDS;

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
					<div className="flex justify-between items-center mb-3 gap-3 flex-wrap">
						<div className="flex-1 min-w-[220px]">
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search in table (title, brand, id)"
								className="w-full p-2 bg-black rounded"
							/>
						</div>
						<button
							onClick={() => {
								setCreating(true);
							}}
							className="px-3 py-2 bg-green-600 rounded"
						>
							Create Product
						</button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
						<div>
							<label className="text-xs text-muted-foreground">Category</label>
							<select
								value={categoryFilter}
								onChange={(e) => setCategoryFilter(e.target.value)}
								className="w-full mt-1 p-2 bg-black rounded"
							>
								<option value="">All</option>
								<option value="disposable">Disposable</option>
								<option value="pods-devices">Pods & Devices</option>
								<option value="e-liquids">E-liquids</option>
							</select>
						</div>
						{categoryFilter === 'pods-devices' && (
							<div>
								<label className="text-xs text-muted-foreground">Subcategory</label>
								<select
									value={subFilter}
									onChange={(e) => setSubFilter(e.target.value)}
									className="w-full mt-1 p-2 bg-black rounded"
								>
									<option value="">All</option>
									<option value="pods">Pods</option>
									<option value="devices">Devices</option>
								</select>
							</div>
						)}
						<div>
							<label className="text-xs text-muted-foreground">Brand</label>
							<select
								value={brandFilter}
								onChange={(e) => setBrandFilter(e.target.value)}
								className="w-full mt-1 p-2 bg-black rounded"
							>
								<option value="">All brands</option>
								{brands.map((b) => (
									<option key={b.id} value={b.id}>
										{b.label}
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
							onClick={async () => {
								setBusyAction("apply");
								addToast({ kind: "info", message: "Applying filters…" });
								await fetchProducts(1);
								setBusyAction(null);
								addToast({ kind: "success", message: "Filters applied" });
							}}
							className="px-3 py-2 bg-mafia text-black rounded"
						>
							{busyAction === "apply" ? (
								<span className="inline-flex items-center gap-2"><Spinner size={14}/> Applying…</span>
							) : (
								"Apply"
							)}
						</button>
						<button
							onClick={() => {
								setBrandFilter("");
								setInStockFilter("");
								setCategoryFilter("");
								setSubFilter("");
								setMinPrice("");
								setMaxPrice("");
								fetchProducts(1);
								addToast({ kind: "info", message: "Filters reset" });
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
									<th className="px-3 py-2">Category</th>
									<th className="px-3 py-2">Sub</th>
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
									products
										.filter((p) => {
											if (!search) return true;
											const q = search.toLowerCase();
											return (
												p.title.toLowerCase().includes(q) ||
												(p.brand || "").toLowerCase().includes(q) ||
												p.productId.toLowerCase().includes(q)
											);
										})
										.map((p) => (
										<tr key={p.productId} className="border-t border-border">
											<td className="px-3 py-2 align-top max-w-xs truncate">
												{p.title}
											</td>
											<td className="px-3 py-2 align-top">{brandLabel(p.brand)}</td>
											<td className="px-3 py-2 align-top">
												{formatCurrency(p.price)}
											</td>
											<td className="px-3 py-2 align-top capitalize">{p.category?.replace('-', ' ') || '-'}</td>
											<td className="px-3 py-2 align-top capitalize">{p.subCategory || '-'}</td>
											<td className="px-3 py-2 align-top">
												{p.inStock ? "Yes" : "No"}
											</td>
											<td className="px-3 py-2 align-top">{p.productId}</td>
											<td className="px-3 py-2 align-top">
												<button
													onClick={() => {
														setEditProduct({ ...p, _originalImageKey: p.imageKey });
														addToast({ kind: "info", message: "Editing product…" });
													}}
													className="px-2 py-1 bg-yellow-500 text-black rounded"
												>
													Edit
												</button>
											</td>
											<td className="px-3 py-2 align-top">
												<button
													onClick={async () => {
														setBusyAction("delete");
														addToast({ kind: "info", message: "Deleting…" });
														await handleDelete(p.productId);
														setBusyAction(null);
														addToast({ kind: "success", message: "Product deleted" });
													}}
													className="px-2 py-1 bg-red-700 rounded"
												>
													{busyAction === "delete" ? (
														<span className="inline-flex items-center gap-2"><Spinner size={12}/> Deleting…</span>
													) : (
														"Delete"
													)}
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
						{/* Pagination UI */}
						<div className="mt-3 flex items-center justify-between">
							<div className="text-xs text-muted-foreground">
								Page {page} of {totalPages} — {""}{/* total would be useful here if needed */}
							</div>
							<div className="flex items-center gap-2">
								<button
									onClick={async () => {
										if (page > 1) {
											setBusyAction("paginate");
											// addToast({ kind: "info", message: `Loading page ${page - 1}…` });
											await fetchProducts(page - 1);
											setBusyAction(null);
										}
									}}
									className="px-3 py-1 bg-transparent border rounded text-sm"
								>
									{busyAction === "paginate" ? (<span className="inline-flex items-center gap-2"><Spinner size={12}/> Prev</span>) : 'Prev'}
								</button>
								<div className="hidden sm:flex gap-1">
									{Array.from({ length: totalPages }).map((_, i) => {
										const pageNum = i + 1;
										// show a condensed set if there are many pages
										if (totalPages > 8) {
											if (
												pageNum === 1 ||
												pageNum === totalPages ||
												Math.abs(pageNum - page) <= 1
											) {
												return (
													<button
														key={pageNum}
														className={`px-2 py-1 rounded ${pageNum === page ? 'bg-mafia text-black' : 'bg-transparent border'}`}
														onClick={async () => {
															setBusyAction("paginate");
															// addToast({ kind: 'info', message: `Loading page ${pageNum}…` });
															await fetchProducts(pageNum);
															setBusyAction(null);
														}}
													>
														{pageNum}
													</button>
												);
											}
											// show ellipsis where appropriate
											if (pageNum === 2 && page > 4) return <span key={pageNum} className="px-2">…</span>;
											if (pageNum === totalPages - 1 && page < totalPages - 3) return <span key={pageNum} className="px-2">…</span>;
											return null;
										}
										return (
											<button
												key={pageNum}
												className={`px-2 py-1 rounded ${pageNum === page ? 'bg-mafia text-black' : 'bg-transparent border'}`}
												onClick={async () => {
													setBusyAction("paginate");
													// addToast({ kind: 'info', message: `Loading page ${pageNum}…` });
													await fetchProducts(pageNum);
													setBusyAction(null);
												}}
											>
												{pageNum}
											</button>
										);
									})}
								</div>
								<button
									onClick={async () => {
										if (page < totalPages) {
											setBusyAction("paginate");
											// addToast({ kind: 'info', message: `Loading page ${page + 1}…` });
											await fetchProducts(page + 1);
											setBusyAction(null);
										}
									}}
									className="px-3 py-1 bg-mafia text-black rounded text-sm"
								>
									{busyAction === "paginate" ? (<span className="inline-flex items-center gap-2"><Spinner size={12}/> Next</span>) : 'Next'}
								</button>
							</div>
						</div>
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
									<label className="block text-sm md:text-base mb-1">Category</label>
									<select
										value={editProduct.category}
										onChange={(e) => {
											const cat = e.target.value as IProduct['category'];
											setEditProduct({ ...editProduct, category: cat, subCategory: cat === 'pods-devices' ? editProduct.subCategory : undefined } as EditableProduct);
										}}
										className="p-3 bg-black rounded text-base md:text-lg w-full"
									>
										<option value="disposable">Disposable</option>
										<option value="pods-devices">Pods & Devices</option>
										<option value="e-liquids">E-liquids</option>
									</select>
								</div>
								{editProduct.category === 'pods-devices' && (
									<div>
										<label className="block text-sm md:text-base mb-1">Subcategory</label>
										<select
											value={editProduct.subCategory || ''}
											onChange={(e) => setEditProduct({ ...editProduct, subCategory: e.target.value as IProduct['subCategory'] } as EditableProduct)}
											className="p-3 bg-black rounded text-base md:text-lg w-full"
										>
											<option value="">Select subcategory</option>
											<option value="pods">Pods</option>
											<option value="devices">Devices</option>
										</select>
									</div>
								)}
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
									<select
										value={editProduct.brand || ""}
										onChange={(e) =>
											setEditProduct({ ...editProduct, brand: e.target.value })
										}
										className="p-3 bg-black rounded text-base md:text-lg w-full"
									>
										<option value="">Select a brand</option>
										{BRANDS.map((b) => (
											<option key={b.id} value={b.id}>{b.label}</option>
										))}
									</select>
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
					
									{/* Specification editor */}
									<div className="col-span-1 md:col-span-2">
										<label className="block text-sm md:text-base mb-2">Specification</label>
										<div className="space-y-2">
											{(() => {
												// normalize specification to array of entries for editing
												const specObj = editProduct.specification || {};
												const entries = Object.entries(specObj as Record<string, unknown>);
												return (
													<div>
														{entries.length === 0 && (
															<div className="text-xs text-muted-foreground mb-2">No specifications yet. Add one below.</div>
														)}
														{entries.map(([k, v], idx) => (
															<div key={k + String(idx)} className="flex flex-col md:flex-row gap-2 md:items-center">
																<input
																	className="w-full md:flex-1 p-2 bg-black rounded text-sm"
																	value={k}
																	onChange={(e) => {
																		const newKey = e.target.value;
																		setEditProduct((prev) => {
																			if (!prev) return prev;
																			const spec = { ...(prev.specification || {}) } as Record<string, unknown>;
																			// avoid losing value when renaming key
																			const val = spec[k];
																			delete spec[k];
																			spec[newKey] = val;
																			return { ...prev, specification: spec } as EditableProduct;
																		});
																	}}
																/>
																<input
																	className="w-full md:flex-1 p-2 bg-black rounded text-sm"
																	value={v === undefined || v === null ? "" : String(v)}
																	onChange={(e) => {
																		const newVal = e.target.value;
																		setEditProduct((prev) => {
																			if (!prev) return prev;
																			const spec = { ...(prev.specification || {}) } as Record<string, unknown>;
																			spec[k] = newVal;
																			return { ...prev, specification: spec } as EditableProduct;
																		});
																	}}
																/>
																<button
																	className="w-full md:w-auto px-2 py-1 bg-red-700 rounded text-sm"
																	onClick={() => {
																		setEditProduct((prev) => {
																			if (!prev) return prev;
																			const spec = { ...(prev.specification || {}) } as Record<string, unknown>;
																			delete spec[k];
																			return { ...prev, specification: spec } as EditableProduct;
																		});
																	}}
																>
																	Remove
																	</button>
															</div>
														))}
														{/* Add new spec entry */}
														<div className="flex flex-col md:flex-row gap-2 items-stretch mt-2">
															<input
																placeholder="Key"
																className="w-full md:flex-1 p-2 bg-black rounded text-sm"
																id="__new_spec_key"
															/>
															<input
																placeholder="Value"
																className="w-full md:flex-1 p-2 bg-black rounded text-sm"
																id="__new_spec_value"
															/>
															<button
																className="w-full md:w-auto px-3 py-2 bg-green-600 rounded text-sm"
																onClick={() => {
																	const keyEl = document.getElementById(
																		"__new_spec_key"
																	) as HTMLInputElement | null;
																	const valEl = document.getElementById(
																		"__new_spec_value"
																	) as HTMLInputElement | null;
																	if (!keyEl || !keyEl.value) {
																		alert("Please provide a key for the specification");
																		return;
																	}
																	setEditProduct((prev) => {
																		if (!prev) return prev;
																		const spec = { ...(prev.specification || {}) } as Record<string, unknown>;
																		spec[keyEl.value] = valEl?.value ?? "";
																		// clear inputs
																		keyEl.value = "";
																		if (valEl) valEl.value = "";
																		return { ...prev, specification: spec } as EditableProduct;
																	});
																}}
															>
																Add
																</button>
														</div>
													</div>
											);
											})()}
										</div>
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
										addToast({ kind: 'info', message: 'Edit canceled' });
									}}
									className="px-4 py-3 bg-transparent border rounded"
								>
									Cancel
								</button>
								<button
									onClick={async () => {
										setBusyAction('save');
										addToast({ kind: 'info', message: 'Saving…' });
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
											await handleSave(cleanedObj as IProduct);
										} else {
											// editProduct should be non-null here
											await handleSave(editProduct as IProduct);
										}
										setBusyAction(null);
									}}
									className="px-4 py-3 bg-mafia text-black rounded disabled:opacity-60"
									disabled={busyAction === 'save'}
								>
									{busyAction === 'save' ? (
										<span className="inline-flex items-center gap-2"><Spinner size={14}/> Saving…</span>
									) : 'Save'}
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
