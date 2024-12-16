import { PrismaClient } from "@prisma/client";

export class MasterDataService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getListMenu() {
		const query = "SELECT * FROM menu";

		try {
			const menu = await this.prisma.$queryRawUnsafe(query);
			return menu;
		} catch (error) {
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
		}
	}

	async getListInstansi() {
		const query = "SELECT * FROM instansi";

		try {
			const data = await this.prisma.$queryRawUnsafe(query);
			return data;
		} catch (error) {
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
		}
	}
}
