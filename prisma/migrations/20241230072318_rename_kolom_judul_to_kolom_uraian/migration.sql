/*
  Warnings:

  - You are about to drop the column `kolom_judul` on the `standar_biaya_masukan_tabel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "standar_biaya_masukan_tabel" DROP COLUMN "kolom_judul",
ADD COLUMN     "kolom_uraian" TEXT;
