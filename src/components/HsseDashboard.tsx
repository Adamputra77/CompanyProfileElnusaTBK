import React, { useState } from 'react';
import { COMPLIANCE_DATA, EMERGENCY_TEAMS, HOTLINES } from '../data/slidesData';
import { Shield, Heart, Activity, AlertOctagon, Phone, User, Users, CheckCircle2 } from 'lucide-react';

type HsseTab = 'COMPLIANCE' | 'HAZARDS' | 'ERT' | 'HOTLINES';

export default function HsseDashboard() {
  const [activeTab, setActiveTab] = useState<HsseTab>('COMPLIANCE');
  const [selectedErt, setSelectedErt] = useState<string>('Fire Team');

  // Icons for hazards
  const hazards = [
    { title: 'Danger Falling Objects', desc: 'Resiko kejatuhan barang dari rak vertikal tinggi selama operasional MHE/Crane.', icon: '🏗️', category: 'Safety' },
    { title: 'Pinch Point Hazard', desc: 'Titik jepit mekanis pada area perbaikan/bengkel mesin Blok H1-23.', icon: '🖐️', category: 'Mechanical' },
    { title: 'Slips & Falls Hazard', desc: 'Lantai licin di area pembersihan WWTP atau koridor workshop.', icon: '🥾', category: 'Physical' },
    { title: 'Fire Hazard', desc: 'Resiko kebakaran akibat penyimpanan baterai lithium, bahan bakar, atau arus pendek.', icon: '🔥', category: 'Safety' },
    { title: 'Forklift & MHE Operation', desc: 'Resiko tertabrak atau terjepit di gang-gang sempit area perlintasan forklift.', icon: '🚜', category: 'Operational' },
    { title: 'Chemical Exposure', desc: 'Paparan uap asam dari baterai aki, oli, atau residu limbah B3 di TPS.', icon: '🧪', category: 'Chemical' },
    { title: 'Stumbling blocks', desc: 'Resiko tersandung kabel seismik yang berserakan di area test.', icon: '🎛️', category: 'Physical' }
  ];

  return (
    <div id="hsse-dashboard-root" className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
      {/* Tab Selectors */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4 mb-6">
        <button
          id="btn-hsse-tab-compliance"
          onClick={() => setActiveTab('COMPLIANCE')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'COMPLIANCE' 
              ? 'bg-elnusa-blue text-white shadow-sm' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Legal Compliance 2025
        </button>
        <button
          id="btn-hsse-tab-hazards"
          onClick={() => setActiveTab('HAZARDS')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'HAZARDS' 
              ? 'bg-elnusa-blue text-white shadow-sm' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Hazard Identifikasi (Bahaya)
        </button>
        <button
          id="btn-hsse-tab-ert"
          onClick={() => setActiveTab('ERT')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'ERT' 
              ? 'bg-elnusa-blue text-white shadow-sm' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Emergency Response Team (ERT)
        </button>
        <button
          id="btn-hsse-tab-hotlines"
          onClick={() => setActiveTab('HOTLINES')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'HOTLINES' 
              ? 'bg-elnusa-blue text-white shadow-sm' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Nomor Telepon Darurat
        </button>
      </div>

      {/* COMPLIANCE VIEW */}
      {activeTab === 'COMPLIANCE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPLIANCE_DATA.map((item, index) => {
              const theme = 
                item.category === 'HEALTH' ? { bg: 'bg-emerald-50/70 border-emerald-100', text: 'text-emerald-800', icon: Heart, iconColor: 'text-emerald-500' } :
                item.category === 'SAFETY' ? { bg: 'bg-amber-50/70 border-amber-100', text: 'text-amber-800', icon: Shield, iconColor: 'text-amber-500' } :
                { bg: 'bg-blue-50/70 border-blue-100', text: 'text-blue-800', icon: Activity, iconColor: 'text-blue-500' };

              const IconComp = theme.icon;

              return (
                <div key={index} className={`rounded-xl border p-5 flex flex-col gap-4 ${theme.bg}`}>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-xs">
                      <IconComp className={`w-5 h-5 ${theme.iconColor}`} />
                    </div>
                    <h4 className="text-xs font-black text-slate-900 tracking-wider uppercase leading-tight">{item.title}</h4>
                  </div>

                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      {item.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex gap-2 text-xs text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3 text-xs text-slate-500 leading-relaxed">
            <Shield className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <span>
              <strong>Note Kepatuhan Hukum:</strong> Seluruh kepatuhan dan audit diuji secara berkala oleh Divisi HSSE Korporasi Elnusa mengacu pada regulasi pertambangan & energi migas, serta diaudit oleh badan independen internasional untuk sertifikasi kelayakan ISO.
            </span>
          </div>
        </div>
      )}

      {/* HAZARD VIEW */}
      {activeTab === 'HAZARDS' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hazards.map((hz, idx) => (
              <div key={idx} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl p-4 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{hz.icon}</span>
                  <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase font-mono px-2 py-0.5 rounded-full bg-white border border-slate-200/60">
                    {hz.category}
                  </span>
                </div>
                <h5 className="text-xs font-black text-slate-800 leading-tight mb-1.5">{hz.title}</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">{hz.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-xs text-amber-900 leading-relaxed">
            <AlertOctagon className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <strong>Mitigasi HSSE:</strong> Seluruh area wajib dipasangi Rambu K3, seluruh pekerja harus menggunakan APD standar (Kacamata, Sepatu Safety, Rompi, Helm), dan Toolbox Meeting harian wajib dilakukan sebelum shift dimulai.
            </div>
          </div>
        </div>
      )}

      {/* ERT VIEW */}
      {activeTab === 'ERT' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Squad Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pilih Tim Kesiapsiagaan</h5>
            {EMERGENCY_TEAMS.map((team) => (
              <button
                key={team.name}
                id={`btn-ert-${team.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedErt(team.name)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  selectedErt === team.name 
                    ? 'bg-elnusa-blue border-elnusa-blue text-white shadow-md' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700'
                }`}
              >
                <div className="font-bold text-xs">{team.name}</div>
                <div className="text-[10px] opacity-80 mt-0.5">Leader: {team.leader}</div>
              </button>
            ))}
          </div>

          {/* Squad Detail */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col justify-between">
            {(() => {
              const team = EMERGENCY_TEAMS.find(t => t.name === selectedErt)!;
              return (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-red-50 text-elnusa-red border border-red-200/50 font-bold px-2.5 py-1 rounded font-mono uppercase">
                        Gugus Tugas Kedaruratan
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">Periode 2025</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mt-2">{team.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{team.description}</p>
                  </div>

                  {/* Leader Card */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-elnusa-red flex items-center justify-center font-bold border border-red-100">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">KETUA TIM / PIC</div>
                      <div className="text-sm font-black text-slate-900 mt-1">{team.leader}</div>
                    </div>
                  </div>

                  {/* Members */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" /> Anggota Tim Pendukung:
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {team.members.map((mem, mIdx) => (
                        <div key={mIdx} className="bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-700 font-medium text-center">
                          {mem}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* HOTLINES VIEW */}
      {activeTab === 'HOTLINES' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {HOTLINES.map((hotline, idx) => (
              <a
                key={idx}
                href={`tel:${hotline.number}`}
                className="bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-100 p-4 rounded-xl flex items-center justify-between gap-3 group transition-all duration-200"
              >
                <div className="text-left">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-red-500">{hotline.label}</div>
                  <div className="text-sm font-mono font-black text-slate-800 group-hover:text-red-950 mt-1">{hotline.number}</div>
                </div>
                <div className="bg-white group-hover:bg-red-500 group-hover:text-white p-2 rounded-lg text-slate-400 shadow-xs transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-xs text-blue-900 leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <span>
              <strong>Pemberitahuan:</strong> Nomor-nomor di atas dipajang di papan mading utama setiap blok dan wajib tersimpan di ponsel pribadi seluruh personil POB di BSD.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
