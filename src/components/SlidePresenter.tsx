import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Grid, Play, Pause, Maximize, Minimize,
  Edit2, FileText, MapPin, HardDrive, Cpu, Compass, Users, Clock,
  Building, CheckCircle, AlertTriangle, HelpCircle, Save, Check, Award,
  Globe, Linkedin, Instagram, Youtube
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import LabourStatistics from './LabourStatistics';
import HsseDashboard from './HsseDashboard';
import { BLOCKS_DATA, LABOUR_DATA, ABOUT_US_MANAGEMENT_SYSTEMS, BUSINESS_UNITS, TANTANGAN_STRATEGIS } from '../data/slidesData';

// Import image assets
import coverLeftBg from '../assets/images/cover_left_bg_1784259612125.jpg';
import img8965Optimized from '../assets/images/IMG_8965_optimized.jpg';
import blockH123New from '../assets/images/block_h1_23_new.jpg';
import blockH121New from '../assets/images/block_h1_21_new.jpg';
import blockH120New from '../assets/images/block_h1_20_new.jpg';
import blockH119 from '../assets/images/block_h1_19_1784259724899.jpg';
import aerialSitemap from '../assets/images/aerial_sitemap_1784259664261.jpg';

type ViewMode = 'PRESENTATION' | 'GRID' | 'SANDBOX';

