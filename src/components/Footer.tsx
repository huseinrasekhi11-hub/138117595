import React from 'react';
import { Activity, Mail, Phone } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-900 text-slate-600 dark:text-slate-400 pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Activity className="w-5 h-5"/>
              </div>
              <span className="text-lg font-black text-slate-900 dark:text-white">تله‌فیزیو</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              دستیار دیجیتال فیزیوتراپیست و پل ارتباطی هوشمند برای پایش دقیق روند درمان در منزل. جلوگیری از رهاسازی درمان با استفاده از تکنولوژی بینایی ماشین.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">درباره پلتفرم و رسالت ما</button></li>
              <li><button onClick={() => onNavigate('therapist-profile')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">پروفایل نمونه درمانگر</button></li>
              <li><button className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">همکاری با کلینیک‌ها</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">پشتیبانی</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">راهنمای استفاده بیماران</button></li>
              <li><button className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">حریم خصوصی داده‌های پزشکی</button></li>
              <li className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Phone className="w-4 h-4"/> ۰۲۱-۸۸۸۸۸۸۸
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-slate-200 dark:border-slate-800 pt-8">
          <div>© 2026 سامانه هوشمند تله‌فیزیوتراپی. تمامی حقوق بالینی و نرم‌افزاری محفوظ است.</div>
          <div className="flex gap-4">
            <span>سرورهای امن سلامت</span>
            <span>پروتکل رمزنگاری SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
