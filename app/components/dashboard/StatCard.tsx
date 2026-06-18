import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBg: string;
}

export function StatCard({ title, value, icon, iconBg }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 animate-in fade-in duration-500 group">

      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-md shadow-slate-100 transition-transform duration-300 group-hover:scale-105 ${iconBg}`}>
        <div className="w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">
          {title}
        </p>
        <p className="text-2xl font-black text-slate-900 tracking-tight mt-0.5 truncate">
          {value}
        </p>
      </div>

    </div>
  );
}