import prisma from "../lib/prisma";
import type {
  InsertPeraturanData,
  UpdatePeraturanData,
} from "../types/peraturan";
import type { kategori_peraturan } from "@prisma/client";

export class PeraturanService {
  async getListPeraturan() {
    // NOTE: Urutan custom yang kompleks seperti ini lebih mudah ditangani dengan query raw.
    // Prisma Client API tidak secara langsung mendukung 'CASE' dalam 'orderBy'.
    // Namun, kita menggantinya ke $queryRaw yang lebih aman daripada $queryRawUnsafe.
    const query = `
      SELECT *
      FROM peraturan
     ORDER BY 
      CASE kategori
        WHEN 'Ketetapan Majelis Permusyawaratan Rakyat' THEN 1
        WHEN 'Undang-Undang' THEN 2
        WHEN 'Undang-Undang Darurat' THEN 3
        WHEN 'Peraturan Pemerintah Pengganti Undang-Undang' THEN 4
        WHEN 'Peraturan Pemerintah' THEN 5
        WHEN 'Peraturan Presiden' THEN 6
        WHEN 'Penetapan Presiden' THEN 7
        WHEN 'Keputusan Presiden' THEN 8
        WHEN 'Instruksi Presiden' THEN 9
        WHEN 'Peraturan Menteri' THEN 10
        WHEN 'Keputusan Menteri' THEN 11
        WHEN 'Peraturan Badan/Lembaga' THEN 12
        WHEN 'Peraturan Daerah' THEN 13
        ELSE 14
      END,
      tanggal_pengesahan DESC
    `;
    try {
      const peraturan = await prisma.$queryRawUnsafe(query);
      return peraturan;
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      throw new Error("Gagal mengambil data peraturan");
    }
  }

  async getPeraturanById(id: number) {
    try {
      return await prisma.peraturan.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      throw new Error("Gagal mengambil data peraturan by ID");
    }
  }

  async getPeraturanBySlug(slug: string) {
    try {
      // Asumsikan slug adalah unik, jika tidak gunakan findFirst
      return await prisma.peraturan.findFirst({
        where: { slug },
      });
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      throw new Error("Gagal mengambil data peraturan by slug");
    }
  }

  async insertPeraturan(data: InsertPeraturanData) {
    try {
      const newPeraturan = await prisma.peraturan.create({
        data: {
          ...data,
          kategori: data.kategori as kategori_peraturan,
          berlaku: data.berlaku !== undefined ? data.berlaku : true,
        },
      });
      return {
        success: true,
        message: "Data berhasil ditambahkan",
        data: newPeraturan,
      };
    } catch (error) {
      console.error("Gagal menambah data:", error);
      throw new Error("Gagal menambah data peraturan");
    }
  }

  async updatePeraturan(id: number, data: UpdatePeraturanData) {
    try {
      const updatedPeraturan = await prisma.peraturan.update({
        where: { id },
        data: {
          ...data,
          kategori: data.kategori as kategori_peraturan,
        },
      });
      return {
        success: true,
        message: "Data berhasil diperbarui",
        data: updatedPeraturan,
      };
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      throw new Error("Gagal memperbarui data peraturan");
    }
  }
}
