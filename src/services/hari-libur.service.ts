import { PrismaClient } from "@prisma/client";

export class HariLiburService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getListHariLibur(tahun?: number) {
		const query = tahun
			? `SELECT * FROM "hari_libur" WHERE tahun = $1 ORDER BY tanggal_mulai`
			: `SELECT * FROM "hari_libur" ORDER BY tanggal_mulai`;

		const params = tahun ? [tahun] : [];

		try {
			const hariLibur = await this.prisma.$queryRawUnsafe(query, ...params);
			return hariLibur;
		} catch (error) {
			console.error("Gagal mengambil daftar libur:", error);
			throw new Error("Gagal mengambil daftar libur");
		}
	}
}
