/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `standar_biaya_masukan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "standar_biaya_masukan_link_key" ON "standar_biaya_masukan"("link");
