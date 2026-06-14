import { put, list } from '@vercel/blob';
import type { IncomingMessage, ServerResponse } from 'node:http';

export const config = { runtime: 'nodejs' };

const BLOB_PATHNAME = 'config/images.json';

type VReq = IncomingMessage & { body?: unknown };
type VRes = ServerResponse & {
  status: (code: number) => VRes;
  json: (data: unknown) => VRes;
  send: (data: unknown) => VRes;
};

async function readImages(): Promise<Record<string, string>> {
  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    if (blobs.length === 0) return {};
    const res = await fetch(blobs[0].url, { cache: 'no-store' });
    if (!res.ok) return {};
    const data = await res.json();
    return data && typeof data === 'object' ? (data as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function sendJson(res: VRes, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(data));
}

async function readJsonBody(req: VReq): Promise<unknown> {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') {
      try { return JSON.parse(req.body); } catch { return null; }
    }
    return req.body;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of req as AsyncIterable<Buffer | string>) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return null;
  return JSON.parse(raw);
}

export default async function handler(req: VReq, res: VRes): Promise<void> {
  const method = req.method ?? 'GET';

  try {
    if (method === 'GET') {
      const images = await readImages();
      return sendJson(res, 200, { images });
    }

    if (method === 'POST') {
      const expected = process.env.EDIT_PIN;
      const pin = (req.headers['x-edit-pin'] as string | undefined) ?? '';
      if (!expected || pin !== expected) {
        return sendJson(res, 401, { error: 'Invalid PIN' });
      }

      let body: unknown;
      try {
        body = await readJsonBody(req);
      } catch {
        return sendJson(res, 400, { error: 'Bad JSON' });
      }

      if (body && typeof body === 'object' && (body as { verify?: boolean }).verify === true) {
        return sendJson(res, 200, { ok: true });
      }

      const raw =
        body && typeof body === 'object' && 'images' in body
          ? (body as { images: unknown }).images
          : body;

      if (!raw || typeof raw !== 'object') {
        return sendJson(res, 400, { error: 'Bad payload' });
      }

      const clean: Record<string, string> = {};
      for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
        if (typeof k === 'string' && typeof v === 'string' && v.length > 0 && v.length < 4096) {
          clean[k] = v;
        }
      }

      const token = process.env.BLOB_READ_WRITE_TOKEN;
      if (!token) {
        console.error('[api/images] Missing BLOB_READ_WRITE_TOKEN env var');
        return sendJson(res, 500, { error: 'Blob storage not configured' });
      }

      await put(BLOB_PATHNAME, JSON.stringify(clean), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
        token,
      });

      return sendJson(res, 200, { ok: true, images: clean });
    }

    return sendJson(res, 405, { error: 'Method not allowed' });
  } catch (err) {
    const e = err as { name?: string; message?: string; stack?: string };
    console.error('[api/images] Unhandled error', {
      method,
      name: e?.name,
      message: e?.message,
      stack: e?.stack,
    });
    return sendJson(res, 500, { error: 'Internal Server Error', detail: e?.message ?? String(err) });
  }
}
