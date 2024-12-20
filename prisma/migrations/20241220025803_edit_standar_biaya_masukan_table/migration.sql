/*
  Warnings:

  - You are about to drop the column `penjelasan` on the `standar_biaya_masukan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "standar_biaya_masukan" DROP COLUMN "penjelasan",
ADD COLUMN     "link" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "standar_biaya_masukan_penjelasan" (
    "id" SERIAL NOT NULL,
    "tahun" TEXT NOT NULL,
    "standar_biaya_masukan_id" INTEGER NOT NULL,
    "penjelasan" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "standar_biaya_masukan_penjelasan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "standar_biaya_masukan_penjelasan" ADD CONSTRAINT "standar_biaya_masukan_penjelasan_standar_biaya_masukan_id_fkey" FOREIGN KEY ("standar_biaya_masukan_id") REFERENCES "standar_biaya_masukan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
