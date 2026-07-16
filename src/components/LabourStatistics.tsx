import React, { useState } from 'react';
import { LABOUR_DATA } from '../data/slidesData';
import { Users, Briefcase, HelpCircle, Activity, UserPlus, Info } from 'lucide-react';

export default function LabourStatistics() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const totalLabour = 80;

  // Pie chart calculations (for SVG circle)
  // Outsourcing: 61 (76.25%), Staff: 16 (20%), Manager: 2 (2.5%), Supervisor: 1 (1.25%)
  const segments = [
    { label: 'Outsourcing', count: 61, pct: 76.25, color: '#0054A6', origin: 'SCM, ARP, MEDIC' },
    { label: 'Staff', count: 16, pct: 20.0, color: '#0f172a', origin: 'SCM, ARP, HSSE' },
    { label: 'Manager', count: 2, pct: 2.5, color: '#ED1C24', origin: 'ARP' },
    { label: 'Warehouse Supervisor', count: 1, pct: 1.25, color: '#64748B', origin: 'SCM' }
  ];

  let cumulativeAngle = 0;

  return (
    <div id="labour-statistics-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in">
      {/* Visual Chart Panel */}
      <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-elnusa-blue tracking-wider uppercase border-l-3 border-elnusa-red pl-2.5 mb-2">PENGELOLAAN SDM WAREHOUSE BSD</h4>
          <h3 className="text-xl font-black text-slate-800 mb-2">Distribusi Tenaga Kerja Terintegrasi (80 Orang)</h3>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed font-medium">
            Tenaga kerja di Warehouse BSD dikelola lintas fungsi untuk menjamin kelancaran SCM, ARP, HSSE, dan Medic. Sinergi antara tim reguler Elnusa dan tenaga outsourcing profesional.
          </p>
        </div>

        {/* SVG Custom Donut/Pie Chart */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="relative w-44 h-44 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Cumulative angles to draw pie segments */}
              {segments.map((seg, idx) => {
                // Formula for drawing arc
                const strokeDash = `${seg.pct} ${100 - seg.pct}`;
                // Cumulative stroke dash offset
                const strokeOffset = 100 - cumulativeAngle;
                cumulativeAngle += seg.pct;

                const isHovered = hoveredIdx === idx;

                return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth={isHovered ? "16" : "12"}
                    strokeDasharray={strokeDash}
                    strokeDashoffset={strokeOffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />
                );
              })}
              {/* Inner hole for donut */}
              <circle cx="50" cy="50" r="28" fill="white" />
            </svg>
            
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-950 font-mono">80</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total POB</span>
            </div>
          </div>

          {/* Interactive Legends */}
          <div className="flex-1 space-y-3 w-full">
            {segments.map((seg, idx) => {
              const isSelected = hoveredIdx === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSelected ? 'bg-white border-slate-200 shadow-xs scale-[1.01]' : 'bg-transparent border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 leading-none">{seg.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-semibold">Asal: {seg.origin}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-slate-900 font-mono">{seg.count} orang</div>
                    <div className="text-[9px] text-slate-400 font-bold">{seg.pct.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Structured Details Grid (Management & SCM background) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Table representation */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">REKAPITULASI RESMI</span>
              <span className="text-xs font-mono font-bold bg-elnusa-blue text-white px-2 py-1 rounded border border-elnusa-blue shadow-xs">
                LABOUR 2025
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold">
                    <th className="py-2 font-bold">Posisi Pekerjaan</th>
                    <th className="py-2 text-center font-bold">Jumlah</th>
                    <th className="py-2 text-right font-bold">Asal Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LABOUR_DATA.map((row) => (
                    <tr key={row.no} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold text-slate-800">{row.position}</td>
                      <td className="py-2.5 text-center font-black text-slate-900 font-mono">{row.count}</td>
                      <td className="py-2.5 text-right font-mono text-slate-500 font-semibold">{row.origin}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-200 bg-slate-50 font-black">
                    <td className="py-2.5 pl-2 text-slate-900">Total Tenaga Kerja</td>
                    <td className="py-2.5 text-center text-slate-900 font-mono">80</td>
                    <td className="py-2.5 pr-2 text-right text-slate-400 text-[10px] uppercase font-black tracking-wider">
                      POB Terintegrasi
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-3.5 mt-4 flex gap-2.5">
            <Info className="w-4 h-4 text-elnusa-blue flex-shrink-0 mt-0.5" />
            <div className="text-[11px] text-blue-800 leading-normal font-medium">
              <span className="font-bold text-elnusa-blue">Distribusi Fungsi:</span> Pengelolaan logistik inti ditangani oleh <strong>SCM (Supply Chain Management)</strong>. Mobilisasi peralatan survei seismik dikoordinir oleh fungsi <strong>ARP (Asset & Resource Management)</strong>. Standar kerja diawasi oleh fungsi <strong>HSSE & Medic</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
