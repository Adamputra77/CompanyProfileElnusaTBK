import { BlockFacility, LabourData, BusinessProcessStep, LegalComplianceItem, EmergencyTeam, HotlineNumber } from '../types';

export const BLOCKS_DATA: BlockFacility[] = [
  {
    id: 'H1-23',
    name: 'Blok H1-23',
    size: '2.156 m²',
    dimensions: '28 m x 77 m',
    facilities: [
      'Store Lantai 1',
      'Workshop Mekanik & Drilling',
      'TPS Limbah B3 (Temporary Storage Area)',
      'Area Parking Vibro'
    ],
    details: [
      'Penyimpanan Rak Peralatan Drilling & Vibro',
      'Rak Peralatan Mekanik kapasitas tinggi',
      'TPS Limbah B3 berlisensi dengan safety shower & eyewash station',
      'Akses jalan lebar untuk loading/unloading kendaraan berat (Vibro truck)'
    ]
  },
  {
    id: 'H1-19',
    name: 'Blok H1-19',
    size: '810 m²',
    dimensions: '18 m x 45 m',
    surfaceArea: 'Lantai 2: 360 m² (18 m x 20 m)',
    facilities: [
      'Main Gate',
      'Office Facility (Lantai 1)',
      'Store Geophone & Area Test SMT',
      'Asset Storage (Lantai 2)',
      'Workshop Radio & R. Administrasi'
    ],
    details: [
      'Lantai 1 difokuskan untuk administrasi, ruang inventory & HSSE, pantry, dan ruang storeman',
      'Penyimpanan khusus Geophone dalam rak terstruktur',
      'Lantai 2 digunakan sebagai tempat penyimpanan Unit Komputer, Radio, dan Alat Topografi',
      'Area parkir depan dengan akses pengamanan ketat'
    ]
  },
  {
    id: 'H1-20',
    name: 'Blok H1-20',
    size: '801 m²',
    dimensions: '18 m x 44,5 m',
    surfaceArea: 'Lantai 2: 360 m²',
    facilities: [
      'Maintenance Room & Workshops',
      'Geophone Repair Area',
      'Link Cable Storage Area',
      'Meeting Room & Office Lantai 2',
      'Waste Water Treatment Plant (WWTP)'
    ],
    details: [
      'Dilengkapi Workshop Instrumentasi, Topografi, Promex, dan TMS',
      'Memiliki fasilitas perbaikan Geophone dan pengetesan kebocoran (Leakage Test)',
      'Sistem IPAL Domestik & Industri (WWTP) terintegrasi',
      'Rak Cable tipe 428, 428 ULS, dan 408 ULS'
    ]
  },
  {
    id: 'H1-21',
    name: 'Blok H1-21',
    size: '738 m²',
    dimensions: '18 m x 41 m',
    surfaceArea: 'Surface Area: 703 m²',
    facilities: [
      'Workshop Cable Repair',
      'Area Test Cable & Ruang Molding',
      'Musholah Utama',
      'Mezzanine (Under Construction)'
    ],
    details: [
      'Pusat perbaikan dan perawatan link cable proyek',
      'Ruang molding khusus untuk pelapisan/perbaikan sambungan kabel',
      'Fasilitas ibadah (musholah) yang nyaman bagi pekerja',
      'Mezzanine dalam proses pengerjaan (under construction) untuk ekspansi space'
    ]
  }
];

export const LABOUR_DATA: LabourData[] = [
  { no: 1, position: 'Manager', count: 2, origin: 'ARP' },
  { no: 2, position: 'Warehouse Supervisor', count: 1, origin: 'SCM' },
  { no: 3, position: 'Staff', count: 16, origin: 'SCM, ARP, HSSE' },
  { no: 4, position: 'Outsourcing', count: 61, origin: 'SCM, ARP, MEDIC' }
];

export const ABOUT_US_MANAGEMENT_SYSTEMS = [
  { code: 'ISO 9001:2015', desc: 'Quality Management Systems' },
  { code: 'ISO 14001:2015', desc: 'Environmental Management Systems' },
  { code: 'ISO 45001:2018', desc: 'Occupational Health And Safety Management Systems' },
  { code: 'ISO 55001:2014', desc: 'Asset Management Standards' },
  { code: 'ISO 37001:2016', desc: 'Anti-Bribery Management System' }
];

export const BUSINESS_UNITS = [
  { id: 'GDL', name: 'Geodata Land', desc: 'Survei dan akuisisi data seismik darat.' },
  { id: 'GDP', name: 'Geodata Processing', desc: 'Pemrosesan data seismik dan sub-surface imaging.' },
  { id: 'TZ', name: 'Transisi Zone', desc: 'Survei seismik pada area transisi darat-laut.' },
  { id: 'GDM', name: 'Geodata Marine', desc: 'Akuisisi data seismik laut dalam.' },
  { id: 'MSS', name: 'Marine Site Survey', desc: 'Survei geofisika dan geoteknik lepas pantai.' },
  { id: 'NSS', name: 'Navigasi Non Site Survey', desc: 'Sistem penentuan posisi dan navigasi presisi.' },
  { id: 'SDRL', name: 'Survey Data Drilling', desc: 'Layanan penunjang navigasi pemboran lepas pantai.' }
];

