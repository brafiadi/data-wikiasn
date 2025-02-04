import { PrismaClient } from "@prisma/client";

interface Peraturan {
	id: number;
	nama: string;
	tautan: string;
	tahun: string;
	berlaku: boolean;
	kata_kunci: string[];
}

interface InsertPeraturanData {
	nama: string;
	tautan: string;
	tahun: string;
	berlaku?: boolean;
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

	async insertPeraturan(data: InsertPeraturanData) {
		// Set default value for `berlaku` if not provided
		const berlakuValue = data.berlaku !== undefined ? data.berlaku : true;
		// Tambahkan tanda kutip tunggal ke setiap elemen array
		const kataKunciArray = data.kata_kunci.map(
			(item: string) => `'${item.replace(/'/g, "''")}'`, // Escaping single quotes
		);

		const query = `
        INSERT INTO peraturan (nama, tautan, tahun, berlaku, kata_kunci)
        VALUES ($1, $2, $3, $4, ARRAY[${kataKunciArray.join(",")}]);
    `;

		const params = [data.nama, data.tautan, data.tahun, berlakuValue];

		// console.log("Query:", query); // Debugging query
		// console.log("Params:", params); // Debugging parameters
		await this.prisma.$queryRawUnsafe(query, ...params);
		return { succes: true, message: "Data berhasil ditambahkan", data: data };
	}
}
