-- CreateEnum
CREATE TYPE "kategori_peraturan" AS ENUM ('Ketetapan Majelis Permusyawaratan Rakyat', 'Undang-Undang', 'Undang-Undang Darurat', 'Peraturan Pemerintah Pengganti Undang-Undang', 'Peraturan Pemerintah', 'Peraturan Presiden', 'Penetapan Presiden', 'Keputusan Presiden', 'Instruksi Presiden', 'Peraturan Menteri', 'Keputusan Menteri', 'Peraturan Badan/Lembaga', 'Peraturan Daerah');

-- AlterTable
ALTER TABLE "peraturan" ADD COLUMN     "kategori" "kategori_peraturan" NOT NULL DEFAULT 'Peraturan Pemerintah',
ADD COLUMN     "tanggal_pengesahan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
