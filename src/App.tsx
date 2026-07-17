import React, { useState } from 'react';
import SlidePresenter from './components/SlidePresenter';
import { 
  Building2, Phone, AlertCircle, FileText, Database, ShieldAlert,
  Info, Sparkles, ChevronRight, Download, Printer, UserCheck,
  X, Copy, ExternalLink, Check
} from 'lucide-react';

export default function App() {
  const [showPresenterGuide, setShowPresenterGuide] = useState<boolean>(true);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const WAREHOUSE_REPORT_TEXT = `================================================
REKAPITULASI PROFIL OPERASIONAL WAREHOUSE ELNUSA BSD
================================================
Total Luas Lahan: 4.479 m² / 4.505 m² total area

1. FASILITAS FISIK & PEMBAGIAN BLOK:
- Blok H1-23 (2.156 m² | 28 m x 77 m):
  Store Lantai 1, Workshop Mekanik & Drilling, TPS Limbah B3 berlisensi resmi KLHK, Area Parkir Kendaraan Berat (Vibro truck).
- Blok H1-19 (810 m² | 18 m x 45 m):
  Main Gate, Office Administrasi Lantai 1, Store Geophone & Area Test SMT, Asset Storage Lantai 2 (Radio & Komputer).
- Blok H1-20 (801 m² | 18 m x 44,5 m):
  Workshop Instrumentasi, Topografi, Promex, & TMS, Geophone Repair Area, Cable Storage Area, Ruang Rapat Lantai 2, Waste Water Treatment Plant (WWTP).
- Blok H1-21 (738 m² | 18 m x 41 m):
  Workshop Cable Repair, Molding Room, Musholah Utama, Mezzanine (Under Construction).

2. STRUKTUR MANPOWER (80 Orang):
- Manager: 2 Orang (Asal: ARP)
- Warehouse Supervisor: 1 Orang (Asal: SCM)
- Staff Reguler: 16 Orang (Asal: SCM, ARP, HSSE)
- Tenaga Outsourcing: 61 Orang (Asal: SCM, ARP, MEDIC)

3. KEPATUHAN HSSE & STRUKTUR ERT:
- Fire Team (Leader: Widodo)
- Injury Evacuation Team (Leader: Rona)
- Oil Spill Team (Leader: Kustono)
- Asset Guard Team (Leader: Fadli)
- Bencana Alam Evacuation Team (Leader: Surajiman)

Hotline Darurat: Kepala Warehouse Kustono (0852-1192-0331)

================================================
Sistem Informasi Pendukung: SAP SCM & ELSASCM (Aturan: No ASN, No Entry)`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(WAREHOUSE_REPORT_TEXT);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

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
              onClick={() => setShowReportModal(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold cursor-pointer transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-elnusa-red" /> Cetak Ringkasan
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

      {/* EXECUTIVE SUMMARY REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="relative bg-white rounded-2xl max-w-2xl w-full border-t-4 border-elnusa-red shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-elnusa-red" />
                <div>
                  <h3 className="text-sm font-black text-elnusa-blue uppercase tracking-wider">Laporan Ringkasan Eksekutif</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Warehouse BSD Operational Overview</p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed font-medium">
              
              {/* Note on Sandbox Limits */}
              <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3.5 flex gap-2.5">
                <Info className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-800 space-y-1">
                  <p className="font-bold">Informasi Akses & Cetak:</p>
                  <p>
                    Karena aplikasi dijalankan di dalam <strong>Interactive Preview Sandbox (Iframe)</strong>, fitur cetak langsung dari browser (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">Ctrl+P</code> / tombol cetak bawaan) mungkin diblokir oleh kebijakan keamanan browser.
                  </p>
                  <p className="font-semibold text-amber-900">
                    Solusi: Buka aplikasi di tab baru (klik tombol di pojok kanan atas preview), lalu jalankan tombol cetak untuk mencetak atau menyimpannya sebagai PDF resmi!
                  </p>
                </div>
              </div>

              {/* Printable Summary Sheet Content */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 font-sans text-[11px] text-slate-800">
                <div className="text-center border-b border-slate-200 pb-3">
                  <h4 className="font-black text-xs text-elnusa-blue uppercase">PT ELNUSA TBK - WAREHOUSE BSD PROFILE</h4>
                  <p className="text-[9px] text-slate-400 font-mono font-bold mt-0.5">REKAPITULASI RESMI OPERASIONAL TAHUN 2025</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Spesifikasi Lahan</span>
                    <p className="font-bold text-slate-900">4.479 m² / 4.505 m² Total</p>
                    <p className="text-[10px] text-slate-500">Terbagi atas 4 blok utama fungsional.</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Kapasitas Manpower</span>
                    <p className="font-bold text-slate-900">80 Personil Aktif (POB)</p>
                    <p className="text-[10px] text-slate-500">2 Manager, 1 Spv, 16 Staff, 61 Outsourcing.</p>
                  </div>
                </div>

                <div className="space-y-1.5 border-t border-slate-200 pt-3">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Fasilitas Utama per Blok</span>
                  <div className="space-y-1 pl-2 border-l-2 border-elnusa-red">
                    <div><strong>Blok H1-23:</strong> Workshop Mekanik & Drilling, TPS Limbah B3, Parkir Vibro.</div>
                    <div><strong>Blok H1-19:</strong> Kantor Administrasi, Store Geophone, Asset Storage Lantai 2.</div>
                    <div><strong>Blok H1-20:</strong> Workshop Instrumentasi, Perbaikan Geophone, WWTP System.</div>
                    <div><strong>Blok H1-21:</strong> Workshop Cable Repair, molding, Musholah, Mezzanine.</div>
                  </div>
                </div>

                <div className="space-y-1 bg-white p-3 rounded-lg border border-slate-200/60">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Aturan Utama Gudang</span>
                  <p className="text-red-700 font-bold">"No ASN, No Entry"</p>
                  <p className="text-[10px] text-slate-500">Setiap barang masuk wajib melalui pra-upload Advanced Shipping Notice sebelum diizinkan unloading.</p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-2xl">
              <button
                onClick={handleCopyText}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Salin Ringkasan Teks
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setShowReportModal(false);
                  window.open("https://ais-pre-6ndn5vvxjzjjrmrdn52246-190020873968.asia-east1.run.app", "_blank");
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-elnusa-red hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Buka Tab Baru untuk Print
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
