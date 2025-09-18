"use client";

import React, { useState } from 'react';

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

export default function CreateModal({ visible, onClose, onCreated }: { visible: boolean; onClose: () => void; onCreated: () => void }) {
  const [newProduct, setNewProduct] = useState<Product>({ title: '', brand: '', price: 0, productId: '', inStock: true });
  const [specEntries, setSpecEntries] = useState<Array<{ k: string; v: string }>>([]);
  const [uploading, setUploading] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-[#0b0b0b] rounded p-4 w-full max-w-2xl max-h-[90vh] overflow-auto">
        <h2 className="text-xl mb-2">Create product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} placeholder="Title" className="p-2 bg-black rounded" />
          <input value={newProduct.brand || ''} onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })} placeholder="Brand" className="p-2 bg-black rounded" />
          <input value={newProduct.productId || ''} onChange={e => setNewProduct({ ...newProduct, productId: e.target.value })} placeholder="ProductId (slug)" className="p-2 bg-black rounded" />
          <input value={String(newProduct.price || '')} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value || 0) })} placeholder="Price" className="p-2 bg-black rounded" />
          <textarea value={newProduct.briefDescription || ''} onChange={e => setNewProduct({ ...newProduct, briefDescription: e.target.value })} placeholder="Brief description" className="p-2 bg-black rounded col-span-1 md:col-span-2" />

          <div className="col-span-1 md:col-span-2">
            <label className="text-xs text-muted-foreground">Description (full)</label>
            <textarea value={newProduct.description || ''} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Full description" className="w-full p-2 bg-black rounded mt-1" rows={4} />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">In stock</label>
            <div className="mt-1">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={Boolean(newProduct.inStock)} onChange={e => setNewProduct({ ...newProduct, inStock: e.target.checked })} />
                <span className="text-sm">Available</span>
              </label>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="text-xs text-muted-foreground">Specifications</label>
            <div className="mt-1 space-y-2">
              {specEntries.map((s, idx) => (
                <div key={idx} className="flex gap-2">
                  <input value={s.k} onChange={e => setSpecEntries(specEntries.map((x,i) => i===idx?{...x,k:e.target.value}:x))} placeholder="key" className="p-2 bg-black rounded w-1/3" />
                  <input value={s.v} onChange={e => setSpecEntries(specEntries.map((x,i) => i===idx?{...x,v:e.target.value}:x))} placeholder="value" className="p-2 bg-black rounded flex-1" />
                  <button onClick={() => setSpecEntries(specEntries.filter((_,i) => i!==idx))} className="px-2 bg-red-700 rounded">Remove</button>
                </div>
              ))}
              <button onClick={() => setSpecEntries([...specEntries, { k: '', v: '' }])} className="px-2 py-1 bg-mafia text-black rounded">Add spec</button>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Image URL (paste public URL) or upload</label>
            <input value={newProduct.image || ''} onChange={e => {
              const url = e.target.value;
              // derive possible imageKey from URL pathname
              try {
                const parsed = new URL(url);
                let path = parsed.pathname || '';
                if (path.startsWith('/')) path = path.slice(1);
                // if path includes bucket-like prefix, keep full path as key
                const key = path;
                setNewProduct({ ...newProduct, image: url, imageKey: key });
              } catch {
                setNewProduct({ ...newProduct, image: url });
              }
            }} placeholder="https://...jpg" className="p-2 bg-black rounded w-full" />
            <div className="mt-2">or</div>
            <input type="file" accept="image/*" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploading(true);
              try {
                const dataUrl = await new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(String(reader.result));
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                });
                const base64 = dataUrl.split(',')[1];
                const res = await fetch('/api/admin/r2/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: file.name, contentType: file.type, data: base64, keyPrefix: 'products' }) });
                const data = await res.json();
                console.log('[upload result]', data);
                if (data.ok) {
                  setNewProduct({ ...newProduct, image: data.publicUrl, imageKey: data.key });
                } else {
                  alert('Upload failed: ' + (data.error || ''));
                }
              } catch (err) { console.error(err); alert('Upload error'); }
              setUploading(false);
            }} />
            {uploading && <div className="text-sm text-muted-foreground mt-2">Uploading...</div>}
            {newProduct.image && (
              <div className="mt-2">
                <img src={newProduct.image} alt="preview" className="object-contain max-w-[200px] max-h-[200px]" />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-2 bg-transparent border rounded">Cancel</button>
          <button onClick={async () => {
            try {
              const specObj: Record<string, string> = {};
              specEntries.forEach(s => { if (s.k) specObj[s.k] = s.v; });
              const payload = { ...newProduct, specification: specObj };
              const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
              const data = await res.json();
              if (data.ok) {
                onClose();
                onCreated();
              } else {
                alert('Create failed: ' + (data.error || ''));
              }
            } catch (err) { console.error(err); alert('Create error'); }
          }} className="px-3 py-2 bg-green-600 rounded">Create</button>
        </div>
      </div>
    </div>
  );
}
