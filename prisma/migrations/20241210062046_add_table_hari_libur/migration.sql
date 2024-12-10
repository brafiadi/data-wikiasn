-- CreateTable
CREATE TABLE "hari_libur" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "tahun" INTEGER NOT NULL,
    "bulan" INTEGER NOT NULL,
    "deskripsi" TEXT,
    "kategori" TEXT NOT NULL DEFAULT 'Libur Nasional',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hari_libur_pkey" PRIMARY KEY ("id")
);
