"use client";

import React, { useState } from "react";

interface Product {
	title: string;
	brand: string;
	price: number;
	productId: string;
	inStock: boolean;
	briefDescription?: string;
	description?: string;
	image?: string;
	imageKey?: string;
}

export default function CreateModal({
	visible,
	onClose,
	onCreated,
}: {
	visible: boolean;
	onClose: () => void;
	onCreated: () => void;
}) {
	const [newProduct, setNewProduct] = useState<Product>({
		title: "",
		brand: "",
		price: 0,
		productId: "",
		inStock: true,
	});
	// track a temporary uploaded key so we can delete it if the user cancels
	const [tempUploadedKey, setTempUploadedKey] = useState<string | null>(null);
	const [specEntries, setSpecEntries] = useState<
		Array<{ k: string; v: string }>
	>([]);
	const [uploading, setUploading] = useState(false);

	if (!visible) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
			<div className="bg-[#0b0b0b] rounded-lg p-4 w-full max-w-3xl max-h-[92vh] overflow-auto shadow-lg">
				<h2 className="text-xl md:text-2xl font-semibold mb-2">
					Create product
				</h2>
				<p className="text-sm text-muted-foreground mb-3">
					Fill in the product details. Upload an image or paste a public URL. If
					you upload and then cancel, the temporary image will be removed.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div>
						<label className="block text-sm md:text-base mb-1">Title</label>
						<input
							value={newProduct.title}
							onChange={(e) =>
								setNewProduct({ ...newProduct, title: e.target.value })
							}
							placeholder="Title"
							className="p-3 bg-black rounded text-base md:text-lg w-full"
						/>
					</div>
					<div>
						<label className="block text-sm md:text-base mb-1">Brand</label>
						<input
							value={newProduct.brand || ""}
							onChange={(e) =>
								setNewProduct({ ...newProduct, brand: e.target.value })
							}
							placeholder="Brand"
							className="p-3 bg-black rounded text-base md:text-lg w-full"
						/>
					</div>

					<div>
						<label className="block text-sm md:text-base mb-1">
							Product slug (used in URLs)
						</label>
						<input
							value={newProduct.productId || ""}
							onChange={(e) =>
								setNewProduct({ ...newProduct, productId: e.target.value })
							}
							placeholder="product-slug (e.g. ultra-500-blue)"
							className="p-3 bg-black rounded text-sm md:text-base w-full"
						/>
						<p className="text-xs text-muted-foreground mt-1">
							This will be used to build the product URL; keep it short,
							lowercase, and use hyphens instead of spaces.
						</p>
					</div>

					<div>
						<label className="block text-sm md:text-base mb-1">
							Price
						</label>
						<input
							type="number"
							step="0.01"
							inputMode="decimal"
							value={newProduct.price === 0 ? '' : String(newProduct.price)}
							onChange={(e) => {
								const v = e.target.value;
								setNewProduct({ ...newProduct, price: v === '' ? 0 : parseFloat(v) });
							}}
							placeholder="Price (e.g. 12.45)"
							className="p-3 bg-black rounded text-sm md:text-base w-full"
						/>
					</div>

					<textarea
						value={newProduct.briefDescription || ""}
						onChange={(e) =>
							setNewProduct({ ...newProduct, briefDescription: e.target.value })
						}
						placeholder="Brief description"
						className="p-3 bg-black rounded col-span-1 md:col-span-2 text-sm md:text-base"
					/>

					<div className="col-span-1 md:col-span-2">
						<label className="block text-sm md:text-base text-muted-foreground">
							Description (full)
						</label>
						<textarea
							value={newProduct.description || ""}
							onChange={(e) =>
								setNewProduct({ ...newProduct, description: e.target.value })
							}
							placeholder="Full description"
							className="w-full p-3 bg-black rounded mt-1 text-sm md:text-base"
							rows={5}
						/>
					</div>

					<div className="flex items-start gap-3">
						<div>
							<label className="block text-sm md:text-base text-muted-foreground">
								In stock
							</label>
							<div className="mt-2">
								<label className="inline-flex items-center gap-2">
									<input
										type="checkbox"
										checked={Boolean(newProduct.inStock)}
										onChange={(e) =>
											setNewProduct({
												...newProduct,
												inStock: e.target.checked,
											})
										}
									/>
									<span className="text-sm md:text-base">Available</span>
								</label>
							</div>
						</div>
					</div>

					<div className="col-span-1 md:col-span-2">
						<label className="block text-sm md:text-base text-muted-foreground">
							Specifications
						</label>
						<div className="mt-2 space-y-2">
							{specEntries.map((s, idx) => (
								<div
									key={idx}
									className="flex flex-col md:flex-row gap-2 md:items-center"
								>
													<input
														value={s.k}
														onChange={(e) =>
															setSpecEntries(
																specEntries.map((x, i) =>
																	i === idx ? { ...x, k: e.target.value } : x
																)
															)
														}
														placeholder="Key (e.g. Size)"
														className="p-2 bg-black rounded w-full md:w-1/3 text-sm md:text-base"
													/>
													<input
														value={s.v}
														onChange={(e) =>
															setSpecEntries(
																specEntries.map((x, i) =>
																	i === idx ? { ...x, v: e.target.value } : x
																)
															)
														}
														placeholder="Value (e.g. 120ml)"
														className="p-2 bg-black rounded w-full md:flex-1 text-sm md:text-base"
													/>
									<button
										onClick={() =>
											setSpecEntries(specEntries.filter((_, i) => i !== idx))
										}
										className="px-3 py-1 bg-red-700 rounded text-sm"
									>
										Remove
									</button>
								</div>
							))}
							<button
								onClick={() =>
									setSpecEntries([...specEntries, { k: "", v: "" }])
								}
								className="px-3 py-2 bg-mafia text-black rounded text-sm md:text-base"
							>
								Add specification
							</button>
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Add product specs; on small screens fields stack for easy editing.
						</p>
					</div>

					<div className="col-span-1 md:col-span-2">
						<label className="block text-sm md:text-base text-muted-foreground">
							Image URL (paste public URL) or upload
						</label>
						<input
							value={newProduct.image || ""}
							onChange={(e) => {
								const url = e.target.value;
								// derive possible imageKey from URL pathname
								try {
									const parsed = new URL(url);
									let path = parsed.pathname || "";
									if (path.startsWith("/")) path = path.slice(1);
									// if path includes bucket-like prefix, keep full path as key
									const key = path;
									setNewProduct({ ...newProduct, image: url, imageKey: key });
								} catch {
									setNewProduct({ ...newProduct, image: url });
								}
							}}
							placeholder="https://...jpg"
							className="p-3 bg-black rounded w-full text-sm md:text-base"
						/>
						<div className="mt-3">or</div>
						<input
							type="file"
							accept="image/*"
							onChange={async (e) => {
								const file = e.target.files?.[0];
								if (!file) return;
								setUploading(true);
								try {
									const dataUrl = await new Promise<string>(
										(resolve, reject) => {
											const reader = new FileReader();
											reader.onload = () => resolve(String(reader.result));
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
									console.log("[upload result]", data);
									if (data.ok) {
										setNewProduct({
											...newProduct,
											image: data.publicUrl,
											imageKey: data.key,
										});
										// remember temporary uploaded key so we can delete it if user cancels
										setTempUploadedKey(data.key);
									} else {
										alert("Upload failed: " + (data.error || ""));
									}
								} catch (err) {
									console.error(err);
									alert("Upload error");
								}
								setUploading(false);
							}}
							className="mt-2"
						/>
						{uploading && (
							<div className="text-sm text-muted-foreground mt-2">
								Uploading...
							</div>
						)}
						{newProduct.image && (
							<div className="mt-3">
								<img
									src={newProduct.image}
									alt="preview"
									className="object-contain max-w-[220px] max-h-[220px] rounded"
								/>
							</div>
						)}
					</div>
				</div>

				<div className="mt-6 flex flex-col md:flex-row gap-3 justify-end">
					<button
						onClick={async () => {
							// if user uploaded a temporary image during this create flow and then cancels,
							// delete the object from R2 to avoid orphaned files
							if (tempUploadedKey) {
								try {
									await fetch("/api/admin/r2/delete", {
										method: "POST",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify({ key: tempUploadedKey }),
									});
								} catch (e) {
									console.error("Failed to delete temp upload", e);
								}
								setTempUploadedKey(null);
							}
							onClose();
						}}
						className="px-4 py-3 bg-transparent border rounded"
					>
						Cancel
					</button>
					<button
						onClick={async () => {
							try {
								const specObj: Record<string, string> = {};
								specEntries.forEach((s) => {
									if (s.k) specObj[s.k] = s.v;
								});
								const payload = { ...newProduct, specification: specObj };
								const res = await fetch("/api/admin/products", {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify(payload),
								});
								const data = await res.json();
								if (data.ok) {
									// clear any temp key since product saved and image is now persistent
									setTempUploadedKey(null);
									onClose();
									onCreated();
								} else {
									alert("Create failed: " + (data.error || ""));
								}
							} catch (err) {
								console.error(err);
								alert("Create error");
							}
						}}
						className="px-4 py-3 bg-green-600 rounded text-black"
					>
						Create
					</button>
				</div>
			</div>
		</div>
	);
}
