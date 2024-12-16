/*
  Warnings:

  - You are about to alter the column `besaran` on the `tunjangan_kinerja` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "tunjangan_kinerja" ALTER COLUMN "besaran" SET DATA TYPE INTEGER;
