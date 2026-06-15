import { put } from '@vercel/blob';

export const config = { runtime: 'nodejs' };

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
  try {
    if (req.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    const expected = process.env.EDIT_PIN;
    const pin = req.headers.get('x-edit-pin') ?? '';
    if (!expected || pin !== expected) {
      return jsonResponse({ error: 'Invalid PIN' }, 401);
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('[upload] BLOB_READ_WRITE_TOKEN not configured');
      return jsonResponse({ error: 'Storage not configured' }, 500);
    }

    const contentType = req.headers.get('content-type') ?? '';
    let file: File | null = null;
    let key = req.headers.get('x-asset-key') ?? 'asset';

    try {
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
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : 'Unknown error';
      console.error('[upload] Failed to parse request body:', msg);
      return jsonResponse({ error: `Failed to parse upload: ${msg}` }, 400);
    }

    if (!file) return jsonResponse({ error: 'No file provided' }, 400);
    if (file.size === 0) return jsonResponse({ error: 'Empty file' }, 400);
    if (file.size > MAX_BYTES) {
      return jsonResponse({ error: `File too large (max ${MAX_BYTES / 1024 / 1024}MB)` }, 413);
    }

    const ext = (() => {
      const m = /\.([a-zA-Z0-9]+)$/.exec(file.name || '');
      if (m) return m[1].toLowerCase();
      const t = file.type.split('/')[1];
      return (t || 'bin').toLowerCase();
    })();

    const safeKey = safeName(key);
    const pathname = `assets/${safeKey}-${Date.now()}.${ext}`;

    console.log('[upload] Starting upload:', { pathname, fileSize: file.size, fileType: file.type });

    const result = await put(pathname, file, {
      access: 'public',
      contentType: file.type || 'application/octet-stream',
      addRandomSuffix: true,
    });

    if (!result?.url) {
      console.error('[upload] No URL in response:', result);
      return jsonResponse({ error: 'Upload completed but no URL received' }, 500);
    }

    console.log('[upload] Success:', { url: result.url });
    return jsonResponse({ url: result.url, pathname: result.pathname });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : '';
    console.error('[upload] Fatal error:', { message, stack });
    return jsonResponse({ 
      error: `Server error: ${message}` 
    }, 500);
  }
}
