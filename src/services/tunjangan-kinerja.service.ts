import { PrismaClient } from "@prisma/client";

interface ProfilInstansi {
	id: number;
	nama: string;
	dasar_hukum: string;
	tautan: string;
}

interface Statistik {
	min: number,
	median: number,
	mean: number,
	max: number
}

interface ProfilInstansi {
	instansi_id: number
	tunjangan_kinerja: number
}
export class TunjanganKinerjaService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getInstansiPeraturanBySlug(slug: string) {
		const query = `
			SELECT 
				p.instansi_id,
				p.tunjangan_kinerja
				FROM profil_instansi p
			JOIN instansi i ON p.instansi_id = i.id
			WHERE i.slug = $1;
		`
		const params = [slug];

		try {
			const data = await this.prisma.$queryRawUnsafe<ProfilInstansi[]>(
				query,
				...params,
			);
			return data[0];
		} catch (error) {
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
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
			const profil = await this.prisma.$queryRawUnsafe<ProfilInstansi[]>(
				query,
				...params,
			);
			return profil[0];
		} catch (error) {
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
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
			const data = await this.prisma.$queryRawUnsafe(query);
			return data;
		} catch (error) {
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
		}
	}

	async getDetailTunjanganKinerja(peraturanId: number) {
		const query = `
			SELECT id, kelas_jabatan, besaran
			FROM tunjangan_kinerja
			WHERE peraturan_id = $1
		`;

		const params = [peraturanId];

		try {
			const data = await this.prisma.$queryRawUnsafe(query, ...params);
			return data;
		} catch (error) {
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
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

		const data = await this.prisma.$queryRawUnsafe<Statistik[]>(query, ...params);
		return data[0];
	}
}
