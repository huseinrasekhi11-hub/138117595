import { Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse, AlertCircle, Instagram, Linkedin, Twitter, Send } from 'lucide-react';
import Logo from '@/components/Logo';

const LINKS = [
  { title: 'پلتفرم', items: [{ label: 'نحوه عملکرد', to: '/#how' }, { label: 'دموی هوشمند', to: '/#simulator' }, { label: 'برای فیزیوتراپ‌ها', to: '/therapists-join' }, { label: 'تنظیمات هوش مصنوعی', to: '/#ai' }] },
  { title: 'منابع', items: [{ label: 'مزایا و هزینه‌ها', to: '/#pricing' }, { label: 'سوالات متداول', to: '/#faq' }, { label: 'راهنمای بیماران', to: '/patient-guide' }, { label: 'درباره پلتفرم', to: '/about' }] },
  { title: 'شرکت', items: [{ label: 'درباره ما', to: '/about' }, { label: 'تماس با پشتیبانی', to: '/support' }, { label: 'همکاری با کلینیک‌ها', to: '/therapists-join' }, { label: 'حریم خصوصی', to: '/privacy' }] },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* CTA strip */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-right">
              <h3 className="text-2xl font-extrabold text-white">آماده شروع توانبخشی هوشمند هستید؟</h3>
              <p className="mt-2 text-slate-400">همین حالا ارزیابی رایگان ۳ دقیقه‌ای خود را شروع کنید.</p>
            </div>
            <Link
              to="/#triage"
              className="rounded-2xl bg-gradient-to-l from-brand-600 to-accent-500 px-8 py-4 text-sm font-bold text-white shadow-glow hover:shadow-glow-lg transition-shadow whitespace-nowrap"
            >
              شروع ارزیابی رایگان
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Logo className="h-10 w-10" />
              <span className="text-xl font-extrabold text-white">فیزیوآی</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              پلتفرم هوشمند فیزیوتراپی در منزل با پایش هوشمند زوایا و زیر نظر فیزیوتراپ اختصاصی. توانبخشی تخصصی بدون نیاز به رفت‌وآمد.
            </p>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
                اینماد
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
                <HeartPulse className="h-3.5 w-3.5 text-brand-400" />
                نظام پزشکی
              </span>
            </div>

            {/* Social */}
            <div className="mt-5 flex gap-2">
              {[Instagram, Linkedin, Twitter, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-extrabold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-slate-400 hover:text-brand-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 rounded-2xl bg-slate-800/50 border border-slate-700 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-warning-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-300">سلب مسئولیت پزشکی:</span> این ابزار مکمل درمان تحت نظر متخصص است و جایگزین معاینه بالینی، تشخیص پزشک یا برنامه درمانی تجویزشده نمی‌باشد. پیش از شروع هر برنامه تمرینی با پزشک یا فیزیوتراپ خود مشورت کنید.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} فیزیوآی — تمام حقوق محفوظ است.</p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link to="/privacy" className="hover:text-slate-300">حریم خصوصی</Link>
            <Link to="/patient-guide" className="hover:text-slate-300">راهنمای بیماران</Link>
            <Link to="/support" className="hover:text-slate-300">تماس با پشتیبانی</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
