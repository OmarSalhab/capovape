"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastKind = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  kind: ToastKind;
  title?: string;
  message: string;
  ttlMs?: number;
};

type ToastContextValue = {
  addToast: (t: Omit<ToastItem, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const ttl = t.ttlMs ?? 3000;
    const item: ToastItem = { id, ...t } as ToastItem;
    setToasts((prev) => [...prev, item]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, ttl);
  }, []);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast container */}
      <div className="pointer-events-none fixed z-[60] top-2 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] max-w-sm sm:max-w-md sm:right-4 sm:left-auto sm:translate-x-0 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              "pointer-events-auto rounded border p-3 shadow-md bg-[#0b0b0b] text-white " +
              (t.kind === "success"
                ? "border-green-600"
                : t.kind === "error"
                ? "border-red-600"
                : "border-zinc-600")
            }
            role="status"
            aria-live="polite"
          >
            {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
            <div className="text-sm">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
