/*
  Warnings:

  - The primary key for the `hari_libur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `hari_libur` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "hari_libur" DROP CONSTRAINT "hari_libur_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "hari_libur_pkey" PRIMARY KEY ("id");