export const PROCESS_STEPS: BusinessProcessStep[] = [
  {
    id: 'PR_CREATION',
    title: 'Penerbitan PR material',
    description: 'Proses awal pengadaan dan permintaan material proyek',
    details: [
      'User/Planner membuat Purchase Requisition (PR) material.',
      'Sistem yang digunakan: SAP atau aplikasi khusus SCM ELSASCM.',
      'Validasi spec teknis dan ketersediaan budget oleh tim terkait.'
    ],
    iconName: 'FileText'
  },
  {
    id: 'GOODS_RECEIPT',
    title: 'Penerimaan / Goods Receipt (GR)',
    description: 'Menerima, memeriksa, dan mencatat barang masuk',
    details: [
      'Pengecekan kesesuaian dokumen pengiriman (Vendor DO & PO).',
      'Pengecekan fisik barang (Spesifikasi, Jumlah, Kondisi).',
      'Tim Inventory melakukan posting Goods Receipt (GR) di SAP.'
    ],
    iconName: 'PackageCheck'
  },
  {
    id: 'RACKING_PACKING',
    title: 'Racking & Packing',
    description: 'Penyusunan barang pada lokasi penyimpanan yang sesuai',
    details: [
      'Barang dikelompokkan berdasarkan tipe (Geophone, Cable, Drilling, dll).',
      'Penyimpanan menggunakan forklift ke rak-rak blok yang ditentukan.',
      'Pelabelan bin-location agar memudahkan tracing.'
    ],
    iconName: 'Layers'
  },
  {
    id: 'GOODS_ISSUE',
    title: 'Pengeluaran / Goods Issue (GI)',
    description: 'Pengeluaran material berdasarkan permintaan resmi',
    details: [
      'User mengajukan Material Issue Voucher (MIV) yang disetujui.',
      'Tim warehouse menyiapkan barang (picking & packing).',
      'Melakukan posting Goods Issue (GI) di SAP untuk memotong stock.'
    ],
    iconName: 'PackageOpen'
  },
  {
    id: 'MOB_DEMOB',
    title: 'Mobilisasi & Demobilisasi',
    description: 'Logistik pengiriman dan pengembalian peralatan proyek',
    details: [
      'Manajemen Man Power untuk loading & unloading.',
      'Penggunaan Material Handling Equipment (MHE) seperti Forklift/Crane.',
      'Penyediaan space khusus dan packing aman sebelum dikirim ke site proyek.'
    ],
    iconName: 'Truck'
  }
];

export const PRINSIP_PENERIMAAN = [
  { step: 1, title: 'Aktifitas Transportasi', desc: 'Logistik kedatangan armada pengirim barang di area unloading.' },
  { step: 2, title: 'Pengecekan Dokumen vs Dokumen', desc: 'Verifikasi dokumen jalan, Purchase Order (PO) dan Advanced Shipping Notice (ASN).' },
  { step: 3, title: 'Pengecekan Dokumen vs Barang', desc: 'Pengecekan kesesuaian item fisik (part number, serial number, jumlah) dengan manifest.' },
  { step: 4, title: 'Aktifitas Barang vs Lokasi (Space)', desc: 'Penempatan barang di temporary storage area atau racking block sesuai kapasitas.' },
  { step: 5, title: 'Aktifitas Dokumen vs System', desc: 'Melakukan entry data Goods Receipt (GR) ke dalam SAP/ELSASCM agar inventory terupdate.' }
];

export const PROJECT_DELIVERY_STEPS = [
  { code: 'FR', label: 'Field Requisition', desc: 'Permintaan oleh PIC/User Proyek' },
  { code: 'Availability', label: 'Asset Checking', desc: 'Pengecekan ketersediaan alat di database warehouse' },
  { code: 'Confirmation', label: 'Prepare Asset', desc: 'Konfirmasi kelayakan alat dan persiapan fisik' },
  { code: 'Action', label: 'Packing', desc: 'Proses packing Field APO & In-Outbound staff' },
  { code: 'FR Mobilization', label: 'Transport Setup', desc: 'Penjadwalan dengan vendor transportasi logistik' },
  { code: 'Mobilization', label: 'Delivery', desc: 'Pengiriman barang hingga tiba di lokasi site proyek' }
];

