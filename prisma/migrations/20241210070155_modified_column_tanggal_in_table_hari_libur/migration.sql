/*
  Warnings:

  - You are about to drop the column `tanggal` on the `hari_libur` table. All the data in the column will be lost.
  - Added the required column `tanggal_akhir` to the `hari_libur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_mulai` to the `hari_libur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hari_libur" DROP COLUMN "tanggal",
ADD COLUMN     "tanggal_akhir" DATE NOT NULL,
ADD COLUMN     "tanggal_mulai" DATE NOT NULL;
