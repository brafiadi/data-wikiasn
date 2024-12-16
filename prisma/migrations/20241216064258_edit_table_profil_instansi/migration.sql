/*
  Warnings:

  - A unique constraint covering the columns `[instansi_id]` on the table `profil_instansi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instansi_id` to the `profil_instansi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profil_instansi" ADD COLUMN     "instansi_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profil_instansi_instansi_id_key" ON "profil_instansi"("instansi_id");

-- AddForeignKey
ALTER TABLE "profil_instansi" ADD CONSTRAINT "profil_instansi_instansi_id_fkey" FOREIGN KEY ("instansi_id") REFERENCES "instansi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
