import React, { useState } from 'react';
import SlidePresenter from './components/SlidePresenter';
import { 
  Building2, Phone, AlertCircle, FileText, Database, ShieldAlert,
  Info, Sparkles, ChevronRight, Download, Printer, UserCheck
} from 'lucide-react';

export default function App() {
  const [showPresenterGuide, setShowPresenterGuide] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-elnusa-light text-slate-900 font-sans antialiased selection:bg-elnusa-red selection:text-white">
      {/* Corporate Header Nav */}
      <header className="sticky top-0 z-40 w-full bg-white border-b-3 border-elnusa-blue shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Styled Logo Emblem representation */}
            <div className="flex items-center gap-1 bg-gradient-to-br from-elnusa-blue to-blue-900 p-2.5 rounded-lg shadow-sm text-white font-black text-sm tracking-tighter">
              <span>E</span>
              <span className="text-elnusa-red">W</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-elnusa-blue">
                  WAREHOUSE ELNUSA <span className="text-elnusa-red">BSD</span>
                </h1>
                <span className="bg-slate-100 text-slate-600 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-200 font-bold">
                  v2.0.25
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">A Member of Subholding Upstream Pertamina</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-700 font-bold bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operasional Gudang Aktif
            </span>
            <button
              id="btn-print-outline"
              onClick={() => window.print()}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Ringkasan
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* PRESENTATION MODE NOTICE BOARD FOR "PAK DODO" / MANAGEMENT */}
        {showPresenterGuide && (
          <div className="bg-white rounded-xl border-l-4 border-elnusa-red p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in border border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-elnusa-blue">
                <Sparkles className="w-4.5 h-4.5 text-elnusa-red" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Panduan Presentasi Interaktif</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                Aplikasi profil ini dirancang khusus untuk keperluan presentasi di depan <strong>Atasan (Pak Dodo)</strong>, manajemen internal, maupun pihak eksternal. Gunakan mode <strong>Presentasi</strong> untuk melihat slide per slide, atau klik <strong>Ruang Simulasi</strong> untuk menjalankan demonstrasi alur inventory (seperti sistem pencegahan <strong>"No ASN No Entry"</strong>) secara live!
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                id="btn-close-guide"
                onClick={() => setShowPresenterGuide(false)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer transition-colors border border-slate-200"
              >
                Pahami & Sembunyikan
              </button>
            </div>
          </div>
        )}

        {/* Central Presentation Core Frame */}
        <section id="presentation-frame-section">
          <SlidePresenter />
        </section>

        {/* Quick Informational Cards Panel */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* SCM Information Card */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-elnusa-blue flex items-center justify-center mb-4 border border-blue-100">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-elnusa-blue border-l-4 border-elnusa-red pl-3 mb-3">Mekanisme SAP & SCM</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Seluruh aktivitas penerbitan PR material, Goods Receipt (GR), Racking, dan Goods Issue (GI) tercatat secara terpadu di sistem SAP SCM Elnusa. Hal ini meminimalisir deviasi ketersediaan material di lapangan.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-500">Sistem Terintegrasi</span>
              <span className="font-mono text-elnusa-blue font-bold uppercase bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">ELSASCM / SAP</span>
            </div>
          </div>

          {/* HSSE Policy Card */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-elnusa-blue border-l-4 border-elnusa-red pl-3 mb-3">Kepatuhan Hukum & HSE</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Warehouse BSD menerapkan pengolahan air limbah domestik & industri bersertifikat (WWTP System) di Blok H1-20 dan Temporary Storage B3 Waste fungsional di Blok H1-23 untuk menjamin nihil pencemaran lingkungan.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-500">Nihil Kecelakaan Kerja</span>
              <span className="font-mono text-emerald-600 font-bold uppercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Zero Accident</span>
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-red-50 text-elnusa-red flex items-center justify-center mb-4 border border-red-100">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-elnusa-blue border-l-4 border-elnusa-red pl-3 mb-3">Tim Kedaruratan (ERT)</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Dilengkapi dengan 5 tim tanggap darurat fungsional (Pemadam Kebakaran, Evakuasi, Penanganan Tumpahan Minyak, Penyelamatan Aset, Bencana Alam) yang standby 24 jam dengan kontak hotline terpusat.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-500">Hotline Darurat</span>
              <span className="font-mono text-elnusa-red font-bold uppercase bg-red-50 px-1.5 py-0.5 rounded border border-red-100">Active Standby</span>
            </div>
          </div>
        </section>

      </main>

      {/* Corporate footer info */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-white text-xs font-black tracking-wider font-mono">PT ELNUSA TBK</span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] font-medium text-slate-500">A Member of Subholding Upstream Pertamina</span>
          </div>
          <p className="text-[10px] text-slate-500">
            © 2026 PT Elnusa Tbk. Seluruh hak cipta dilindungi undang-undang. Dokumen profile & presentasi interaktif internal fungsional Warehouse BSD Serpong.
          </p>
        </div>
      </footer>
    </div>
  );
}
