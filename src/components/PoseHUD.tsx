import React, { useState } from 'react';
import { Camera, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, RefreshCw, Eye, Activity } from 'lucide-react';

interface PoseHUDProps {
  exerciseName?: string;
  targetJoint?: string;
  targetAngle?: number;
  orientation?: 'side' | 'front';
}

export const PoseHUD: React.FC<PoseHUDProps> = ({
  exerciseName = "خم کردن زانو پس از جراحی (Knee Flexion)",
  targetJoint = "زانو راست",
  targetAngle = 120,
  orientation = "side"
}) => {
  const [currentAngle, setCurrentAngle] = useState(115);
  const [currentView, setCurrentView] = useState<'side' | 'front'>(orientation);
  const [isCalibrated, setIsCalibrated] = useState(true);
  const accuracy = Math.min(100, Math.round((currentAngle / targetAngle) * 100));

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col">
      <div className="bg-slate-800/90 backdrop-blur-md px-6 py-3 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${currentView === 'side' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            <Eye className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">راهنمای استقرار در کادر دوربین:</div>
            <div className="text-sm font-bold text-white">
              {currentView === 'side' 
                ? '«لطفاً به صورت نیم‌رخ (Side-View) در فاصله ۲ متری از دوربین بایستید»'
                : '«لطفاً به صورت تمام‌رخ (Front-View) روبه‌روی دوربین قرار بگیرید»'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentView(currentView === 'side' ? 'front' : 'side')}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-slate-300 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5"/>
            تغییر نما ({currentView === 'side' ? 'نیم‌رخ' : 'تمام‌رخ'})
          </button>
          <span className="flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            پایش زنده فعال
          </span>
        </div>
      </div>
      <div className="relative w-full h-[420px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        <svg className="w-full h-full max-w-md absolute inset-0 m-auto" viewBox="0 0 400 500" fill="none">
          <line x1="200" y1="90" x2="200" y2="230" stroke="#475569" strokeWidth="3" strokeDasharray="4 2" />
          <line x1="150" y1="130" x2="250" y2="130" stroke="#64748b" strokeWidth="4" />
          <line x1="150" y1="130" x2="120" y2="200" stroke="#475569" strokeWidth="3" opacity="0.4" />
          <line x1="120" y1="200" x2="100" y2="270" stroke="#475569" strokeWidth="3" opacity="0.4" />
          <line x1="250" y1="130" x2="280" y2="200" stroke="#475569" strokeWidth="3" opacity="0.4" />
          <line x1="280" y1="200" x2="300" y2="270" stroke="#475569" strokeWidth="3" opacity="0.4" />
          <line x1="165" y1="230" x2="235" y2="230" stroke="#64748b" strokeWidth="4" />
          <line x1="165" y1="230" x2="160" y2="340" stroke="#475569" strokeWidth="3" opacity="0.3" />
          <line x1="160" y1="340" x2="155" y2="450" stroke="#475569" strokeWidth="3" opacity="0.3" />
          <line x1="235" y1="230" x2="245" y2="340" stroke="#10b981" strokeWidth="5" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <line x1="245" y1="340" x2="295" y2="420" stroke="#10b981" strokeWidth="5" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <path d="M 240 310 A 30 30 0 0 1 265 360" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="3 3" />
          <circle cx="200" cy="65" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          <circle cx="200" cy="65" r="4" fill="#38bdf8" />
          <circle cx="150" cy="130" r="5" fill="#64748b" opacity="0.5" />
          <circle cx="250" cy="130" r="5" fill="#64748b" opacity="0.5" />
          <circle cx="120" cy="200" r="4" fill="#64748b" opacity="0.4" />
          <circle cx="280" cy="200" r="4" fill="#64748b" opacity="0.4" />
          <circle cx="165" cy="230" r="5" fill="#64748b" opacity="0.5" />
          <circle cx="235" cy="230" r="6" fill="#10b981" />
          <circle cx="245" cy="340" r="10" fill="#0f172a" stroke="#10b981" strokeWidth="4" className="animate-pulse" />
          <circle cx="245" cy="340" r="4" fill="#34d399" />
          <circle cx="295" cy="420" r="6" fill="#10b981" />
          <circle cx="315" cy="430" r="4" fill="#64748b" opacity="0.5" />
        </svg>
        <div className="absolute top-6 left-6 bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 shadow-xl backdrop-blur-md">
          <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400"/>
            زاویه مفصل هدف ({targetJoint}):
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">{currentAngle}°</span>
            <span className="text-xs text-slate-400">/ هدف: {targetAngle}°</span>
          </div>
          <div className="w-36 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${accuracy}%` }}></div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3.5 backdrop-blur-md flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-xs text-slate-400">وضعیت اجرای بیومکانیک:</div>
            <div className="text-sm font-bold text-slate-200">راستای استخوان ران و ساق استاندارد است</div>
          </div>
        </div>
      </div>
    </div>
  );
};
