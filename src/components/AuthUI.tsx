import React, { useState } from 'react';
import { UserCircle, Stethoscope, Lock, Mail, ArrowLeft } from 'lucide-react';

export const AuthUI: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [authRole, setAuthRole] = useState<'patient' | 'therapist'>('patient');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <button onClick={onClose} className="mb-6 text-slate-500 hover:text-slate-800 dark:hover:text-white transition flex items-center gap-1.5 text-xs font-bold">
            <ArrowLeft className="w-4 h-4" /> بازگشت
          </button>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">ورود به سامانه</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">لطفاً نقش کاربری خود را انتخاب کنید</p>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-8">
            <button onClick={() => setAuthRole('patient')} className={`flex-1 py-2.5 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${authRole === 'patient' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
              <UserCircle className="w-4 h-4" /> پنل بیماران
            </button>
            <button onClick={() => setAuthRole('therapist')} className={`flex-1 py-2.5 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${authRole === 'therapist' ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
              <Stethoscope className="w-4 h-4" /> کلینیک و درمانگر
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">شماره موبایل یا ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="0912..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
              </div>
            </div>
            <button className={`w-full py-3.5 rounded-xl text-white text-sm font-bold shadow-lg transition mt-4 ${authRole === 'patient' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20' : 'bg-sky-600 hover:bg-sky-500 shadow-sky-900/20'}`}>
              {authRole === 'patient' ? 'ورود به پنل توانبخشی' : 'ورود به داشبورد درمانگر'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
