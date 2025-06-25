import prisma from "../lib/prisma";

interface Statistik {
  min: number;
  median: number;
  mean: number;
  max: number;
}

export class TunjanganKinerjaService {
  async getInstansiPeraturanBySlug(slug: string) {
    try {
      const instansi = await prisma.instansi.findUnique({
        where: { slug: slug },
        include: {
          profil: true,
        },
      });
      return instansi?.profil;
    } catch (error) {
      console.error("Gagal mengambil data instansi by slug:", error);
      throw new Error("Gagal mengambil data instansi by slug");
    }
  }

  async getProfilInstansi(instansiId: number) {
    const query = `
            SELECT
                p.instansi_id as id,
                i.nama,
                pt.nama as dasar_hukum,
                pt.tautan
            FROM profil_instansi p
            LEFT JOIN instansi i ON i.id = p.instansi_id
            LEFT JOIN peraturan pt ON p.tunjangan_kinerja = pt.id
			WHERE pt.berlaku = true AND i.id = $1
         `;

    const params = [instansiId];

    try {
      const profil = await prisma.$queryRawUnsafe<
        {
          id: number;
          nama: string;
          dasar_hukum: string;
          tautan: string;
        }[]
      >(query, ...params);
      return profil[0];
    } catch (error) {
      console.error("Gagal mengambil data profil instansi:", error);
      throw new Error("Gagal mengambil data profil instansi");
    }
  }

  async getListTunjanganKinerja() {
    const query = `
            SELECT 
				p.instansi_id,
				i.nama,
				i.slug,
				pt.id AS peraturan_id,
				pt.nama AS dasar_hukum,
				pt.tautan,
				pt.berlaku,
				stats.min,
				stats.median,
				stats.mean,
				stats.max
			FROM profil_instansi p
			LEFT JOIN instansi i ON i.id = p.instansi_id
			LEFT JOIN peraturan pt ON p.tunjangan_kinerja = pt.id
			LEFT JOIN (
				SELECT 
					peraturan_id,
					MIN(besaran) AS min,
					PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY besaran) AS median,
					CAST(ROUND(AVG(besaran)) AS INT) AS mean,
					MAX(besaran) AS max
				FROM tunjangan_kinerja
				GROUP BY peraturan_id
			) stats ON stats.peraturan_id = pt.id
			WHERE pt.berlaku = true
			ORDER BY median DESC;
        `;

    try {
      const data = await prisma.$queryRawUnsafe(query);
      return data;
    } catch (error) {
      console.error("Gagal mengambil data list tunjangan kinerja:", error);
      throw new Error("Gagal mengambil data list tunjangan kinerja");
    }
  }

  async getDetailTunjanganKinerja(peraturanId: number) {
    try {
      return await prisma.tunjangan_kinerja.findMany({
        where: { peraturan_id: peraturanId },
        select: {
          id: true,
          kelas_jabatan: true,
          besaran: true,
        },
      });
    } catch (error) {
      console.error("Gagal mengambil data detail tunjangan kinerja:", error);
      throw new Error("Gagal mengambil data detail tunjangan kinerja");
    }
  }

  async getStatistikTunjanganKinerja(peraturanId: number) {
    const query = `
			SELECT 
				MIN(besaran) AS min,
				PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY besaran) AS median,
				CAST(ROUND(AVG(besaran)) AS INT) AS mean,
				MAX(besaran) AS max
			FROM tunjangan_kinerja
			WHERE peraturan_id = $1;
		`;

    const params = [peraturanId];

    try {
      const data = await prisma.$queryRawUnsafe<Statistik[]>(query, ...params);
      return data[0];
    } catch (error) {
      console.error("Gagal mengambil data statistik tunjangan kinerja:", error);
      throw new Error("Gagal mengambil data statistik tunjangan kinerja");
    }
  }
}
