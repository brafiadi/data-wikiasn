import prisma from "../lib/prisma";

export class MasterDataService {
  async getListMenu() {
    try {
      return await prisma.menu.findMany({
        orderBy: {
          aktif: "desc",
        },
      });
    } catch (error) {
      console.error("Gagal mengambil data menu:", error);
      throw new Error("Gagal mengambil data menu");
    }
  }

  async getListInstansi() {
    try {
      return await prisma.instansi.findMany({
        orderBy: {
          nama: "asc",
        },
      });
    } catch (error) {
      console.error("Gagal mengambil data instansi:", error);
      throw new Error("Gagal mengambil data instansi");
    }
  }
}
