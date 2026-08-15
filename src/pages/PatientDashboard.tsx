import React, { useState } from 'react';
import { PoseHUD } from '../components/PoseHUD';
import { RehabilitationCalendar } from '../components/Calendar';
import { MessageCircle, Play, AlertTriangle } from 'lucide-react';

const mockExercises = [
  { id: 1, title: 'خم کردن زانو نشسته', sets: '۳ ست ۱۵ تایی', thumb: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80', mistake: 'بلند کردن لگن' },
  { id: 2, title: 'بالا کشیدن مستقیم پا', sets: '۳ ست ۱۰ تایی', thumb: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80', mistake: 'خم شدن زانو' }
];

export const PatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'calendar' | 'videos'>('today');
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-wrap justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=160&q=80" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40" alt="Therapist"/>
            <div>
              <h2 className="text-lg font-bold text-white">دکتر علیرضا رستمی <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">درمانگر معالج</span></h2>
              <p className="text-xs text-slate-400 mt-1">کد نظام پزشکی: ف-۴۸۲۹۱ | فوق‌تخصص توانبخشی</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2"><MessageCircle className="w-4 h-4 text-emerald-400"/> ارسال پیام</button>
            <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold">ویزیت تصویری</button>
          </div>
        </div>

        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          <button onClick={() => setActiveTab('today')} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${activeTab === 'today' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>پایش امروز</button>
          <button onClick={() => setActiveTab('calendar')} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${activeTab === 'calendar' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>تقویم بهبودی</button>
          <button onClick={() => setActiveTab('videos')} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${activeTab === 'videos' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>کتابخانه ویدیوها</button>
        </div>

        {activeTab === 'today' && <PoseHUD/>}
        {activeTab === 'calendar' && <RehabilitationCalendar/>}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockExercises.map((ex) => (
              <div key={ex.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg">
                <div className="relative h-44 bg-slate-800"><img src={ex.thumb} className="w-full h-full object-cover"/><div className="absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center"><Play className="w-5 h-5 ml-1"/></div></div></div>
                <div className="p-5">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">{ex.title}</h4>
                  <span className="inline-block text-xs bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md font-semibold mb-4">تعداد: {ex.sets}</span>
                  <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300 flex gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500"/><div><strong className="block font-bold">خطای رایج:</strong>{ex.mistake}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
