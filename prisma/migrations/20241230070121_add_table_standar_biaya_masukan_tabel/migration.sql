-- CreateTable
CREATE TABLE "standar_biaya_masukan_tabel" (
    "id" SERIAL NOT NULL,
    "standar_biaya_masukan_id" INTEGER NOT NULL,
    "kolom_judul" TEXT,
    "kolom_satuan" TEXT,
    "kolom_1" TEXT,
    "kolom_2" TEXT,
    "kolom_3" TEXT,
    "kolom_4" TEXT,
    "kolom_5" TEXT,

    CONSTRAINT "standar_biaya_masukan_tabel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "standar_biaya_masukan_tabel_standar_biaya_masukan_id_key" ON "standar_biaya_masukan_tabel"("standar_biaya_masukan_id");

-- AddForeignKey
ALTER TABLE "standar_biaya_masukan_tabel" ADD CONSTRAINT "standar_biaya_masukan_tabel_standar_biaya_masukan_id_fkey" FOREIGN KEY ("standar_biaya_masukan_id") REFERENCES "standar_biaya_masukan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
