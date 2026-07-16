import React, { useState } from 'react';
import { BLOCKS_DATA } from '../data/slidesData';
import { BlockFacility } from '../types';
import { Square, Layers, Shield, Wrench, FlameKindling, Info, ArrowUpRight } from 'lucide-react';

export default function InteractiveMap() {
  const [selectedBlockId, setSelectedBlockId] = useState<string>('H1-23');

  const selectedBlock = BLOCKS_DATA.find((b) => b.id === selectedBlockId) || BLOCKS_DATA[0];

  // Helper to get color theme based on block ID
  const getBlockStyles = (id: string, isSelected: boolean) => {
    switch (id) {
      case 'H1-23':
        return {
          bg: isSelected ? 'bg-elnusa-blue text-white shadow-lg border-elnusa-blue scale-102' : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200',
          accent: 'border-elnusa-red',
          iconColor: 'text-elnusa-blue'
        };
      case 'H1-19':
        return {
          bg: isSelected ? 'bg-slate-900 text-white shadow-lg border-slate-900 scale-102' : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-200',
          accent: 'border-elnusa-red',
          iconColor: 'text-slate-800'
        };
      case 'H1-20':
        return {
          bg: isSelected ? 'bg-elnusa-blue text-white shadow-lg border-elnusa-blue scale-102' : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200',
          accent: 'border-elnusa-red',
          iconColor: 'text-elnusa-blue'
        };
      case 'H1-21':
        return {
          bg: isSelected ? 'bg-slate-800 text-white shadow-lg border-slate-800 scale-102' : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200',
          accent: 'border-elnusa-red',
          iconColor: 'text-slate-800'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          accent: 'border-slate-500',
          iconColor: 'text-slate-500'
        };
    }
  };

  return (
    <div id="interactive-map-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Visual Block Map */}
      <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-elnusa-blue tracking-wider uppercase border-l-3 border-elnusa-red pl-2.5">Visual Site Plan Layout (Interactive)</h4>
            <span className="text-xs bg-red-50 text-elnusa-red px-2.5 py-1 rounded-full font-bold">Klik Blok untuk Detail</span>
          </div>
          <p className="text-xs text-slate-500 mb-6 font-medium">
            Representasi posisi relatif dan luasan 4 blok utama di Warehouse Elnusa BSD (Total Luas Lahan: 4.479 m² atau 4.505 m² total area).
          </p>
        </div>

        {/* Scaled Visual Grid mimicking the real layout */}
        <div className="relative bg-slate-50 rounded-xl p-4 min-h-[300px] flex flex-col justify-center gap-4">
          <div className="grid grid-cols-12 gap-3 h-full">
            {/* Blok H1-23 (Paling besar: 2.156 m2) */}
            <button
              id="btn-block-h1-23"
              onClick={() => setSelectedBlockId('H1-23')}
              className={`col-span-12 md:col-span-6 border-2 transition-all duration-300 rounded-xl p-4 text-left flex flex-col justify-between cursor-pointer min-h-[140px] ${
                getBlockStyles('H1-23', selectedBlockId === 'H1-23').bg
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold tracking-tight text-lg">Blok H1-23</span>
                  <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded uppercase border border-current">
                    Area Drilling & B3
                  </span>
                </div>
                <p className="text-xs mt-1 opacity-90">Store Lt. 1 & Workshop Mekanik</p>
              </div>
              <div className="flex items-baseline justify-between mt-4">
                <span className="text-xs opacity-80">28m x 77m</span>
                <span className="text-xl font-black">2.156 m²</span>
              </div>
            </button>

            {/* Right Group: H1-21, H1-20, H1-19 */}
            <div className="col-span-12 md:col-span-6 grid grid-cols-1 gap-3">
              {/* Blok H1-19 (810 m2) */}
              <button
                id="btn-block-h1-19"
                onClick={() => setSelectedBlockId('H1-19')}
                className={`border-2 transition-all duration-300 rounded-xl p-3 text-left flex items-center justify-between cursor-pointer ${
                  getBlockStyles('H1-19', selectedBlockId === 'H1-19').bg
                }`}
              >
                <div>
                  <div className="font-bold text-sm">Blok H1-19</div>
                  <div className="text-[10px] opacity-85">Main Office & Geophone Store</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">810 m²</div>
                  <div className="text-[10px] opacity-75">18m x 45m</div>
                </div>
              </button>

              {/* Blok H1-20 (801 m2) */}
              <button
                id="btn-block-h1-20"
                onClick={() => setSelectedBlockId('H1-20')}
                className={`border-2 transition-all duration-300 rounded-xl p-3 text-left flex items-center justify-between cursor-pointer ${
                  getBlockStyles('H1-20', selectedBlockId === 'H1-20').bg
                }`}
              >
                <div>
                  <div className="font-bold text-sm">Blok H1-20</div>
                  <div className="text-[10px] opacity-85">Workshops, IPAL & WWTP</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">801 m²</div>
                  <div className="text-[10px] opacity-75">18m x 44.5m</div>
                </div>
              </button>

              {/* Blok H1-21 (738 m2) */}
              <button
                id="btn-block-h1-21"
                onClick={() => setSelectedBlockId('H1-21')}
                className={`border-2 transition-all duration-300 rounded-xl p-3 text-left flex items-center justify-between cursor-pointer ${
                  getBlockStyles('H1-21', selectedBlockId === 'H1-21').bg
                }`}
              >
                <div>
                  <div className="font-bold text-sm">Blok H1-21</div>
                  <div className="text-[10px] opacity-85">Cable Repair & Musholah</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">738 m²</div>
                  <div className="text-[10px] opacity-75">18m x 41m</div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-200/60 pt-3">
            <span className="flex items-center gap-1">
              <Square className="w-3 h-3 fill-slate-300 stroke-none" /> Area Jalan Utama / Mobilisasi
            </span>
            <span className="font-semibold text-slate-500">Jl. Tekno Widya, BSD Blok H1</span>
          </div>
        </div>
      </div>

      {/* Block Information Card */}
      <div className="lg:col-span-5 flex flex-col">
        <div className={`flex-1 rounded-xl border-l-4 p-6 bg-white border border-slate-200 shadow-sm transition-all duration-300 ${getBlockStyles(selectedBlock.id, true).accent}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">DETAIL FASILITAS</span>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{selectedBlock.name}</h3>
            </div>
            <div className="bg-slate-50 text-slate-700 px-3 py-1 rounded-lg text-right border border-slate-200">
              <div className="text-sm font-black">{selectedBlock.size}</div>
              <div className="text-[10px] text-slate-400 font-mono font-bold">{selectedBlock.dimensions}</div>
            </div>
          </div>

          {selectedBlock.surfaceArea && (
            <div className="mb-4 bg-slate-50 rounded-lg p-2.5 flex items-center gap-2 border border-slate-200">
              <Layers className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span className="text-xs text-slate-600 font-medium">{selectedBlock.surfaceArea}</span>
            </div>
          )}

          {/* Facilities List */}
          <div className="mb-5">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fasilitas Utama:</h5>
            <div className="grid grid-cols-1 gap-1.5">
              {selectedBlock.facilities.map((fac, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 flex-shrink-0" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details & Specs */}
          <div>
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Deskripsi & Peruntukan:</h5>
            <div className="space-y-3">
              {selectedBlock.details.map((det, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-slate-600 bg-slate-50/50 p-2.5 rounded-lg border border-slate-200/40">
                  <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>{det}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental specific widget if Block H1-20 or H1-23 */}
          {selectedBlock.id === 'H1-23' && (
            <div className="mt-5 bg-amber-50/60 border border-amber-200/50 rounded-xl p-3 flex items-start gap-2.5 animate-fade-in">
              <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-800">
                <span className="font-bold">Limbah B3 Temporary Storage:</span> Berlisensi resmi Kementerian LHK untuk pemisahan, pengemasan, dan penampungan residu pengeboran & mekanik sebelum disposisi akhir.
              </div>
            </div>
          )}

          {selectedBlock.id === 'H1-20' && (
            <div className="mt-5 bg-blue-50/60 border border-blue-200/50 rounded-xl p-3 flex items-start gap-2.5 animate-fade-in">
              <Wrench className="w-4 h-4 text-elnusa-blue mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <span className="font-bold">Pusat Maintenance & Repair:</span> Area terintegrasi untuk restorasi Geophone aktif dan pengujian kebocoran kabel seismik (Leakage Test) berstandar ISO.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
