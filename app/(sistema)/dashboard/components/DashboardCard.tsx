import { DashboardStats } from "@/app/types/dashboard/dashboard";

interface DashboardCardProps {
    stat: DashboardStats;
}

export default function DashboardCard({ stat }: DashboardCardProps) {
    const isUp = stat.trend === 'up';
    const isDown = stat.trend === 'down';

    return (
        <div className="relative overflow-hidden bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5 group hover:border-emerald-200 transition-all duration-300">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

            <div className="flex items-center justify-between relative z-10">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.title}</span>
                <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl text-2xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    {stat.icon}
                </div>
            </div>

            <div className="mt-6 relative z-10">
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className={`flex items-center justify-center w-5 h-5 rounded-full ${
                        isUp ? 'bg-emerald-100 text-emerald-600' : 
                        isDown ? 'bg-rose-100 text-rose-600' : 
                        'bg-slate-100 text-slate-600'
                    }`}>
                        {isUp && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.5-5.5a.75.75 0 011.08 0l5.5 5.5a.75.75 0 11-1.08 1.04l-3.96-3.908V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                            </svg>
                        )}
                        {isDown && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-3.908a.75.75 0 111.08 1.04l-5.5 5.5a.75.75 0 01-1.08 0l-5.5-5.5a.75.75 0 111.08-1.04l3.96 3.908V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                            </svg>
                        )}
                        {!isUp && !isDown && (
                             <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        )}
                    </span>
                    <p className={`text-sm font-bold ${
                        isUp ? 'text-emerald-600' : 
                        isDown ? 'text-rose-600' : 
                        'text-slate-600'
                    }`}>
                        {stat.change}
                    </p>
                    <span className="text-xs text-slate-400 font-medium italic">vs. ant.</span>
                </div>
            </div>
        </div>
    );
}
