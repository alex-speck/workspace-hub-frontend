"use client";
import { useState } from "react";
import { FaturamentoDados, FaturamentoResumo } from "../../types/dashboard/dashboard";


type Tab = "diario" | "semanal" | "mensal";

const TABS: { key: Tab; label: string }[] = [
  { key: "diario", label: "Diário" },
  { key: "semanal", label: "Semanal" },
  { key: "mensal", label: "Mensal" },
];

interface Props {
  faturamento: FaturamentoResumo;
}

export function FaturamentoChart({ faturamento }: Props) {
  const [tab, setTab] = useState<Tab>("diario");

  const dados: FaturamentoDados[] = faturamento[tab];
  const max = Math.max(...dados.map((d) => d.valor), 1);

  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-200/40 animate-in fade-in duration-500">

      {/* CABEÇALHO DO CARD */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Faturamento
          </h2>
          <p className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
            Visão Geral
          </p>
        </div>

        {/* BOTÕES DE ALTERNÂNCIA (TABS) - Estilo Pílula Premium */}
        <div className="flex bg-slate-50 p-1 rounded-full border border-slate-100 self-start sm:self-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold cursor-pointer tracking-tight transition-all duration-300 ${tab === t.key
                  ? "bg-white text-emerald-600 shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-2 px-2" style={{ height: 100 }}>
        {dados.map((d, i) => {
          const isLast = i === dados.length - 1;
          return (
            <div key={i} className="group relative flex flex-1 flex-col items-center justify-end h-full">

              <div className="absolute bottom-full mb-2.5 hidden group-hover:flex flex-col items-center pointer-events-none z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl shadow-xl whitespace-nowrap tracking-wide">
                  R$ {d.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1"></div>
              </div>

              <div
                className={`w-full rounded-t-xl transition-all duration-300 cursor-pointer ${isLast
                    ? "bg-emerald-500 shadow-lg shadow-emerald-500/20 group-hover:bg-emerald-600"
                    : "bg-slate-100 group-hover:bg-emerald-200/70"
                  }`}
                style={{ height: Math.max((d.valor / max) * 100, 6) }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2 px-2 border-t border-slate-50 pt-2.5">
        {dados.map((d, i) => {
          const isLast = i === dados.length - 1;
          return (
            <p
              key={i}
              className={`flex-1 truncate text-center text-[10px] font-bold tracking-wider uppercase transition-colors ${isLast ? 'text-emerald-600 font-black' : 'text-slate-400'
                }`}
            >
              {d.periodo}
            </p>
          );
        })}
      </div>
    </div>
  );
}