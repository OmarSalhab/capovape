// Lightweight, TypeScript-safe logger utility used across server code.
// Exports a named `logger` and a default export. Honours NODE_ENV and DEBUG.

type Meta = Record<string, unknown> | string | number | boolean | undefined;

const isProd = process.env.NODE_ENV === "production";
const debugEnabled = !isProd || process.env.DEBUG === "true";

function safeStringify(meta?: Meta) {
  if (meta === undefined) return "";
  if (typeof meta === "string") return meta;
  try {
    return JSON.stringify(meta);
  } catch {
    return String(meta);
  }
}

export const logger = {
  debug(msg: string, meta?: Meta) {
    if (!debugEnabled) return;
  console.debug(`[capo:debug] ${msg}${meta ? ' ' + safeStringify(meta) : ''}`);
  },
  info(msg: string, meta?: Meta) {
    if (isProd && !process.env.DEBUG) return;
  console.info(`[capo:info] ${msg}${meta ? ' ' + safeStringify(meta) : ''}`);
  },
  warn(msg: string, meta?: Meta) {
  console.warn(`[capo:warn] ${msg}${meta ? ' ' + safeStringify(meta) : ''}`);
  },
  error(msg: string, meta?: Meta) {
  console.error(`[capo:error] ${msg}${meta ? ' ' + safeStringify(meta) : ''}`);
  },
};

export default logger;
