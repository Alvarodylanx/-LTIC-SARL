'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COUNTRY_DATA } from '@/lib/countries';

const ALL_COUNTRIES = [
  ...COUNTRY_DATA.filter(c => c.code !== 'XX'),
  { name: 'Other', code: 'OT', flag: '🌍', dial: '+', pattern: /./, example: '' },
];

function FlagImg({ code, className }: { code: string; className?: string }) {
  if (code === 'OT' || code === 'XX') {
    return <Globe className={cn('text-muted-foreground', className ?? 'h-4 w-5')} />;
  }
  return (
    <img
      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
      alt={code}
      className={cn('object-cover rounded-sm', className ?? 'h-3.5 w-5')}
      loading="lazy"
    />
  );
}

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholderEn?: string;
  placeholderFr?: string;
  lang?: 'en' | 'fr';
  required?: boolean;
  className?: string;
  id?: string;
}

export function CountrySelect({
  value,
  onChange,
  placeholderEn,
  placeholderFr,
  lang = 'en',
  required,
  className,
  id,
}: CountrySelectProps) {
  const placeholder =
    lang === 'fr'
      ? placeholderFr || 'Sélectionnez ou tapez un pays…'
      : placeholderEn || 'Select or type a country…';

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = ALL_COUNTRIES.find(c => c.name === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = query.trim()
    ? ALL_COUNTRIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : ALL_COUNTRIES;

  // When open: show live query; when closed: show selected name (flag shown separately via img)
  const inputValue = open ? query : (selected ? selected.name : '');

  const handleSelect = (name: string) => {
    onChange(name);
    setOpen(false);
    setQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setQuery('');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setOpen(true);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); setQuery(''); }
    if (e.key === 'Enter' && filtered.length === 1) {
      e.preventDefault();
      handleSelect(filtered[0].name);
    }
  };

  return (
    <div className={cn('relative', className)} ref={wrapRef}>
      <div className="relative flex items-center">
        {/* Flag shown inside input on the left when a country is selected and not typing */}
        {selected && !open && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center">
            <FlagImg code={selected.code} />
          </span>
        )}

        <input
          ref={inputRef}
          id={id}
          type="text"
          autoComplete="off"
          value={inputValue}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required && !value}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background text-sm',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'pr-8',
            selected && !open ? 'pl-10' : 'pl-3',
          )}
        />

        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center">
          {value ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <ChevronDown
              className={cn('h-3.5 w-3.5 text-muted-foreground pointer-events-none transition-transform', open && 'rotate-180')}
            />
          )}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-xl shadow-xl z-[60] overflow-hidden"
          >
            <div className="max-h-56 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-xs text-muted-foreground px-3 py-4 text-center">
                  {lang === 'fr' ? 'Aucun pays trouvé' : 'No countries found'}
                </p>
              ) : (
                filtered.map(c => (
                  <button
                    key={c.code + c.name}
                    type="button"
                    onClick={() => handleSelect(c.name)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted transition-colors text-left',
                      value === c.name && 'bg-primary/10 text-primary font-medium'
                    )}
                  >
                    <FlagImg code={c.code} />
                    <span>{c.name}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
