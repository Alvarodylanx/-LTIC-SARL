'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag, Zap, Wrench, TrendingUp, AlertTriangle,
  Plus, Loader2, ChevronDown, ChevronUp, CheckCircle2, Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAdminToken } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ChangeEntry {
  type: 'feature' | 'fix' | 'improvement' | 'breaking';
  description: string;
}

interface VersionEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  summary: string;
  changes: ChangeEntry[];
}

interface VersionData {
  version: string;
  releaseDate: string;
  changelog: VersionEntry[];
}

const typeConfig = {
  feature:     { label: 'Feature',     icon: Zap,           color: 'text-blue-600 bg-blue-50 border-blue-200' },
  fix:         { label: 'Fix',         icon: Wrench,         color: 'text-green-600 bg-green-50 border-green-200' },
  improvement: { label: 'Improvement', icon: TrendingUp,     color: 'text-purple-600 bg-purple-50 border-purple-200' },
  breaking:    { label: 'Breaking',    icon: AlertTriangle,  color: 'text-red-600 bg-red-50 border-red-200' },
};

const releaseConfig = {
  major: { label: 'Major', color: 'bg-red-100 text-red-700 border-red-200' },
  minor: { label: 'Minor', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  patch: { label: 'Patch', color: 'bg-green-100 text-green-700 border-green-200' },
};

async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

function VersionCard({ entry, index }: { entry: VersionEntry; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const rel = releaseConfig[entry.type] || releaseConfig.patch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-card border rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg font-mono">v{entry.version}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${rel.color}`}>
                {rel.label}
              </span>
              {index === 0 && (
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-medium">
                  Latest
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{entry.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />{entry.date}
          </span>
          <span className="text-xs text-muted-foreground">
            {entry.changes.length} {entry.changes.length === 1 ? 'change' : 'changes'}
          </span>
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 border-t bg-muted/10">
              <div className="space-y-2 mt-3">
                {entry.changes.map((change, i) => {
                  const cfg = typeConfig[change.type] || typeConfig.feature;
                  const Icon = cfg.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 mt-0.5 ${cfg.color}`}>
                        <Icon className="h-3 w-3" />
                        {cfg.label}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed">{change.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NewReleaseForm({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [releaseType, setReleaseType] = useState<'major' | 'minor' | 'patch'>('patch');
  const [summary, setSummary] = useState('');
  const [changes, setChanges] = useState<ChangeEntry[]>([
    { type: 'feature', description: '' },
  ]);

  const addChange = () => setChanges((prev) => [...prev, { type: 'feature', description: '' }]);
  const removeChange = (i: number) => setChanges((prev) => prev.filter((_, idx) => idx !== i));
  const updateChange = (i: number, field: keyof ChangeEntry, value: string) =>
    setChanges((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validChanges = changes.filter((c) => c.description.trim());
    if (!summary.trim() || validChanges.length === 0) {
      toast.error('Summary and at least one change are required');
      return;
    }
    setLoading(true);
    try {
      const result = await adminFetch<{ version: string }>('/api/version/release', {
        method: 'POST',
        body: JSON.stringify({ type: releaseType, summary, changes: validChanges }),
      });
      toast.success(`Version ${result.version} released!`);
      setSummary('');
      setChanges([{ type: 'feature', description: '' }]);
      setOpen(false);
      onCreated();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(!open)} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        New Release
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-4 bg-card border rounded-2xl p-6"
          >
            <h3 className="font-bold mb-4">Create New Release</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Release type */}
              <div className="space-y-1.5">
                <Label>Release Type</Label>
                <div className="flex gap-2">
                  {(['patch', 'minor', 'major'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setReleaseType(t)}
                      className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors capitalize ${
                        releaseType === t ? 'bg-primary text-white border-primary' : 'hover:bg-muted'
                      }`}
                    >
                      {releaseConfig[t].label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {releaseType === 'patch' && 'Bug fixes and minor corrections (x.x.+1)'}
                  {releaseType === 'minor' && 'New features, backwards compatible (x.+1.0)'}
                  {releaseType === 'major' && 'Breaking changes or major redesigns (+1.0.0)'}
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <Label htmlFor="summary">Release Summary</Label>
                <Input
                  id="summary"
                  placeholder="Short description of this release..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                />
              </div>

              {/* Changes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label>Changes</Label>
                  <button type="button" onClick={addChange} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <Plus className="h-3 w-3" /> Add change
                  </button>
                </div>
                <div className="space-y-2">
                  {changes.map((change, i) => (
                    <div key={i} className="flex gap-2">
                      <select
                        value={change.type}
                        onChange={(e) => updateChange(i, 'type', e.target.value)}
                        className="flex h-10 rounded-md border border-input bg-background px-2 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="feature">Feature</option>
                        <option value="fix">Fix</option>
                        <option value="improvement">Improvement</option>
                        <option value="breaking">Breaking</option>
                      </select>
                      <Input
                        placeholder="Describe the change..."
                        value={change.description}
                        onChange={(e) => updateChange(i, 'description', e.target.value)}
                        className="flex-1 text-sm"
                      />
                      {changes.length > 1 && (
                        <button type="button" onClick={() => removeChange(i)} className="text-muted-foreground hover:text-destructive transition-colors px-1">
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  Publish Release
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ChangelogPage() {
  const [data, setData] = useState<VersionData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch(`${API_URL}/api/version`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="p-8 flex items-center justify-center h-96">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">Changelog</h1>
            {data && (
              <span className="text-sm font-mono bg-primary text-white px-3 py-1 rounded-full">
                v{data.version}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            Version history and release notes for LTIC SARL platform
          </p>
        </div>
        <NewReleaseForm onCreated={load} />
      </div>

      {/* Stats */}
      {data && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Current Version', value: `v${data.version}` },
            { label: 'Total Releases', value: data.changelog.length.toString() },
            { label: 'Latest Release', value: data.releaseDate },
          ].map((s) => (
            <div key={s.label} className="bg-card border rounded-xl p-4 text-center">
              <p className="text-lg font-bold font-mono">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        {data?.changelog.map((entry, i) => (
          <VersionCard key={entry.version} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}
