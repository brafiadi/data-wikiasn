import prisma from "../lib/prisma";

export class StandarBiayaMasukanService {
  async getListStandarBiayaMasukan() {
    return prisma.standar_biaya_masukan.findMany({
      select: { id: true, judul: true, jenis: true, link: true },
      orderBy: { id: "asc" },
    });
  }

  async getSBMBySlug(slug: string) {
    return prisma.standar_biaya_masukan.findUnique({
      where: { link: slug },
      select: { id: true, judul: true },
    });
  }

  async getSBMByIdAndTahun(tahun: string, id: number) {
    return prisma.standar_biaya_masukan_uraian.findMany({
      where: {
        standar_biaya_masukan_id: id,
        biaya: {
          some: {
            tahun: tahun,
          },
        },
      },
      include: {
        kategori: true,
        sub_kategori: true,
        biaya: {
          where: {
            tahun: tahun,
          },
        },
      },
    });
  }

  async getSBMTabel(id: number) {
    return prisma.standar_biaya_masukan_tabel.findFirst({
      where: { standar_biaya_masukan_id: id },
      select: {
        kolom_kategori: true,
        kolom_uraian: true,
        kolom_satuan: true,
        kolom_1: true,
        kolom_2: true,
        kolom_3: true,
        kolom_4: true,
        kolom_5: true,
      },
    });
  }

  async getPenjelasanSBM(tahun: string, sbmId: number) {
    return prisma.standar_biaya_masukan_penjelasan.findFirst({
      where: {
        tahun: tahun,
        standar_biaya_masukan_id: sbmId,
      },
      select: {
        penjelasan: true,
      },
    });
  }

  async getPeraturanSBM(tahun: string) {
    return prisma.peraturan.findFirst({
      where: {
        nama: {
          contains: `Standar Biaya Masukan ${tahun}`,
          mode: "insensitive",
        },
      },
    });
  }

  async insertPenjelasanSBM(tahun: string, sbmId: number, penjelasan: string) {
    const newPenjelasan = await prisma.standar_biaya_masukan_penjelasan.create({
      data: {
        tahun: tahun,
        standar_biaya_masukan_id: sbmId,
        penjelasan: penjelasan,
      },
    });
    return {
      success: true,
      message: "Data berhasil ditambahkan",
      data: newPenjelasan,
    };
  }

  async editPenjelasanSBM(id: number, penjelasan: string) {
    const updatedPenjelasan =
      await prisma.standar_biaya_masukan_penjelasan.update({
        where: { id: id },
        data: { penjelasan: penjelasan },
      });
    return {
      success: true,
      message: "Data berhasil diperbarui",
      data: updatedPenjelasan,
    };
  }
}
