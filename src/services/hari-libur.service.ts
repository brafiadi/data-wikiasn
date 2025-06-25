import prisma from "../lib/prisma";

export class HariLiburService {
  async getListHariLibur(tahun?: number) {
    try {
      const whereClause = tahun ? { tahun: tahun } : {};
      const hariLibur = await prisma.hari_libur.findMany({
        where: whereClause,
        orderBy: {
          tanggal_mulai: "asc",
        },
      });
      return hariLibur;
    } catch (error) {
      console.error("Gagal mengambil data hari libur:", error);
      throw new Error("Gagal mengambil data hari libur");
    }
  }

  async getLiburHariIni() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    try {
      const hariLiburData = await prisma.hari_libur.findFirst({
        where: {
          tanggal_mulai: { lte: today },
          tanggal_akhir: { gte: today },
        },
      });

      let libur = hariLiburData !== null;
      let namaHariLibur = "";
      let pesan = "Selamat bekerja dan menyelesaikan tugas hari ini";
      const hari_ini = today.toLocaleDateString("id", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (libur && hariLiburData) {
        namaHariLibur = hariLiburData.nama;
        pesan = "Selamat berlibur dan semoga harimu menyenangkan";
      } else if (dayOfWeek === 0 || dayOfWeek === 6) {
        libur = true;
        namaHariLibur = `Hari ${dayOfWeek === 0 ? "Minggu" : "Sabtu"}`;
        pesan = "Selamat berakhir pekan dan semoga harimu menyenangkan";
      }

      return {
        libur,
        hari_libur: namaHariLibur,
        hari_ini,
        pesan,
      };
    } catch (error) {
      console.error("Gagal memeriksa hari libur:", error);
      throw new Error("Gagal memeriksa apakah hari ini libur");
    }
  }
}
