import type { MetadataRoute } from 'next';
import dbConnect from '../../lib/mongoose';
import Product from '../../models/Product';

const BASE = 'https://capovape.ca';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'daily', priority: 1.0, lastModified: new Date() },
    { url: `${BASE}/disposable-vapes`, changeFrequency: 'daily', priority: 0.9, lastModified: new Date() },
    { url: `${BASE}/e-liquids`, changeFrequency: 'daily', priority: 0.8, lastModified: new Date() },
    { url: `${BASE}/pods-devices`, changeFrequency: 'weekly', priority: 0.7, lastModified: new Date() },
    { url: `${BASE}/pods-devices/pods`, changeFrequency: 'weekly', priority: 0.7, lastModified: new Date() },
    { url: `${BASE}/pods-devices/devices`, changeFrequency: 'weekly', priority: 0.7, lastModified: new Date() },
  ];

  try {
    await dbConnect();
    // Brands and detail pages
    const brandDocs = await Product.aggregate([
      { $group: { _id: '$brand', latest: { $max: '$updatedAt' } } },
    ]).exec();
    for (const b of brandDocs) {
      const id = String(b._id);
      const lastModified = b.latest || new Date();
      // Generic brand page (all categories)
      entries.push({ url: `${BASE}/${encodeURIComponent(id)}`, changeFrequency: 'daily', priority: 0.7, lastModified });
      // Category-scoped brand pages
      entries.push({ url: `${BASE}/disposable-vapes/${encodeURIComponent(id)}`, changeFrequency: 'daily', priority: 0.8, lastModified });
      entries.push({ url: `${BASE}/e-liquids/${encodeURIComponent(id)}`, changeFrequency: 'daily', priority: 0.7, lastModified });
      entries.push({ url: `${BASE}/pods-devices/pods/${encodeURIComponent(id)}`, changeFrequency: 'weekly', priority: 0.6, lastModified });
      entries.push({ url: `${BASE}/pods-devices/devices/${encodeURIComponent(id)}`, changeFrequency: 'weekly', priority: 0.6, lastModified });
    }

    // Product detail pages
    const products = await Product.find({}, { productId: 1, brand: 1, updatedAt: 1 }).lean() as Array<{ productId: string; brand: string; updatedAt?: Date }>;
    for (const p of products) {
      const url = `${BASE}/${encodeURIComponent(p.brand)}/${encodeURIComponent(p.productId)}`;
      entries.push({ url, changeFrequency: 'weekly', priority: 0.6, lastModified: p.updatedAt ?? new Date() });
    }
  } catch {
    // Fail soft: return static entries only if DB unavailable
  }

  return entries;
}
