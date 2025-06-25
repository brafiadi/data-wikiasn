/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `instansi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "instansi_slug_key" ON "instansi"("slug");
