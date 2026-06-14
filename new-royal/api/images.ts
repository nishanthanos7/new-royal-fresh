import { put, list } from '@vercel/blob';

export const config = { runtime: 'nodejs20.x' };

const BLOB_PATHNAME = 'config/images.json';

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

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export default async function handler(req: Request): Promise<Response> {
  const method = req.method ?? 'GET';

  if (method === 'GET') {
    const images = await readImages();
    return jsonResponse({ images });
  }

  if (method === 'POST') {
    const expected = process.env.EDIT_PIN;
    const pin = req.headers.get('x-edit-pin') ?? '';
    if (!expected || pin !== expected) {
      return jsonResponse({ error: 'Invalid PIN' }, 401);
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: 'Bad JSON' }, 400);
    }

    if (body && typeof body === 'object' && (body as { verify?: boolean }).verify === true) {
      return jsonResponse({ ok: true });
    }

    const raw =
      body && typeof body === 'object' && 'images' in body
        ? (body as { images: unknown }).images
        : body;

    if (!raw || typeof raw !== 'object') {
      return jsonResponse({ error: 'Bad payload' }, 400);
    }

    const clean: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof k === 'string' && typeof v === 'string' && v.length > 0 && v.length < 4096) {
        clean[k] = v;
      }
    }

    await put(BLOB_PATHNAME, JSON.stringify(clean), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });

    return jsonResponse({ ok: true, images: clean });
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}
