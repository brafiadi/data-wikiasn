import { PrismaClient } from "@prisma/client";

export class StandarBiayaMasukanService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getListStandarBiayaMasukan() {
		const query =
			"SELECT id, judul, jenis, link FROM standar_biaya_masukan ORDER BY id";

		const data = await this.prisma.$queryRawUnsafe(query);
		return data;
	}
}
