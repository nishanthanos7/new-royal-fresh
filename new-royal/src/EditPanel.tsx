import { useEffect, useMemo, useState } from 'react';
import { ASSET_REGISTRY, DEFAULTS, useAssetMap } from './imageRegistry';

const PIN_STORAGE_KEY = 'nr_edit_pin';

export default function EditPanel() {
  const initialMap = useAssetMap();
  const [pin, setPin] = useState<string>(() => sessionStorage.getItem(PIN_STORAGE_KEY) ?? '');
  const [authed, setAuthed] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [verifying, setVerifying] = useState<boolean>(false);

  const [draft, setDraft] = useState<Record<string, string>>({});
  const [busyKey, setBusyKey] = useState<string>('');
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    setDraft({ ...DEFAULTS, ...initialMap });
  }, [initialMap]);

  const grouped = useMemo(() => {
    const m = new Map<string, typeof ASSET_REGISTRY>();
    for (const a of ASSET_REGISTRY) {
      const arr = m.get(a.section) ?? [];
      arr.push(a);
      m.set(a.section, arr);
    }
    return Array.from(m.entries());
  }, []);

  async function tryAuth(candidate: string) {
    setVerifying(true);
    setAuthError('');
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-edit-pin': candidate },
        body: JSON.stringify({ verify: true }),
        signal: ctrl.signal,
      });
      if (res.status === 401) {
        setAuthError('Wrong PIN. Try again.');
        setAuthed(false);
        return;
      }
      if (!res.ok) {
        const detail = await res.json().catch(() => null) as { detail?: string; error?: string } | null;
        console.error('[EditPanel] /api/images verify failed', { status: res.status, body: detail });
        setAuthError(`Server error (${res.status}): ${detail?.detail || detail?.error || 'unknown'}`);
        return;
      }
      sessionStorage.setItem(PIN_STORAGE_KEY, candidate);
      setAuthed(true);
      const cur = await fetch('/api/images', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : { images: {} }))
        .catch(() => ({ images: {} }));
      const images = (cur && cur.images) || {};
      setDraft({ ...DEFAULTS, ...images });
    } catch (err) {
      const aborted = (err as { name?: string })?.name === 'AbortError';
      console.error('[EditPanel] tryAuth error', err);
      setAuthError(aborted ? 'Request timed out. Check Vercel function logs.' : 'Network error. Try again.');
    } finally {
      window.clearTimeout(timer);
      setVerifying(false);
    }
  }

  async function handleUpload(key: string, file: File) {
    setBusyKey(key);
    setStatus(null);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('key', key);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-edit-pin': pin },
        body: form,
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || `Upload failed (${res.status})`);
      }
      const { url } = await res.json();
      setDraft((d) => ({ ...d, [key]: url }));
      setStatus({ type: 'ok', msg: 'Uploaded. Click "Save All" to publish.' });
    } catch (err) {
      setStatus({ type: 'err', msg: err instanceof Error ? err.message : 'Upload failed' });
    } finally {
      setBusyKey('');
    }
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      const overrides: Record<string, string> = {};
      for (const a of ASSET_REGISTRY) {
        if (draft[a.key] && draft[a.key] !== a.defaultUrl) overrides[a.key] = draft[a.key];
      }
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-edit-pin': pin },
        body: JSON.stringify({ images: overrides }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || `Save failed (${res.status})`);
      }
      setStatus({ type: 'ok', msg: 'Saved. The website is updated.' });
    } catch (err) {
      setStatus({ type: 'err', msg: err instanceof Error ? err.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  }

  function resetOne(key: string) {
    setDraft((d) => ({ ...d, [key]: DEFAULTS[key] }));
  }

  if (!authed) {
    return <PinGate pin={pin} setPin={setPin} onSubmit={tryAuth} error={authError} verifying={verifying} />;
  }

  return (
    <EditorUI
      grouped={grouped}
      draft={draft}
      setDraft={setDraft}
      onUpload={handleUpload}
      onSave={handleSave}
      onReset={resetOne}
      busyKey={busyKey}
      saving={saving}
      status={status}
    />
  );
}

function PinGate({
  pin, setPin, onSubmit, error, verifying,
}: {
  pin: string;
  setPin: (v: string) => void;
  onSubmit: (v: string) => void;
  error: string;
  verifying: boolean;
}) {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(pin); }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-dark-900/70 backdrop-blur p-6 sm:p-8 space-y-5"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-serif text-white">Admin · Image Editor</h1>
          <p className="text-white/55 text-sm">Enter your PIN to manage website images.</p>
        </div>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white text-center text-lg tracking-[0.5em] focus:outline-none focus:border-brand-500"
        />
        {error && <p className="text-red-400 text-xs text-center">{error}</p>}
        <button
          type="submit"
          disabled={verifying || pin.length === 0}
          className="w-full bg-linear-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 disabled:opacity-40 text-white px-5 py-3 rounded-lg text-sm font-bold uppercase tracking-[0.18em] transition-all"
        >
          {verifying ? 'Verifying…' : 'Unlock'}
        </button>
        <a href="/" className="block text-center text-white/40 text-xs hover:text-brand-400">← Back to website</a>
      </form>
    </div>
  );
}

