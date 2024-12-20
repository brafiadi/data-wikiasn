-- CreateTable
CREATE TABLE "standar_biaya_masukan" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "jenis" TEXT NOT NULL DEFAULT '',
    "penjelasan" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "standar_biaya_masukan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "standar_biaya_masukan_kategori" (
    "id" SERIAL NOT NULL,
    "standar_biaya_masukan_id" INTEGER NOT NULL,
    "nama_kategori" TEXT NOT NULL,

    CONSTRAINT "standar_biaya_masukan_kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "standar_biaya_masukan_sub_kategori" (
    "id" SERIAL NOT NULL,
    "kategori_id" INTEGER NOT NULL,
    "nama_sub_kategori" TEXT NOT NULL,

    CONSTRAINT "standar_biaya_masukan_sub_kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "standar_biaya_masukan_uraian" (
    "id" SERIAL NOT NULL,
    "uraian" TEXT,
    "satuan" TEXT,
    "standar_biaya_masukan_id" INTEGER NOT NULL,
    "kategori_id" INTEGER,
    "sub_kategori_id" INTEGER,
    "provinsi_id" INTEGER,

    CONSTRAINT "standar_biaya_masukan_uraian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "standar_biaya_masukan_biaya" (
    "id" SERIAL NOT NULL,
    "uraian_id" INTEGER NOT NULL,
    "tahun" TEXT NOT NULL,
    "nilai_1" INTEGER,
    "nilai_2" INTEGER,
    "nilai_3" INTEGER,
    "nilai_4" INTEGER,
    "nilai_5" INTEGER,
    "nilai_6" INTEGER,

    CONSTRAINT "standar_biaya_masukan_biaya_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "standar_biaya_masukan_kategori" ADD CONSTRAINT "standar_biaya_masukan_kategori_standar_biaya_masukan_id_fkey" FOREIGN KEY ("standar_biaya_masukan_id") REFERENCES "standar_biaya_masukan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standar_biaya_masukan_sub_kategori" ADD CONSTRAINT "standar_biaya_masukan_sub_kategori_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "standar_biaya_masukan_kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standar_biaya_masukan_uraian" ADD CONSTRAINT "standar_biaya_masukan_uraian_standar_biaya_masukan_id_fkey" FOREIGN KEY ("standar_biaya_masukan_id") REFERENCES "standar_biaya_masukan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standar_biaya_masukan_uraian" ADD CONSTRAINT "standar_biaya_masukan_uraian_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "standar_biaya_masukan_kategori"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standar_biaya_masukan_uraian" ADD CONSTRAINT "standar_biaya_masukan_uraian_sub_kategori_id_fkey" FOREIGN KEY ("sub_kategori_id") REFERENCES "standar_biaya_masukan_sub_kategori"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standar_biaya_masukan_biaya" ADD CONSTRAINT "standar_biaya_masukan_biaya_uraian_id_fkey" FOREIGN KEY ("uraian_id") REFERENCES "standar_biaya_masukan_uraian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
