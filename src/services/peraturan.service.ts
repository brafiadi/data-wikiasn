import { PrismaClient } from "@prisma/client";

interface Peraturan {
	id: number;
	nama: string;
	tautan: string;
	tahun: string;
	berlaku: boolean;
	kata_kunci: string[];
}

export class PeraturanService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getListPeraturan() {
		const query = "SELECT * FROM peraturan";

		try {
			const peraturan = await this.prisma.$queryRawUnsafe(query);
			return peraturan;
		} catch (error) {
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
		}
	}

	async getPeraturanById(id: number) {
		const query = `SELECT * FROM peraturan WHERE id = ${id}`;

		try {
			const peraturan: Peraturan[] = await this.prisma.$queryRawUnsafe(query);
			return peraturan[0];
		} catch (error) {
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
		}
	}
}
