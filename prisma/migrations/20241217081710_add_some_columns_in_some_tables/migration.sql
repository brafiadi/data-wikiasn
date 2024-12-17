-- AlterTable
ALTER TABLE "instansi" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "aktif" BOOLEAN NOT NULL DEFAULT true;
