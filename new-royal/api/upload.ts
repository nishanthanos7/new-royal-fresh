import { put } from '@vercel/blob';

export const config = { runtime: 'edge' };

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB cap per upload

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 80) || 'upload';
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const expected = process.env.EDIT_PIN;
  const pin = req.headers.get('x-edit-pin') ?? '';
  if (!expected || pin !== expected) {
    return jsonResponse({ error: 'Invalid PIN' }, 401);
  }

  const contentType = req.headers.get('content-type') ?? '';
  let file: File | null = null;
  let key = req.headers.get('x-asset-key') ?? 'asset';

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    const f = form.get('file');
    if (f instanceof File) file = f;
    const k = form.get('key');
    if (typeof k === 'string' && k.length > 0) key = k;
  } else {
    const blob = await req.blob();
    if (blob.size > 0) {
      file = new File([blob], req.headers.get('x-filename') ?? 'upload.bin', {
        type: contentType || 'application/octet-stream',
      });
    }
  }

  if (!file) return jsonResponse({ error: 'No file' }, 400);
  if (file.size > MAX_BYTES) {
    return jsonResponse({ error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` }, 413);
  }

  const ext = (() => {
    const m = /\.([a-zA-Z0-9]+)$/.exec(file.name || '');
    if (m) return m[1].toLowerCase();
    const t = file.type.split('/')[1];
    return (t || 'bin').toLowerCase();
  })();

  const safeKey = safeName(key);
  const pathname = `assets/${safeKey}-${Date.now()}.${ext}`;

  const result = await put(pathname, file, {
    access: 'public',
    contentType: file.type || undefined,
    addRandomSuffix: true,
  });

  return jsonResponse({ url: result.url, pathname: result.pathname });
}