export const COMPLIANCE_DATA: LegalComplianceItem[] = [
  {
    category: 'HEALTH',
    title: 'Kesehatan Kerja (Health)',
    points: [
      'Pemeriksaan Kesehatan Berkala (Medical Check-Up / MCU) untuk seluruh pekerja.',
      'Manajemen Kelelahan (Fatigue Management) & Hygiene Industri.',
      'Penyediaan fasilitas P3K lengkap di setiap blok.',
      'Layanan Medic standby untuk mendukung aktivitas operasional harian.'
    ]
  },
  {
    category: 'SAFETY',
    title: 'Keselamatan Kerja (Safety)',
    points: [
      'Penerapan ketat "Pertamina 15 Life Saving Rules" di lingkungan kerja.',
      'Izin Kerja Aman (SIKA / Surat Izin Kerja Aman) wajib untuk pekerjaan risiko tinggi.',
      'Inspeksi rutin Material Handling Equipment (MHE) & peralatan kerja.',
      'Sertifikasi CSMS (Contractor Safety Management System) bagi mitra kerja.'
    ]
  },
  {
    category: 'ENVIRONMENT',
    title: 'Lindungan Lingkungan (Environment)',
    points: [
      'Identifikasi & Evaluasi Pemenuhan PPL (Perlindungan & Pengelolaan Lingkungan).',
      'Pengelolaan Limbah B3 berlisensi di TPS Resmi Blok H1-23.',
      'Pengolahan limbah air melalui Waste Water Treatment Plant (WWTP) / IPAL Domestik & Industri.',
      'Penerapan Zero Spill policy dalam penanganan tumpahan minyak/kimia.'
    ]
  }
];

export const EMERGENCY_TEAMS: EmergencyTeam[] = [
  {
    name: 'Fire Team',
    leader: 'Widodo',
    description: 'Melakukan pemadaman kebakaran awal dan melaporkan jika kebakaran tidak terkendali ke dinas terkait.',
    members: ['ENDIK H', 'Hendric', 'Wawang', 'Hendi', 'Sugiarto', 'Graha Tigana', 'Langgeng', 'Donni']
  },
  {
    name: 'Injury Person Evacuation Team',
    leader: 'Rona',
    description: 'Mencari korban, membawa korban ke tempat aman/klinik, berkoordinasi dengan Medic, serta melakukan pertolongan pertama (P3K).',
    members: ['Afryanto. R', 'Ade', 'M. Riga', 'Jaya']
  },
  {
    name: 'Oil Spill Team',
    leader: 'Kustono',
    description: 'Melakukan pencegahan dan penanggulangan agar tumpahan minyak tidak meluas serta langsung membersihkan area.',
    members: ['Jaell', 'Namar', 'Iwan', 'Apriyanto Mec']
  },
  {
    name: 'Asset Guard Team',
    leader: 'Fadli',
    description: 'Melakukan pengamanan berkas-berkas penting dan asset unit yang berharga agar terhindar dari kerusakan bencana.',
    members: ['M. Agus. M', 'Hardiansyah', 'Hermanto']
  },
  {
    name: 'Bencana Alam Evacuation Team',
    leader: 'Surajiman',
    description: 'Melakukan evakuasi pekerja ke tempat aman (Muster Point) jika terjadi bencana alam hebat.',
    members: ['Fatta', 'Andik', 'Security ON', 'Asep']
  }
];

export const HOTLINES: HotlineNumber[] = [
  { label: 'Kepala Warehouse (Kustono)', number: '0852-1192-0331' },
  { label: 'HSE Officer', number: '0813-1462-4917' },
  { label: 'Dinas Kebakaran', number: '0811-9000-74 / 538-4133' },
  { label: 'Polsek Serpong', number: '(021) 538-4133' },
  { label: 'BASARNAS', number: '115' },
  { label: 'RS Hermina Serpong', number: '0813-8609-5593' },
  { label: 'Engineering WH', number: '0896-4921-3855' },
  { label: 'Komandan Security', number: '0896-5388-8823' }
];

export const TANTANGAN_STRATEGIS = [
  {
    title: 'Keterbatasan Space (Optimal Storage Capacity)',
    desc: 'Asset aktif, unit drilling, seismik cable, dan geophone terus bertambah seiring proyek baru. Solusi mezzanine di Blok H1-21 sedang dikonstruksi untuk memperluas storage vertikal.',
    tag: 'Fisik'
  },
  {
    title: 'Kawasan & Aksesibilitas Logistik BSD',
    desc: 'Lokasi di area BSD memiliki pembatasan operasional truk tonase besar pada jam sibuk perkotaan. Memerlukan planning mobilisasi matang (70% mobilisasi diatur malam hari / jadwal khusus).',
    tag: 'Regulasi'
  },
  {
    title: 'Keterlambatan Vendor Upload ASN',
    desc: 'Sistem menetapkan aturan ketat "No ASN, No Entry". Jika vendor terlambat mengupload Advanced Shipping Notice (ASN) ke sistem ELSASCM, akan menghambat proses penerimaan fisik barang.',
    tag: 'Sistem'
  },
  {
    title: 'Outstanding Goods Issue Backlog',
    desc: 'Pemberkasan material pasca-proyek seringkali mengalami gap waktu. Dilakukan Weekly Meeting RFR-PO koordinasi intensif Buyer-Planner-User-Inventory untuk rekonsiliasi.',
    tag: 'Administrasi'
  }
];
