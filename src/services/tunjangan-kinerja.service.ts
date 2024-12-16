import { PrismaClient } from "@prisma/client";

export class TunjanganKinerjaService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getProfilInstansi(instansiId: number) {
		const query = `
            SELECT *
            FROM profil_instansi
            WHERE instansi_id = $1
         `;

		const params = [instansiId];

		try {
			const profil = await this.prisma.$queryRawUnsafe(query, ...params);
			return profil;
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
                pt.id as peraturan_id,
                pt.nama as dasar_hukum,
                pt.tautan,
				pt.berlaku
            FROM profil_instansi p
            LEFT JOIN instansi i ON i.id = p.instansi_id
            LEFT JOIN peraturan pt ON p.tunjangan_kinerja = pt.id
			WHERE pt.berlaku = true
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
}