export default function SlidePresenter() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('PRESENTATION');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Speaker Notes/Comments state (persisted in localStorage)
  const [speakerNotes, setSpeakerNotes] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('elnusa_speaker_notes');
    return saved ? JSON.parse(saved) : {
      0: "Sambutan awal. Tekankan bahwa ini adalah profil operasional terintegrasi tahun 2025/2026.",
      1: "Highlight total luasan 4.479 m2 yang terbagi menjadi 4 blok modular dengan kapasitas spesifik.",
      2: "Sampaikan kedekatan jarak (25.7 km, ±45 menit) dari Head Office Cilandak. 70% mobilisasi berputar di jalur ini.",
      3: "Detail layout fisik satelit area BSD. Jelaskan batas-batas dimensi H1-23, H1-21, H1-20, dan H1-19.",
      4: "Jelaskan sertifikasi ISO terintegrasi (9001, 14001, 45001, 55001, 37001). Ini bukti standardisasi internasional.",
      5: "Sebutkan 7 unit bisnis seismik/non-seismik yang disokong logistiknya oleh BSD.",
      6: "Tampilkan tabel 80 personil. Poin penting: mayoritas dioperasikan outsourcing (61 orang) dengan supervisi SCM/ARP.",
      7: "Gunakan peta interaktif di bawah slide untuk menjelaskan peruntukan per blok secara detail.",
      8: "Tunjukkan alur ELSASCM & SAP. Jelaskan mitigasi bottleneck keterlambatan upload ASN oleh vendor.",
      9: "Tunjukkan dashboard HSSE & ERT. Sampaikan kesiapan tim Fire, Oil Spill, Evakuasi, serta Hotline Darurat BSD.",
      10: "Poin krusial untuk Pak Dodo/Manajemen: Menjelaskan isu keterbatasan space & rencana pengerjaan Mezzanine Blok H1-21.",
      11: "Penutup. Ucapkan terima kasih dan tampilkan detail kontak korporat Graha Elnusa."
    };
  });

  const [currentNoteEdit, setCurrentNoteEdit] = useState<string>('');
  const [isSavedNotify, setIsSavedNotify] = useState<boolean>(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'PRESENTATION') {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          nextSlide();
        } else if (e.key === 'ArrowLeft') {
          prevSlide();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, viewMode]);

  // Autoplay effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && viewMode === 'PRESENTATION') {
      interval = setInterval(() => {
        nextSlide();
      }, 7000); // 7 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, viewMode]);

  // Sync current slide notes to editor when slide changes
  useEffect(() => {
    setCurrentNoteEdit(speakerNotes[currentSlide] || '');
  }, [currentSlide, speakerNotes]);

  const totalSlides = 12;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const selectSlide = (index: number) => {
    setCurrentSlide(index);
    setViewMode('PRESENTATION');
  };

  const handleSaveNotes = () => {
    const updated = { ...speakerNotes, [currentSlide]: currentNoteEdit };
    setSpeakerNotes(updated);
    localStorage.setItem('elnusa_speaker_notes', JSON.stringify(updated));
    setIsSavedNotify(true);
    setTimeout(() => setIsSavedNotify(false), 2000);
  };

  const toggleFullscreen = () => {
    const element = document.getElementById('presentation-viewport');
    if (!element) return;

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for native exit fullscreen
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Slide content database mapping
  const slides = [
    // 1. Cover
    {
      title: "Profil Warehouse Elnusa - BSD",
      subtitle: "Solusi Logistik & Pengelolaan Inventory Terintegrasi Tahun 2025",
      category: "COVER PRESENTASI"
    },
    // 2. Sambutan
    {
      title: "Welcome to Elnusa Warehouse BSD",
      subtitle: "Fasilitas Logistik Utama Penunjang Operasional Eksplorasi Energi",
      category: "SAMBUTAN & DATA FISIK"
    },
    // 3. Lokasi
    {
      title: "Lokasi Strategis & Site Map",
      subtitle: "Konektivitas Cepat dengan Kantor Pusat Graha Elnusa",
      category: "LOKASI & AKSESIBILITAS"
    },
    // 4. Site Map Satelit (NEW)
    {
      title: "Site Map Satelit & Dimensi Blok",
      subtitle: "Batas Area Real dan Ukuran Fisik per Blok Modular",
      category: "LOKASI & AKSESIBILITAS"
    },
    // 5. Tentang Kami
    {
      title: "Tentang Kami (About Us)",
      subtitle: "Komitmen Standardisasi Pengelolaan Aset & Kualitas Layanan",
      category: "STANDARISASI & KAPASITAS"
    },
    // 6. Business Units
    {
      title: "Unit Bisnis Terintegrasi",
      subtitle: "Penyedia Dukungan Logistik Lintas Fungsi untuk Efisiensi Proyek",
      category: "BUSINESS UNITS SUPPORT"
    },
    // 7. Labour
    {
      title: "Struktur Tenaga Kerja (Labour)",
      subtitle: "Sinergi Sumber Daya Profesional (POB) untuk Operasional Gudang",
      category: "ORGANISASI & MANPOWER"
    },
    // 8. Layout & Fasilitas
    {
      title: "Layout & Fasilitas Gudang per Blok",
      subtitle: "Pembagian Sektor Modular Berdasarkan Kategori Peralatan",
      category: "FASILITAS & AREA BLOK"
    },
    // 9. Sistem & Mekanisme
    {
      title: "Sistem Manajemen Inventaris Terpadu",
      subtitle: "Optimasi Alur SAP & ELSASCM untuk Transparansi Stok Real-time",
      category: "SYSTEMS & TECHNOLOGY"
    },
    // 10. Legal Compliance HSSE
    {
      title: "Legal Compliance & Keselamatan HSSE",
      subtitle: "Pilar Zero Accident & Kesiapsiagaan Tanggap Darurat BSD",
      category: "K3 & LINDUNGAN LINGKUNGAN"
    },
    // 11. Tantangan & Isu
    {
      title: "Tantangan & Isu Strategis Gudang",
      subtitle: "Identifikasi Hambatan Operasional dan Rencana Mitigasi",
      category: "STRATEGIC ISSUES"
    },
    // 12. Penutup
    {
      title: "Sekian & Terima Kasih",
      subtitle: "Sinergi Menuju Perusahaan Jasa Energi Terkemuka & Solusi Total",
      category: "CLOSING CODES"
    }
  ];

  // Helper text size classes
  const getTextSizeClass = (type: 'title' | 'body') => {
    if (type === 'title') {
      return fontSize === 'sm' ? 'text-xl md:text-2xl' : fontSize === 'base' ? 'text-2xl md:text-3.5xl' : 'text-3xl md:text-5xl';
    }
    return fontSize === 'sm' ? 'text-xs' : fontSize === 'base' ? 'text-xs md:text-sm' : 'text-sm md:text-base';
  };

  return (
    <div id="slide-presenter-root" className="flex flex-col gap-6">
      {/* View Mode Controllers & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-elnusa-red px-3 py-1.5 rounded-lg text-xs font-black tracking-widest font-mono uppercase">
            ELNUSA BSD
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight">PRESENTASI COMPANY PROFILE</h2>
            <p className="text-[10px] text-slate-400 font-medium">Warehouse & Inventory Management BSD</p>
          </div>
        </div>

        {/* Mode Selectors */}
        <div className="flex items-center gap-2">
          <button
            id="btn-mode-presentation"
            onClick={() => setViewMode('PRESENTATION')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              viewMode === 'PRESENTATION' ? 'bg-elnusa-red text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Presentasi
          </button>
          <button
            id="btn-mode-grid"
            onClick={() => setViewMode('GRID')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              viewMode === 'GRID' ? 'bg-elnusa-red text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Semua Slide
          </button>
          <button
            id="btn-mode-sandbox"
            onClick={() => setViewMode('SANDBOX')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              viewMode === 'SANDBOX' ? 'bg-elnusa-red text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Ruang Simulasi
          </button>
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      {viewMode === 'PRESENTATION' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          {/* SLIDE DECK (Col 9) */}
          <div className="xl:col-span-9 flex flex-col justify-between bg-slate-950 text-white rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[500px] md:min-h-[580px] xl:min-h-[620px] shadow-2xl border border-slate-800 flex-1 relative" id="presentation-viewport">
            
            {/* Top Indicator */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-gradient-to-r from-slate-950 to-slate-900">
              <span className="text-[10px] font-black tracking-widest text-red-500 font-mono">
                {slides[currentSlide].category}
              </span>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-bold text-[11px]">
                  SLIDE {currentSlide + 1} / {totalSlides}
                </span>
              </div>
            </div>

            {/* Slide Body Canvas */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
              
              {/* Dynamic Slide Renderer */}
              <div className="max-w-4xl mx-auto w-full">
                                {/* CATEGORY 1: COVER (Slide 0) */}
                {currentSlide === 0 && (
                  <div className="relative w-full min-h-[460px] md:h-[520px] h-auto rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between p-4 md:p-6 text-slate-900">
                    {/* Background image full bleed on the left, fade out or blue-overlay to the right */}
                    <div className="absolute inset-0 z-0 flex">
                      <div className="w-full md:w-1/2 relative h-full">
                        <img 
                          src={coverLeftBg} 
                          alt="Elnusa heavy equipment" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-elnusa-blue/70 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900" />
                        <div className="absolute inset-0 md:hidden bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />
                      </div>
                      <div className="hidden md:block w-1/2 bg-gradient-to-r from-slate-900 to-slate-950 h-full" />
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-0 left-0 right-0 p-3 md:p-4 z-20 flex justify-between items-start gap-2">
                      {/* Top-left: Danantara Badge */}
                      <div className="bg-white px-2 py-1 md:px-4 md:py-2 rounded-br-xl md:rounded-br-2xl rounded-tl-lg md:rounded-tl-xl shadow-md flex items-center gap-1 md:gap-1.5 border-b border-r border-slate-200">
                        <span className="text-elnusa-red font-black text-xs md:text-sm tracking-tighter">1st</span>
                        <div className="flex flex-col">
                          <span className="text-[8px] md:text-[10px] font-black text-slate-900 leading-tight">Danantara</span>
                          <span className="text-[6px] md:text-[8px] font-bold text-slate-500 leading-none">Indonesia</span>
                        </div>
                      </div>

                      {/* Top-right: Elnusa Badge */}
                      <div className="bg-white px-2 py-1 md:px-4 md:py-2 rounded-bl-xl md:rounded-bl-2xl rounded-tr-lg md:rounded-tr-xl shadow-md flex items-center gap-1 md:gap-2 border-b border-l border-slate-200 text-right">
                        <div className="flex flex-col">
                          <span className="text-[10px] md:text-xs font-black text-elnusa-blue leading-tight tracking-tight">elnusa</span>
                          <span className="text-[5px] md:text-[7px] font-semibold text-slate-500 leading-none">A Member of Subholding Upstream Pertamina</span>
                        </div>
                        <div className="w-1 md:w-1.5 h-4 md:h-6 bg-elnusa-red rounded-full" />
                      </div>
                    </div>

                    {/* Content Area - Split */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center z-10 mt-12 md:mt-16 mb-4 flex-1">
                      {/* Left: decorative / empty as it's bg */}
                      <div className="md:col-span-5 h-full hidden md:block" />

                      {/* Right: Title and Guard Gate card */}
                      <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <div className="space-y-1 mt-6 md:mt-0">
                          <h1 className="text-2xl md:text-4.5xl font-black tracking-tight leading-none text-white drop-shadow-md">
                            PROFIL
                          </h1>
                          <h2 className="text-lg md:text-2xl font-bold tracking-tight text-slate-100 drop-shadow-sm">
                            Warehouse Elnusa BSD
                          </h2>
                        </div>

                        {/* Guard Gate Frame Card */}
                        <div className="bg-white p-2 rounded-xl md:rounded-2xl shadow-xl max-w-sm w-full border border-slate-200">
                          <img 
                            src={img8965Optimized} 
                            alt="Gerbang Warehouse Elnusa BSD" 
                            className="w-full h-[100px] sm:h-[120px] md:h-[140px] object-cover rounded-lg md:rounded-xl"
                            referrerPolicy="no-referrer"
                          />
                          <p className="text-[8px] md:text-[9px] text-slate-500 font-bold text-center mt-1.5 font-mono">
                            DOKUMENTASI GERBANG UTAMA & AREA OPERASIONAL
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Area overlay containing the 3 info boxes, Visi, and Social badge */}
                    <div className="z-10 mt-auto space-y-3">
                      {/* Visi */}
                      <div className="text-center">
                        <span className="text-[8px] md:text-xs font-bold tracking-wider text-white bg-slate-900/80 px-3 py-1 md:px-4 md:py-1.5 rounded-full inline-block border border-white/5">
                          VISI: PERUSAHAAN JASA ENERGI TERKEMUKA YANG MEMBERIKAN SOLUSI TOTAL
                        </span>
                      </div>

                      {/* Overlay Info Boxes */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-slate-900/90 backdrop-blur-xs border border-white/10 rounded-xl p-2.5 md:p-3 shadow-sm">
                          <div className="text-[8px] text-slate-400 font-mono uppercase font-bold">LOKASI UTAMA</div>
                          <div className="text-[10px] font-bold text-slate-200 mt-0.5">BSD City, Tangerang Selatan</div>
                        </div>
                        <div className="bg-slate-900/90 backdrop-blur-xs border border-white/10 rounded-xl p-2.5 md:p-3 shadow-sm">
                          <div className="text-[8px] text-slate-400 font-mono uppercase font-bold">TOTAL LUASAN LAHAN</div>
                          <div className="text-[10px] font-bold text-slate-200 mt-0.5">4.479 m² / 4 Blok Modular</div>
                        </div>
                        <div className="bg-slate-900/90 backdrop-blur-xs border border-white/10 rounded-xl p-2.5 md:p-3 shadow-sm">
                          <div className="text-[8px] text-slate-400 font-mono uppercase font-bold">STANDARISASI INTERNASIONAL</div>
                          <div className="text-[10px] font-bold text-slate-200 mt-0.5">Sertifikasi 5 ISO Terintegrasi</div>
                        </div>
                      </div>

                      {/* Social Media Badges */}
                      <div className="flex justify-center items-center gap-3 pt-1 border-t border-white/5">
                        <div className="bg-white rounded-xl md:rounded-full px-3 py-1.5 md:py-1 text-[9px] text-slate-800 font-mono flex flex-wrap justify-center gap-2 md:gap-3.5 shadow-sm font-semibold">
                          <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-blue-600" /> www.elnusa.co.id</span>
                          <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5 text-blue-700" /> PT Elnusa Tbk</span>
                          <span className="flex items-center gap-1"><Instagram className="w-3.5 h-3.5 text-pink-600" /> @elnusaofficial</span>
                          <span className="flex items-center gap-1"><Youtube className="w-3.5 h-3.5 text-red-600" /> elnusa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CATEGORY 2: SAMBUTAN (Slide 1) */}
                {currentSlide === 1 && (
                  <div className="space-y-4 w-full h-full text-slate-900">
                    {/* Header bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-100 p-2.5 rounded-xl border border-slate-200 gap-2 relative">
                      {/* Top left total luasan badge */}
                      <div className="bg-slate-900 text-white text-[9px] font-bold px-2.5 py-1 rounded font-mono">
                        Total Luasan: 4.479 M2
                      </div>

                      {/* Header banner */}
                      <div className="bg-indigo-50 border border-indigo-100 px-6 py-2 rounded-lg mx-auto text-center shadow-xs">
                        <h2 className="text-xs md:text-base font-black tracking-wide text-indigo-900 uppercase">
                          Welcome To The Elnusa Warehouse - BSD
                        </h2>
                      </div>

                      {/* Top right Elnusa logo */}
                      <div className="flex items-center gap-1.5 text-right">
                        <span className="text-xs font-black text-blue-600 leading-none">elnusa</span>
                        <div className="w-1 h-4 bg-red-600 rounded-full" />
                      </div>
                    </div>

                    {/* 4 Cards horizontal grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-1">
                      {/* Card H1-23 */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-col justify-between hover:scale-102 transition-transform duration-200">
                        <img 
                          src={blockH123New} 
                          alt="BLOK H1-23" 
                          className="w-full h-[110px] sm:h-[140px] md:h-[180px] object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="mt-3 text-center space-y-1.5">
                          <div className="bg-blue-50 border border-blue-100 py-1 rounded-lg">
                            <span className="text-xs font-black text-slate-800 tracking-tight">BLOK H1-23</span>
                          </div>
                          <div className="bg-red-600 text-white py-0.5 rounded-md font-mono font-bold text-[10px] shadow-sm">
                            2.156 M2
                          </div>
                        </div>
                      </div>

                      {/* Card H1-21 */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-col justify-between hover:scale-102 transition-transform duration-200">
                        <img 
                          src={blockH121New} 
                          alt="BLOK H1-21" 
                          className="w-full h-[110px] sm:h-[140px] md:h-[180px] object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="mt-3 text-center space-y-1.5">
                          <div className="bg-blue-50 border border-blue-100 py-1 rounded-lg">
                            <span className="text-xs font-black text-slate-800 tracking-tight">BLOK H1-21</span>
                          </div>
                          <div className="bg-red-600 text-white py-0.5 rounded-md font-mono font-bold text-[10px] shadow-sm">
                            738 M2
                          </div>
                        </div>
                      </div>

                      {/* Card H1-20 */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-col justify-between hover:scale-102 transition-transform duration-200">
                        <img 
                          src={blockH120New} 
                          alt="BLOK H1-20" 
                          className="w-full h-[110px] sm:h-[140px] md:h-[180px] object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="mt-3 text-center space-y-1.5">
                          <div className="bg-blue-50 border border-blue-100 py-1 rounded-lg">
                            <span className="text-xs font-black text-slate-800 tracking-tight">BLOK H1-20</span>
                          </div>
                          <div className="bg-red-600 text-white py-0.5 rounded-md font-mono font-bold text-[10px] shadow-sm">
                            801 M2
                          </div>
                        </div>
                      </div>

                      {/* Card H1-19 */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-col justify-between hover:scale-102 transition-transform duration-200">
                        <img 
                          src={blockH119} 
                          alt="BLOK H1-19" 
                          className="w-full h-[110px] sm:h-[140px] md:h-[180px] object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                        <div className="mt-3 text-center space-y-1.5">
                          <div className="bg-blue-50 border border-blue-100 py-1 rounded-lg">
                            <span className="text-xs font-black text-slate-800 tracking-tight">BLOK H1-19</span>
                          </div>
                          <div className="bg-red-600 text-white py-0.5 rounded-md font-mono font-bold text-[10px] shadow-sm">
                            810 M2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CATEGORY 3: LOKASI (Slide 2) */}
                {currentSlide === 2 && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                      <h2 className={`${getTextSizeClass('title')} font-black tracking-tight text-white`}>
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-xs text-red-400 font-bold tracking-wider uppercase font-mono">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Left: Alamat list */}
                      <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-red-500/15 p-2 rounded-lg text-red-400 flex-shrink-0">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lokasi Warehouse BSD</h5>
                              <p className="text-xs font-semibold text-slate-200 mt-1 leading-relaxed">
                                Jl. Tekno Widya - BSD Blok H1 No 19/20, Serpong, Tangerang Selatan, Banten 15314
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500/15 p-2 rounded-lg text-blue-400 flex-shrink-0">
                              <Building className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Head Office Graha Elnusa</h5>
                              <p className="text-xs font-semibold text-slate-200 mt-1 leading-relaxed">
                                Graha Elnusa, Jl. TB Simatupang Kav.1B, Cilandak, Jakarta Selatan 12560
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-slate-300">
                          <span className="font-bold text-white">70% Aktivitas Mobilisasi:</span> Seluruh sirkulasi truk logistik, pengiriman suku cadang, dan pergerakan kru berpusat erat di sumbu Cilandak - BSD.
                        </div>
                      </div>

                      {/* Right: Map stats */}
                      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                        <div className="text-center py-2">
                          <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">JARAK & TRANSIT TIME</div>
                          <div className="text-5xl font-black text-red-500 font-mono tracking-tight my-3">
                            25,7 <span className="text-xl font-normal text-slate-400">km</span>
                          </div>
                          <span className="bg-white/15 text-white px-3 py-1 rounded-full text-xs font-bold font-mono">
                            ± 45 Menit Perjalanan
                          </span>
                        </div>

                        <div className="border-t border-white/5 pt-4 mt-4 space-y-2 text-[11px] text-slate-400">
                          <div className="flex justify-between">
                            <span>Akses Utama:</span>
                            <span className="font-bold text-slate-200">Tol Jakarta-Serpong</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frekuensi Mobilisasi:</span>
                            <span className="font-bold text-slate-200">Tinggi (7/24 Standby)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CATEGORY 3B: SITE MAP SATELIT & DIMENSI BLOK (NEW Slide 3) */}
                {currentSlide === 3 && (
                  <div className="space-y-4 text-slate-900 w-full h-full">
                    <div className="flex justify-between items-center bg-slate-100 p-3 rounded-xl border border-slate-200 relative">
                      <div className="flex flex-col">
                        <h2 className="text-sm font-black text-slate-900 uppercase">
                          SITE MAP SATELIT & DIMENSI BLOK
                        </h2>
                        <p className="text-[10px] text-slate-500 font-bold font-mono">
                          PERSPEKTIF UDARA AREA WAREHOUSE BSD
                        </p>
                      </div>

                      {/* Elnusa Logo */}
                      <div className="flex items-center gap-1.5 text-right">
                        <span className="text-xs font-black text-blue-600 leading-none">elnusa</span>
                        <div className="w-1 h-4 bg-red-600 rounded-full" />
                      </div>
                    </div>

                    {/* Content Section: Image with custom yellow border styling and detailed dimensions sidebar */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch pt-1">
                      {/* Satellite Image View */}
                      <div className="md:col-span-8 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
                        <div className="relative w-full h-[160px] sm:h-[220px] md:h-[280px] rounded-xl overflow-hidden border border-yellow-400">
                          <img 
                            src={aerialSitemap} 
                            alt="Aerial Site Map Elnusa BSD" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-yellow-400 text-slate-900 text-[8px] font-black px-2 py-0.5 rounded shadow-sm font-mono">
                            SATELLITE VIEW
                          </div>
                        </div>
                      </div>

                      {/* Sidebar detailed listing */}
                      <div className="md:col-span-4 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3.5">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider pb-1.5 border-b border-slate-200">
                          DIMENSI FISIK MODULAR
                        </h4>

                        <div className="space-y-3 flex-1 justify-center flex flex-col">
                          {/* Item H1-23 */}
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-yellow-400 text-slate-900 flex items-center justify-center text-[9px] font-black font-mono">23</span>
                            <div className="flex-1">
                              <h5 className="text-[11px] font-black text-slate-800 leading-tight">H1 NO 23</h5>
                              <p className="text-[10px] text-slate-500 font-mono font-semibold">PXL (28 M x 77 M)</p>
                            </div>
                          </div>

                          {/* Item H1-21 */}
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-yellow-400 text-slate-900 flex items-center justify-center text-[9px] font-black font-mono">21</span>
                            <div className="flex-1">
                              <h5 className="text-[11px] font-black text-slate-800 leading-tight">H1 NO 21</h5>
                              <p className="text-[10px] text-slate-500 font-mono font-semibold">PXL (18 M x 41 M)</p>
                            </div>
                          </div>

                          {/* Item H1-20 */}
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-yellow-400 text-slate-900 flex items-center justify-center text-[9px] font-black font-mono">20</span>
                            <div className="flex-1">
                              <h5 className="text-[11px] font-black text-slate-800 leading-tight">H1 NO 20</h5>
                              <p className="text-[10px] text-slate-500 font-mono font-semibold">PXL (18 M x 44,5 M)</p>
                            </div>
                          </div>

                          {/* Item H1-19 */}
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-yellow-400 text-slate-900 flex items-center justify-center text-[9px] font-black font-mono">19</span>
                            <div className="flex-1">
                              <h5 className="text-[11px] font-black text-slate-800 leading-tight">H1 NO 19</h5>
                              <p className="text-[10px] text-slate-500 font-mono font-semibold">PXL (18 M x 45 M)</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-yellow-400/10 border border-yellow-400/30 p-2.5 rounded-xl text-[9px] text-slate-700 font-medium">
                          Batas area modular ditandai secara presisi dalam sistem GIS Elnusa untuk plotting material & penempatan cargo hoist.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CATEGORY 4: ABOUT US (Slide 4) */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                      <h2 className={`${getTextSizeClass('title')} font-black tracking-tight text-white`}>
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-xs text-red-400 font-bold tracking-wider uppercase font-mono">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      {/* Equipment stats */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <HardDrive className="w-5 h-5 text-red-500 mb-3" />
                          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">Peralatan Kelolaan</h4>
                          <p className="text-[10px] text-slate-400 mt-1">Mengelola alat survei seismik presisi.</p>
                        </div>
                        <div className="text-3xl font-black font-mono text-white mt-4">&gt; 47.288 <span className="text-xs text-slate-400 font-normal">Unit</span></div>
                      </div>

                      {/* SKU stats */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <Cpu className="w-5 h-5 text-blue-500 mb-3" />
                          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">Item Inventory</h4>
                          <p className="text-[10px] text-slate-400 mt-1">Kategori SKU suku cadang di gudang.</p>
                        </div>
                        <div className="text-3xl font-black font-mono text-white mt-4">&gt; 600 <span className="text-xs text-slate-400 font-normal">SKU</span></div>
                      </div>

                      {/* POB stats */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <Users className="w-5 h-5 text-emerald-500 mb-3" />
                          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">Rata-rata POB</h4>
                          <p className="text-[10px] text-slate-400 mt-1">Personil aktif reguler & non-reguler.</p>
                        </div>
                        <div className="text-3xl font-black font-mono text-white mt-4">60 - 73 <span className="text-xs text-slate-400 font-normal">Personil</span></div>
                      </div>
                    </div>

                    {/* Certifications (ISO list) */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Sistem Manajemen Tersertifikasi (QHSE)</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {ABOUT_US_MANAGEMENT_SYSTEMS.map((iso, idx) => (
                          <div key={idx} className="bg-slate-900 border border-white/5 rounded-lg p-3">
                            <div className="text-[11px] font-black text-red-400 font-mono">{iso.code}</div>
                            <div className="text-[10px] text-slate-300 leading-tight mt-1">{iso.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* CATEGORY 5: BUSINESS UNITS (Slide 5) */}
                {currentSlide === 5 && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                      <h2 className={`${getTextSizeClass('title')} font-black tracking-tight text-white`}>
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-xs text-red-400 font-bold tracking-wider uppercase font-mono">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
                      {BUSINESS_UNITS.map((unit) => (
                        <div key={unit.id} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-8 rounded-lg bg-red-600/15 text-red-400 flex items-center justify-center font-mono font-black text-xs border border-red-500/30">
                              {unit.id}
                            </span>
                            <h4 className="text-xs font-black text-slate-200">{unit.name}</h4>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {unit.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-xs text-slate-300">
                      <strong>Sinergi Total:</strong> Integrasi 7 unit fungsional utama ini menjamin bahwa seluruh data, armada seismik, dan peralatan pendukung pemboran dikalibrasi di satu fungsional pusat: BSD.
                    </div>
                  </div>
                )}

                {/* CATEGORY 6: LABOUR (Slide 6) */}
                {currentSlide === 6 && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1 mb-4">
                      <h2 className={`${getTextSizeClass('title')} font-black tracking-tight text-white`}>
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-xs text-red-400 font-bold tracking-wider uppercase font-mono">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>

                    {/* Embedded Statistics component */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-2">
                      <LabourStatistics />
                    </div>
                  </div>
                )}

                {/* CATEGORY 7: LAYOUT & FASILITAS (Slide 7) */}
                {currentSlide === 7 && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1 mb-4">
                      <h2 className={`${getTextSizeClass('title')} font-black tracking-tight text-white`}>
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-xs text-red-400 font-bold tracking-wider uppercase font-mono">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>

                    {/* Embedded interactive map component */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-2 text-slate-900">
                      <InteractiveMap />
                    </div>
                  </div>
                )}

                {/* CATEGORY 8: SISTEM & MEKANISME (Slide 8) */}
                {currentSlide === 8 && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                      <h2 className={`${getTextSizeClass('title')} font-black tracking-tight text-white`}>
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-xs text-red-400 font-bold tracking-wider uppercase font-mono">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Left side: System and rules */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/30">
                            <Cpu className="w-5 h-5" />
                          </span>
                          <div>
                            <h4 className="text-xs font-black text-slate-200">Sistem ERP SAP & ELSASCM</h4>
                            <p className="text-[10px] text-slate-400">Arsitektur pergudangan berbasis Cloud</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          Integrasi penuh mengikat Logistics Management, Employee Self Service (ESS), dan E-Catalog. Mencegah manipulasi stock dan menyajikan visibilitas asset live bagi manajemen.
                        </p>

                        <div className="border-t border-white/5 pt-4 space-y-3">
                          <h5 className="text-[10px] font-bold text-red-400 uppercase tracking-wider">ATURAN KETAT MONITORING PENERIMAAN</h5>
                          <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-xs flex gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-red-200">No ASN, No Entry:</span> Vendor harus melakukan pra-upload berkas pengiriman sebelum armada logistik tiba di main gate.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right side: Detailed checklists */}
                      <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 space-y-4">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-white/5 pb-2">MEKANISME PENGELUARAN & SITE PROYEK</h4>
                        
                        <div className="space-y-3">
                          <div className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">01</span>
                            <div>
                              <span className="font-bold text-white">MIV (Material Issue Voucher)</span> lengkap dengan reservasi stok diterbitkan secara digital oleh planner.
                            </div>
                          </div>

                          <div className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">02</span>
                            <div>
                              <span className="font-bold text-white">Transfer Stock ke Sloc Proyek</span> dilakukan oleh tim inventory sebelum pengiriman fisik untuk melacak keberadaan asset di site.
                            </div>
                          </div>

                          <div className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">03</span>
                            <div>
                              <span className="font-bold text-white">Laporan Pemakaian Mingguan</span> dilaporkan secara berkala oleh material man site kepada planner di HO Graha Elnusa.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CATEGORY 9: LEGAL COMPLIANCE HSSE (Slide 9) */}
                {currentSlide === 9 && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1 mb-4">
                      <h2 className={`${getTextSizeClass('title')} font-black tracking-tight text-white`}>
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-xs text-red-400 font-bold tracking-wider uppercase font-mono">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>

                    {/* Embedded HSSE Dashboard */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-2 text-slate-900">
                      <HsseDashboard />
                    </div>
                  </div>
                )}

                {/* CATEGORY 10: TANTANGAN & ISU (Slide 10) */}
                {currentSlide === 10 && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                      <h2 className={`${getTextSizeClass('title')} font-black tracking-tight text-white`}>
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-xs text-red-400 font-bold tracking-wider uppercase font-mono">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {TANTANGAN_STRATEGIS.map((issue, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4.5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] bg-red-500/15 text-red-400 px-2 py-0.5 rounded font-bold font-mono">
                                HAMBATAN {idx + 1}
                              </span>
                              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">
                                Kategori: {issue.tag}
                              </span>
                            </div>
                            <h4 className="text-xs font-black text-slate-200 leading-snug mb-1.5">
                                {issue.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              {issue.desc}
                            </p>
                          </div>

                          {/* Action Solution line */}
                          <div className="border-t border-white/5 pt-3.5 mt-3 text-[10px] text-emerald-400 flex items-center gap-1.5 font-medium">
                            <Check className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Rencana Mitigasi Sedang Diterapkan</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CATEGORY 11: PENUTUP (Slide 11) */}
                {currentSlide === 11 && (
                  <div className="space-y-6 text-center py-6">
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-mono text-red-400 font-semibold mb-2">
                      PT ELNUSA TBK
                    </div>
                    <h1 className={`${getTextSizeClass('title')} font-black tracking-tight text-white leading-none`}>
                      {slides[currentSlide].title}
                    </h1>
                    <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto font-medium italic">
                      "The biggest risk is not taking any risk" — Mark Zuckerberg
                    </p>
                    <div className="w-16 h-1 bg-red-600 mx-auto rounded-full my-6" />

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left max-w-2xl mx-auto space-y-3.5">
                      <div className="text-xs font-bold text-slate-300 uppercase tracking-widest text-center border-b border-white/5 pb-2">
                        KONTAK UTAMA KORPORAT
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Head Office:</span>
                          <p className="text-slate-200 font-medium leading-relaxed">Graha Elnusa 16th Floor, Jl. T.B. Simatupang Kav. 1B, Jakarta 12560, Indonesia</p>
                        </div>
                        <div className="space-y-1 text-left sm:text-right">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Layanan Digital:</span>
                          <p className="text-slate-200 font-mono font-medium">Tel: +62 21-78830850</p>
                          <p className="text-slate-200 font-mono font-medium">Fax: +62 21-78830907</p>
                          <p className="text-red-400 font-semibold mt-1">marketing@elnusa.co.id</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Slide Navigation footer toolbar */}
            <div className="px-6 py-4 border-t border-white/5 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-nav-prev"
                  onClick={prevSlide}
                  className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg text-white font-bold cursor-pointer transition-colors"
                  title="Slide Sebelumnya (Arrow Left)"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  id="btn-nav-next"
                  onClick={nextSlide}
                  className="bg-elnusa-red hover:bg-red-700 px-5 py-2 rounded-lg text-white text-xs font-black cursor-pointer transition-colors flex items-center gap-1"
                  title="Slide Selanjutnya (Arrow Right / Space)"
                >
                  Slide Berikutnya <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress dots bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[280px] py-1">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    id={`dot-nav-${idx}`}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 ${
                      currentSlide === idx 
                        ? 'bg-elnusa-red w-5' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    title={`Lompat ke Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Autoplay & Zoom controllers */}
              <div className="flex items-center gap-3">
                {/* Autoplay toggle */}
                <button
                  id="btn-autoplay-toggle"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                    isPlaying ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-transparent'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                  {isPlaying ? 'Autoplay On' : 'Autoplay Off'}
                </button>

                {/* Font Size Selector */}
                <div className="flex bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold border border-slate-700">
                  <button
                    id="btn-font-sm"
                    onClick={() => setFontSize('sm')}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${fontSize === 'sm' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    A-
                  </button>
                  <button
                    id="btn-font-base"
                    onClick={() => setFontSize('base')}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${fontSize === 'base' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    A
                  </button>
                  <button
                    id="btn-font-lg"
                    onClick={() => setFontSize('lg')}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${fontSize === 'lg' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    A+
                  </button>
                </div>

                {/* Fullscreen view */}
                <button
                  id="btn-fullscreen-toggle"
                  onClick={toggleFullscreen}
                  className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 cursor-pointer"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* PRESENTER / SPEAKER NOTES SIDEBAR (Col 3) */}
          <div className="xl:col-span-3 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-elnusa-red" />
                    <h3 className="text-xs font-black text-elnusa-blue uppercase tracking-wider">Catatan Pembicara</h3>
                  </div>
                  <span className="text-[10px] bg-red-50 text-elnusa-red px-2 py-0.5 rounded font-mono font-bold">
                    Slide {currentSlide + 1} Note
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mb-4 leading-normal font-medium">
                  Tambahkan cue-card atau point penting untuk presentasi ke pihak manajemen / Pak Dodo di bawah ini. Catatan disimpan secara lokal di browser.
                </p>

                <textarea
                  id="speaker-notes-textarea"
                  value={currentNoteEdit}
                  onChange={(e) => setCurrentNoteEdit(e.target.value)}
                  className="w-full min-h-[160px] p-3 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-elnusa-red font-medium leading-relaxed bg-slate-50/50"
                  placeholder="Ketik cue card presentasi di sini..."
                />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  id="btn-save-speaker-notes"
                  onClick={handleSaveNotes}
                  className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  {isSavedNotify ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" /> Tersimpan!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Simpan Catatan
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Slide Jumper drawer list */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 h-[220px] overflow-y-auto">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Daftar Slide Cepat</h4>
              <div className="space-y-1.5">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    id={`quick-jump-slide-${idx}`}
                    onClick={() => selectSlide(idx)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      currentSlide === idx 
                        ? 'bg-slate-100 text-elnusa-blue font-bold border-l-3 border-elnusa-red shadow-xs' 
                        : 'hover:bg-slate-200/50 text-slate-600'
                    }`}
                  >
                    <span className="truncate">{idx + 1}. {s.title}</span>
                    <span className="text-[9px] font-mono opacity-60">S{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OVERVIEW ALL SLIDES GRID MODE */}
      {viewMode === 'GRID' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
            <div className="text-xs text-slate-500 font-medium">
              Menampilkan semua 12 slide presentasi dalam bentuk modular. Klik slide manapun untuk mempresentasikan di atas.
            </div>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-2.5 py-1 rounded font-mono font-bold">
              GRID VIEW
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {slides.map((slide, index) => {
              const hasNotes = speakerNotes[index] && speakerNotes[index].trim().length > 0;
              return (
                <button
                  key={index}
                  id={`grid-select-slide-${index}`}
                  onClick={() => selectSlide(index)}
                  className={`text-left bg-slate-950 border text-white rounded-2xl p-5 min-h-[180px] flex flex-col justify-between hover:scale-102 hover:border-elnusa-red hover:shadow-md transition-all duration-300 cursor-pointer ${
                    currentSlide === index ? 'border-elnusa-red ring-2 ring-elnusa-red/20' : 'border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] bg-elnusa-red/10 text-elnusa-red font-mono font-bold px-1.5 py-0.5 rounded border border-elnusa-red/20 uppercase tracking-widest">
                        {slide.category}
                      </span>
                      <span className="text-[11px] font-black text-slate-400 font-mono">
                        #{index + 1}
                      </span>
                    </div>

                    <h4 className="text-sm font-black leading-snug mt-3 mb-1 line-clamp-2">
                      {slide.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 font-medium">
                      {slide.subtitle}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[9px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <FileText className="w-3 h-3 text-slate-400" /> S{index + 1}
                    </span>
                    {hasNotes && (
                      <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold font-mono">
                        ✓ Note Tersimpan
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* WORKSPACE SANDBOX / LIVE SIMULATION MODE */}
      {viewMode === 'SANDBOX' && (
        <div className="space-y-8 bg-slate-50/50 p-6 rounded-3xl border border-slate-200/50">
          <div>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2.5 py-1 rounded-full uppercase font-mono tracking-widest">
              Ruang Eksplorasi BSD
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">Pusat Simulasi Logistik & Pemetaan Aset</h3>
            <p className="text-xs text-slate-500 max-w-3xl mt-1">
              Halaman ini diperuntukkan bagi presentasi interaktif di depan atasan / manajemen. Anda dapat memetakan blok gudang secara dinamis untuk memperlihatkan detail fungsional masing-masing blok.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-red-500" /> Pemetaan Blok & Fasilitas Fisik Gudang
              </h4>
              <InteractiveMap />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
