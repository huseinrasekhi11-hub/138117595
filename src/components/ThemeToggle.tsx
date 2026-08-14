import { useTheme } from '@/lib/theme';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const options = [
    { id: 'light' as const, label: 'روشن', icon: Sun },
    { id: 'dark' as const, label: 'تاریک', icon: Moon },
    { id: 'system' as const, label: 'سیستم', icon: Monitor },
  ];

  const active = options.find((o) => o.id === theme);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white/60 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
        aria-label="تغییر تم"
      >
        {active && <active.icon className="h-4 w-4" />}
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-36 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50 dark:border-slate-700 dark:bg-slate-800">
          {options.map((o) => {
            const Icon = o.icon;
            return (
              <button
                key={o.id}
                onClick={() => { setTheme(o.id); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                  theme === o.id
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
