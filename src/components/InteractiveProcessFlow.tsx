import React, { useState } from 'react';
import { PROCESS_STEPS, PRINSIP_PENERIMAAN, PROJECT_DELIVERY_STEPS } from '../data/slidesData';
import { 
  FileText, CheckCircle, Package, ArrowRight, Play, Check, 
  AlertTriangle, RefreshCw, Layers, ShieldCheck, Database, ShoppingBag, Truck 
} from 'lucide-react';

type ProcessTab = 'GENERAL' | 'RECEIVING' | 'ISSUING' | 'PROJECT_SITE';

export default function InteractiveProcessFlow() {
  const [activeTab, setActiveTab] = useState<ProcessTab>('GENERAL');
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [showAsnError, setShowAsnError] = useState<boolean>(false);

  const startSimulation = (type: string) => {
    setSimulationStep(1);
    setShowAsnError(false);
    if (type === 'RECEIVING') {
      setSimulationLogs(['[09:00] Vendor mengajukan logistik pengiriman...', '[09:05] Sistem SAP memeriksa ketersediaan Nomor ASN...']);
    } else if (type === 'ISSUING') {
      setSimulationLogs(['[10:00] User menginput MIV di sistem SAP/ELSASCM...', '[10:10] Planner menyetujui reservasi stock...']);
    } else {
      setSimulationLogs(['[11:00] Site Manager mengajukan Field Requisition...']);
    }
  };

  const advanceSimulation = (type: string) => {
    if (type === 'RECEIVING') {
      if (simulationStep === 1) {
        setSimulationStep(2);
        setSimulationLogs(prev => [...prev, '[09:15] Truk vendor tiba di Main Gate. Pemeriksaan Dokumen PO vs Surat Jalan dilakukan.', '[09:20] Hasil pengecekan: COCOK. Melakukan bongkar muat di Unloading Dock.']);
      } else if (simulationStep === 2) {
        setSimulationStep(3);
        setSimulationLogs(prev => [...prev, '[09:30] Tim Inventory melakukan scanning fisik barcode & uji kualitas.', '[09:35] Input Goods Receipt (GR) di ELSASCM berhasil dibuat.']);
      } else if (simulationStep === 3) {
        setSimulationStep(4);
        setSimulationLogs(prev => [...prev, '[09:45] Barang disusun menggunakan Forklift ke Blok H1-19 Rak G-04.', '[09:50] Barcode Bin-location di-update di sistem. Alur selesai!']);
      }
    } else if (type === 'ISSUING') {
      if (simulationStep === 1) {
        setSimulationStep(2);
        setSimulationLogs(prev => [...prev, '[10:20] Tim Inventory menerima cetakan MIV & Delivery Order (DO).', '[10:25] Picker mengambil material Geophone di Blok H1-19 Lantai 1.']);
      } else if (simulationStep === 2) {
        setSimulationStep(3);
        setSimulationLogs(prev => [...prev, '[10:35] Verifikasi fisik barang dan pengetesan alat selesai.', '[10:40] Admin memposting Goods Issue (GI) di SAP (Stock terpotong).']);
      } else if (simulationStep === 3) {
        setSimulationStep(4);
        setSimulationLogs(prev => [...prev, '[10:55] Material diserahkan kepada User dan ditandatangani.', '[11:00] Material dilepas untuk mobilisasi ke site proyek. Alur selesai!']);
      }
    } else if (type === 'PROJECT_SITE') {
      if (simulationStep === 1) {
        setSimulationStep(2);
        setSimulationLogs(prev => [...prev, '[11:15] Planner melakukan reservasi material di Sloc Proyek.', '[11:20] Tim inventory melakukan Stock Transfer ke Sloc Proyek via ELSASCM.']);
      } else if (simulationStep === 2) {
        setSimulationStep(3);
        setSimulationLogs(prev => [...prev, '[11:35] Ekspedisi logistik mengantarkan material ke site proyek.', '[11:40] Material Man site melakukan Goods Receipt & menyimpan di Sloc Site.']);
      } else if (simulationStep === 3) {
        setSimulationStep(4);
        setSimulationLogs(prev => [...prev, '[11:50] Material dikeluarkan sesuai progres pengerjaan di lapangan.', '[12:00] Site mengirimkan Laporan Pemakaian Mingguan ke Head Office. Selesai!']);
      }
    }
  };

  const resetSimulation = () => {
    setSimulationStep(0);
    setSimulationLogs([]);
    setShowAsnError(false);
  };

  const triggerAsnErrorDemo = () => {
    setShowAsnError(true);
    setSimulationStep(1);
    setSimulationLogs(['[09:00] Vendor mengirimkan armada logistik tanpa melakukan pre-upload ASN...', '[09:05] SYSTEM BLOCK: "No ASN No Entry!" - Masuk dibatalkan di gerbang utama.', '[09:10] Peringatan dikirimkan ke vendor untuk menyelesaikan upload data.']);
  };

  return (
    <div id="interactive-process-flow-root" className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
      {/* Category Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4 mb-6">
        <button
          id="tab-proc-general"
          onClick={() => { setActiveTab('GENERAL'); resetSimulation(); }}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'GENERAL' 
              ? 'bg-elnusa-blue text-white shadow-sm' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Mekanisme Warehouse (SAP)
        </button>
        <button
          id="tab-proc-receiving"
          onClick={() => { setActiveTab('RECEIVING'); resetSimulation(); }}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'RECEIVING' 
              ? 'bg-elnusa-blue text-white shadow-sm' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. Penerimaan Material (Vendor ASN)
        </button>
        <button
          id="tab-proc-issuing"
          onClick={() => { setActiveTab('ISSUING'); resetSimulation(); }}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'ISSUING' 
              ? 'bg-elnusa-blue text-white shadow-sm' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Pengeluaran Material (MIV)
        </button>
        <button
          id="tab-proc-site"
          onClick={() => { setActiveTab('PROJECT_SITE'); resetSimulation(); }}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === 'PROJECT_SITE' 
              ? 'bg-elnusa-blue text-white shadow-sm' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          3. Alur Permintaan Proyek
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'GENERAL' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-stretch relative">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.id} className="relative bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </span>
                    <span className="text-[10px] bg-slate-200/60 text-slate-500 font-mono px-1.5 py-0.5 rounded">
                      SAP / ELSASCM
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-800 leading-tight mb-1.5">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{step.description}</p>
                </div>
                
                <div className="border-t border-slate-200/50 pt-2.5 mt-2 space-y-1">
                  {step.details.slice(0, 2).map((det, dIdx) => (
                    <div key={dIdx} className="flex gap-1.5 text-[10px] text-slate-600">
                      <Check className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>

                {index < 4 && (
                  <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-100 shadow-sm rounded-full p-0.5">
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Penerimaan Barang Prinsip */}
          <div className="bg-slate-50/60 rounded-xl p-5 border border-slate-100/80">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">5 PRINSIP UTAMA PENERIMAAN BARANG</h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {PRINSIP_PENERIMAAN.map((prinsip) => (
                <div key={prinsip.step} className="bg-white border border-slate-100 rounded-lg p-3.5 flex flex-col gap-2 shadow-xs">
                  <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
                    0{prinsip.step}
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 leading-tight">{prinsip.title}</h5>
                  <p className="text-[10px] text-slate-500 leading-normal">{prinsip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RECEIVING SIMULATION */}
      {activeTab === 'RECEIVING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-semibold text-slate-800">Alur Penerimaan Barang (Vendor ASN Flow)</h4>
            <p className="text-xs text-slate-500">
              Sistem ELSASCM mengharuskan vendor melakukan pra-pendaftaran dokumen (ASN) secara digital. <span className="font-bold text-red-600 font-mono">No ASN No Entry!</span> Kendaraan tidak akan diizinkan masuk ke gerbang utama tanpa nomor valid di sistem.
            </p>

            {/* Visual Process Blocks */}
            <div className="flex flex-col gap-3 relative pl-4 border-l border-slate-200">
              <div className={`p-3 rounded-lg border text-xs transition-all duration-300 ${simulationStep >= 1 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Tahap 1: Vendor Upload ASN</span>
                  {simulationStep >= 1 ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <span className="text-[10px] text-slate-400">Menunggu</span>}
                </div>
                <p className="text-slate-500 text-[11px]">Vendor mengunggah berkas pengiriman (Advanced Shipping Notice) sebelum mobilisasi.</p>
              </div>

              <div className={`p-3 rounded-lg border text-xs transition-all duration-300 ${simulationStep >= 2 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Tahap 2: Pengiriman & Gate In Check</span>
                  {simulationStep >= 2 ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <span className="text-[10px] text-slate-400">Menunggu</span>}
                </div>
                <p className="text-slate-500 text-[11px]">Kendaraan tiba. Security melakukan verifikasi ASN. Jika valid, dilanjutkan ke Unloading dock.</p>
              </div>

              <div className={`p-3 rounded-lg border text-xs transition-all duration-300 ${simulationStep >= 3 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Tahap 3: Pengecekan Fisik & Goods Receipt (GR)</span>
                  {simulationStep >= 3 ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <span className="text-[10px] text-slate-400">Menunggu</span>}
                </div>
                <p className="text-slate-500 text-[11px]">Pemeriksaan spek vs user requirement. Tim inventory melakukan input posting GR pada aplikasi SAP.</p>
              </div>

              <div className={`p-3 rounded-lg border text-xs transition-all duration-300 ${simulationStep >= 4 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Tahap 4: Racking Penyimpanan</span>
                  {simulationStep >= 4 ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] text-slate-400">Menunggu</span>}
                </div>
                <p className="text-slate-500 text-[11px]">Barang disusun secara modular sesuai klasifikasi blok masing-masing.</p>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Dashboard */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Simulator Penerimaan</span>
                <span className="flex items-center gap-1 text-[10px] bg-slate-900 text-white font-mono px-2 py-0.5 rounded uppercase font-bold animate-pulse">
                  System Live
                </span>
              </div>

              {simulationStep === 0 ? (
                <div className="text-center py-10">
                  <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h5 className="text-xs font-bold text-slate-700">Mulai Simulasi Logistik</h5>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">Lihat alur tracking masuknya barang ke dalam sistem.</p>
                  
                  <div className="mt-5 space-y-2">
                    <button
                      id="btn-sim-gr-ok"
                      onClick={() => startSimulation('RECEIVING')}
                      className="w-full bg-elnusa-blue text-white hover:bg-blue-800 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" /> Jalankan Simulasi (Skenario Normal)
                    </button>
                    <button
                      id="btn-sim-gr-error"
                      onClick={triggerAsnErrorDemo}
                      className="w-full bg-red-50 text-elnusa-red hover:bg-red-100 border border-red-200/50 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> Simulasikan Error "No ASN"
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-3 min-h-[140px] text-[11px] font-mono text-emerald-400 space-y-1 overflow-y-auto">
                    {simulationLogs.map((log, idx) => (
                      <div key={idx}>{log}</div>
                    ))}
                  </div>

                  {showAsnError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-[11px] flex gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Sistem Diblokir:</span> Kendaraan tidak boleh masuk. Vendor harus dipandu menghubungi admin untuk menginput ASN di portal ELSASCM terlebih dahulu.
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!showAsnError && simulationStep < 4 ? (
                      <button
                        id="btn-sim-gr-next"
                        onClick={() => advanceSimulation('RECEIVING')}
                        className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Tahap Selanjutnya <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="text-center w-full py-1.5 text-xs text-emerald-700 font-bold flex justify-center items-center gap-1.5">
                        {showAsnError ? 'Alur Error Ditangani!' : '✓ Simulasi Sukses Selesai!'}
                      </div>
                    )}
                    <button
                      id="btn-sim-gr-reset"
                      onClick={resetSimulation}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-[10px] text-slate-400 border-t border-slate-200/50 pt-3 mt-3">
              *Aplikasi mencatat issue vendor seringkali lupa mengupload ASN sebelum pengiriman ke BSD.
            </div>
          </div>
        </div>
      )}

      {/* ISSUING SIMULATION */}
      {activeTab === 'ISSUING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-semibold text-slate-800">Alur Pengeluaran Material (MIV Flow)</h4>
            <p className="text-xs text-slate-500">
              Pengeluaran barang dari gudang harus mengikuti prosedur ketat menggunakan berkas Material Issue Voucher (MIV) yang terdaftar di SAP untuk memastikan akurasi data stock.
            </p>

            {/* Visual Steps */}
            <div className="flex flex-col gap-3 relative pl-4 border-l border-slate-200">
              <div className={`p-3 rounded-lg border text-xs transition-all duration-300 ${simulationStep >= 1 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Tahap 1: Penerbitan MIV & Reservasi</span>
                  {simulationStep >= 1 ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <span className="text-[10px] text-slate-400">Menunggu</span>}
                </div>
                <p className="text-slate-500 text-[11px]">User proyek menerbitkan MIV lengkap dengan reservasi stok di sistem SAP.</p>
              </div>

              <div className={`p-3 rounded-lg border text-xs transition-all duration-300 ${simulationStep >= 2 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Tahap 2: Pengambilan & Packing</span>
                  {simulationStep >= 2 ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <span className="text-[10px] text-slate-400">Menunggu</span>}
                </div>
                <p className="text-slate-500 text-[11px]">Tim Inventory mengambil material dari rak penyimpanan dan melakukan packing sesuai standar (field packing).</p>
              </div>

              <div className={`p-3 rounded-lg border text-xs transition-all duration-300 ${simulationStep >= 3 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Tahap 3: Posting Goods Issue (GI)</span>
                  {simulationStep >= 3 ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <span className="text-[10px] text-slate-400">Menunggu</span>}
                </div>
                <p className="text-slate-500 text-[11px]">Pihak gudang memposting Goods Issue (GI) di SAP untuk memotong stock secara administratif di system.</p>
              </div>

              <div className={`p-3 rounded-lg border text-xs transition-all duration-300 ${simulationStep >= 4 ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Tahap 4: Handover ke User</span>
                  {simulationStep >= 4 ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] text-slate-400">Menunggu</span>}
                </div>
                <p className="text-slate-500 text-[11px]">Barang diterima user dengan penandatanganan Bukti Penyerahan Barang (BPB).</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Simulator Pengeluaran</span>
                <span className="text-[10px] bg-slate-900 text-white font-mono px-2 py-0.5 rounded uppercase font-bold">MIV Active</span>
              </div>

              {simulationStep === 0 ? (
                <div className="text-center py-10">
                  <Database className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h5 className="text-xs font-bold text-slate-700">Mulai Pengeluaran Stock</h5>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">Simulasikan picking, packing, dan pemotongan stok SAP.</p>
                  
                  <button
                    id="btn-sim-gi-start"
                    onClick={() => startSimulation('ISSUING')}
                    className="mt-5 w-full bg-elnusa-blue text-white hover:bg-blue-800 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Proses Pengeluaran Barang
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-3 min-h-[140px] text-[11px] font-mono text-emerald-400 space-y-1 overflow-y-auto">
                    {simulationLogs.map((log, idx) => (
                      <div key={idx}>{log}</div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {simulationStep < 4 ? (
                      <button
                        id="btn-sim-gi-next"
                        onClick={() => advanceSimulation('ISSUING')}
                        className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Tahap Selanjutnya <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="text-center w-full py-1.5 text-xs text-emerald-700 font-bold flex justify-center items-center gap-1.5">
                        ✓ Posting GI Selesai, Stock Terpotong!
                      </div>
                    )}
                    <button
                      id="btn-sim-gi-reset"
                      onClick={resetSimulation}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-[10px] text-slate-400 border-t border-slate-200/50 pt-3 mt-3">
              *Outstanding Goods Issue harus dipantau mingguan untuk mencegah perbedaan data fisik gudang vs SAP.
            </div>
          </div>
        </div>
      )}

      {/* PROJECT SITE TIMELINE */}
      {activeTab === 'PROJECT_SITE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-semibold text-slate-800">Alur Permintaan & Pengeluaran ke Proyek (Site)</h4>
            <p className="text-xs text-slate-500">
              Bagaimana material dikirim dan dikontrol saat berada di site proyek. Proses transfer stok menggunakan Sloc (Storage Location) Proyek agar terkontrol oleh planner.
            </p>

            {/* Custom visual delivery pipeline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROJECT_DELIVERY_STEPS.map((step, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg flex flex-col gap-1.5 shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono bg-blue-50 text-elnusa-blue px-1.5 py-0.5 rounded font-bold border border-blue-100">{step.code}</span>
                    <span className="text-[10px] text-slate-400 font-bold">Langkah {idx + 1}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 leading-tight">{step.label}</h5>
                  <p className="text-[10px] text-slate-500 leading-normal font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Simulator Site Project</span>
                <span className="text-[10px] bg-slate-900 text-white font-mono px-2 py-0.5 rounded uppercase font-bold">Site Logistics</span>
              </div>

              {simulationStep === 0 ? (
                <div className="text-center py-10">
                  <Truck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h5 className="text-xs font-bold text-slate-700">Mulai Simulasi Proyek</h5>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">Tris alur dari transfer Sloc di BSD hingga pemakaian lapangan.</p>
                  
                  <button
                    id="btn-sim-proj-start"
                    onClick={() => startSimulation('PROJECT')}
                    className="mt-5 w-full bg-elnusa-blue text-white hover:bg-blue-800 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Proses Logistik Proyek
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-3 min-h-[140px] text-[11px] font-mono text-emerald-400 space-y-1 overflow-y-auto">
                    {simulationLogs.map((log, idx) => (
                      <div key={idx}>{log}</div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {simulationStep < 4 ? (
                      <button
                        id="btn-sim-proj-next"
                        onClick={() => advanceSimulation('PROJECT')}
                        className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Tahap Selanjutnya <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="text-center w-full py-1.5 text-xs text-emerald-700 font-bold flex justify-center items-center gap-1.5">
                        ✓ Handover & Reporting Mingguan Site Sukses!
                      </div>
                    )}
                    <button
                      id="btn-sim-proj-reset"
                      onClick={resetSimulation}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-[10px] text-slate-400 border-t border-slate-200/50 pt-3 mt-3">
              *Koordinasi MIV Operasi dan Material Man site memastikan data pemakaian mingguan terlaporkan akurat ke HO.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
