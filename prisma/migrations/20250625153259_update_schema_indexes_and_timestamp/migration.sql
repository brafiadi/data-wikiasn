-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "profil_instansi_instansi_id_idx" ON "profil_instansi"("instansi_id");

-- CreateIndex
CREATE INDEX "profil_instansi_tunjangan_kinerja_idx" ON "profil_instansi"("tunjangan_kinerja");

-- CreateIndex
CREATE INDEX "standar_biaya_masukan_biaya_uraian_id_idx" ON "standar_biaya_masukan_biaya"("uraian_id");

-- CreateIndex
CREATE INDEX "standar_biaya_masukan_kategori_standar_biaya_masukan_id_idx" ON "standar_biaya_masukan_kategori"("standar_biaya_masukan_id");

-- CreateIndex
CREATE INDEX "standar_biaya_masukan_penjelasan_standar_biaya_masukan_id_idx" ON "standar_biaya_masukan_penjelasan"("standar_biaya_masukan_id");

-- CreateIndex
CREATE INDEX "standar_biaya_masukan_sub_kategori_kategori_id_idx" ON "standar_biaya_masukan_sub_kategori"("kategori_id");

-- CreateIndex
CREATE INDEX "standar_biaya_masukan_uraian_standar_biaya_masukan_id_idx" ON "standar_biaya_masukan_uraian"("standar_biaya_masukan_id");

-- CreateIndex
CREATE INDEX "standar_biaya_masukan_uraian_kategori_id_idx" ON "standar_biaya_masukan_uraian"("kategori_id");

-- CreateIndex
CREATE INDEX "standar_biaya_masukan_uraian_sub_kategori_id_idx" ON "standar_biaya_masukan_uraian"("sub_kategori_id");

-- CreateIndex
CREATE INDEX "tunjangan_kinerja_peraturan_id_idx" ON "tunjangan_kinerja"("peraturan_id");
