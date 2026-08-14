import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShieldCheck, Stethoscope, User, LogIn, Activity } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

const NAV = [
  { label: 'نحوه عملکرد', to: '/#how' },
  { label: 'دموی هوشمند', to: '/#simulator' },
  { label: 'برای فیزیوتراپ‌ها', to: '/therapists-join' },
  { label: 'تنظیمات هوش مصنوعی', to: '/#ai' },
  { label: 'مزایا و هزینه‌ها', to: '/#pricing' },
  { label: 'سوالات متداول', to: '/#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-brand-900/5 dark:shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="relative">
              <Logo className="h-10 w-10" />
              <span className="absolute inset-0 rounded-xl ring-2 ring-brand-400/40 animate-pulse-slow" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              فیزیو<span className="gradient-text">آی</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-300 transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTAs + theme */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/therapist/portal"
              className="rounded-xl border-2 border-brand-600 px-4 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-slate-800 transition-colors"
            >
              ورود فیزیوتراپیست / کلینیک
            </Link>
            <Link
              to="/patient/dashboard"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-l from-brand-600 to-accent-500 px-4 py-2 text-sm font-bold text-white shadow-glow hover:shadow-glow-lg transition-shadow"
            >
              <LogIn className="h-4 w-4" />
              ورود / پنل بیمار
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white/60 text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
              aria-label="منو"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Trust pill */}
        <div className="hidden md:flex items-center justify-center pb-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 border border-brand-200 dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            تاییدیه نظام پزشکی
            <span className="mx-1 h-1 w-1 rounded-full bg-brand-400" />
            <Stethoscope className="h-3.5 w-3.5" />
            چت و ویزیت آنلاین با درمانگر
            <span className="mx-1 h-1 w-1 rounded-full bg-brand-400" />
            <Activity className="h-3.5 w-3.5" />
            پایش بیومکانیکال زنده
          </span>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-slate-200/50 dark:border-slate-700/50 animate-fade-in">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 mt-2">
              <Link
                to="/therapist/portal"
                onClick={() => setOpen(false)}
                className="rounded-xl border-2 border-brand-600 px-4 py-2.5 text-center text-sm font-bold text-brand-700 dark:text-brand-300"
              >
                ورود فیزیوتراپیست / کلینیک
              </Link>
              <Link
                to="/patient/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-l from-brand-600 to-accent-500 px-4 py-2.5 text-center text-sm font-bold text-white shadow-glow"
              >
                <User className="h-4 w-4" />
                ورود / پنل بیمار
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