type GroupedAssets = [string, typeof ASSET_REGISTRY][];

function EditorUI({
  grouped, draft, setDraft, onUpload, onSave, onReset, busyKey, saving, status,
}: {
  grouped: GroupedAssets;
  draft: Record<string, string>;
  setDraft: (fn: (d: Record<string, string>) => Record<string, string>) => void;
  onUpload: (key: string, file: File) => void;
  onSave: () => void;
  onReset: (key: string) => void;
  busyKey: string;
  saving: boolean;
  status: { type: 'ok' | 'err'; msg: string } | null;
}) {
  return (
    <div className="min-h-screen bg-dark-950 pb-32">
      <header className="sticky top-0 z-20 bg-dark-950/95 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-white font-serif text-xl">Image Editor</h1>
            <p className="text-white/45 text-xs">Upload new images or paste a hosted URL. Click "Save All" to publish.</p>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="text-white/60 hover:text-white text-xs uppercase tracking-wider border border-white/15 rounded-full px-3 py-2">Preview Site</a>
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="bg-linear-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full px-5 py-2.5"
            >
              {saving ? 'Saving…' : 'Save All'}
            </button>
          </div>
        </div>
        {status && (
          <div className={`max-w-5xl mx-auto px-4 sm:px-6 pb-3 text-xs ${status.type === 'ok' ? 'text-green-400' : 'text-red-400'}`}>{status.msg}</div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        {grouped.map(([section, items]) => (
          <section key={section} className="space-y-3">
            <h2 className="text-brand-400 text-xs font-bold uppercase tracking-[0.22em]">{section}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((a) => (
                <AssetRow
                  key={a.key}
                  asset={a}
                  value={draft[a.key] ?? a.defaultUrl}
                  busy={busyKey === a.key}
                  onUpload={(f) => onUpload(a.key, f)}
                  onUrlChange={(url) => setDraft((d) => ({ ...d, [a.key]: url }))}
                  onReset={() => onReset(a.key)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

function AssetRow({
  asset, value, busy, onUpload, onUrlChange, onReset,
}: {
  key?: string;
  asset: (typeof ASSET_REGISTRY)[number];
  value: string;
  busy: boolean;
  onUpload: (file: File) => void;
  onUrlChange: (url: string) => void;
  onReset: () => void;
}) {
  const isDefault = value === asset.defaultUrl;
  const accept = asset.type === 'video' ? 'video/*' : 'image/*';
  return (
    <div className="rounded-xl border border-white/10 bg-dark-900/60 backdrop-blur p-3 sm:p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-800 border border-white/10 shrink-0">
          {asset.type === 'video' ? (
            <video src={value} muted playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={value} alt={asset.label} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-semibold leading-snug">{asset.label}</div>
          <div className="text-white/35 text-[10px] uppercase tracking-wider mt-1">{asset.key}</div>
          {!isDefault && <div className="text-brand-400 text-[10px] uppercase tracking-wider mt-1">Custom</div>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
              e.target.value = '';
            }}
          />
          <div className={`text-center text-xs font-bold uppercase tracking-wider rounded-lg px-3 py-2 border transition-colors ${busy ? 'border-white/10 text-white/30' : 'border-brand-500/40 text-brand-300 hover:bg-brand-500/10'}`}>
            {busy ? 'Uploading…' : `Upload ${asset.type}`}
          </div>
        </label>
        <button
          type="button"
          onClick={onReset}
          disabled={isDefault}
          className="text-xs font-bold uppercase tracking-wider rounded-lg px-3 py-2 border border-white/10 text-white/55 hover:text-white disabled:opacity-30"
        >
          Reset
        </button>
      </div>

      <input
        type="url"
        value={value}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="Or paste image URL"
        className="w-full bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-white/85 text-xs focus:outline-none focus:border-brand-500/60"
      />
    </div>
  );
}



