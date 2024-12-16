-- CreateEnum
CREATE TYPE "jenis_instansi" AS ENUM ('Negara', 'Kementerian', 'Lembaga', 'Pemerintah Daerah');

-- CreateTable
CREATE TABLE "instansi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" "jenis_instansi" NOT NULL,

    CONSTRAINT "instansi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profil_instansi" (
    "id" SERIAL NOT NULL,
    "tunjangan_kinerja" INTEGER NOT NULL,

    CONSTRAINT "profil_instansi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peraturan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tautan" TEXT NOT NULL,
    "tahun" TEXT NOT NULL,
    "berlaku" BOOLEAN NOT NULL,
    "kata_kunci" TEXT[],

    CONSTRAINT "peraturan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tunjangan_kinerja" (
    "id" SERIAL NOT NULL,
    "kelas_jabatan" TEXT NOT NULL,
    "besaran" BIGINT NOT NULL,
    "peraturan_id" INTEGER NOT NULL,

    CONSTRAINT "tunjangan_kinerja_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profil_instansi" ADD CONSTRAINT "profil_instansi_tunjangan_kinerja_fkey" FOREIGN KEY ("tunjangan_kinerja") REFERENCES "peraturan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tunjangan_kinerja" ADD CONSTRAINT "tunjangan_kinerja_peraturan_id_fkey" FOREIGN KEY ("peraturan_id") REFERENCES "peraturan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
