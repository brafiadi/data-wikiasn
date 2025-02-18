import { PrismaClient } from "@prisma/client";
import type {
	InsertPeraturanData,
	Peraturan,
	UpdatePeraturanData,
} from "../types/peraturan";

export class PeraturanService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async getListPeraturan() {
		const query = `
      SELECT *
      FROM peraturan
     ORDER BY 
      CASE kategori
        WHEN 'Ketetapan Majelis Permusyawaratan Rakyat' THEN 1
        WHEN 'Undang-Undang' THEN 2
        WHEN 'Undang-Undang Darurat' THEN 3
        WHEN 'Peraturan Pemerintah Pengganti Undang-Undang' THEN 4
        WHEN 'Peraturan Pemerintah' THEN 5
        WHEN 'Peraturan Presiden' THEN 6
        WHEN 'Penetapan Presiden' THEN 7
        WHEN 'Keputusan Presiden' THEN 8
        WHEN 'Instruksi Presiden' THEN 9
        WHEN 'Peraturan Menteri' THEN 10
        WHEN 'Keputusan Menteri' THEN 11
        WHEN 'Peraturan Badan/Lembaga' THEN 12
        WHEN 'Peraturan Daerah' THEN 13
        ELSE 14
      END,
      tanggal_pengesahan DESC
    `;

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

	async getPeraturanBySlug(slug: string) {
		const query = "SELECT * FROM peraturan WHERE slug = $1";

		const params = [slug];

		try {
			const peraturan: Peraturan[] = await this.prisma.$queryRawUnsafe(
				query,
				...params,
			);
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
        INSERT INTO peraturan (nama, tautan, tahun, berlaku, kata_kunci, slug, kategori, tanggal_pengesahan)
        VALUES ($1, $2, $3, $4, ARRAY[${kataKunciArray.join(",")}], $5, $6::kategori_peraturan, $7::timestamp);
    `;

		const params = [
			data.nama,
			data.tautan,
			data.tahun,
			berlakuValue,
			data.slug,
			data.kategori,
			data.tanggal_pengesahan,
		];

		// console.log("Query:", query); // Debugging query
		// console.log("Params:", params); // Debugging parameters
		await this.prisma.$queryRawUnsafe(query, ...params);
		return { succes: true, message: "Data berhasil ditambahkan", data: data };
	}

	async updatePeraturan(id: number, data: UpdatePeraturanData) {
		const kataKunciArray = data.kata_kunci.map((item: string) =>
			item.replace(/'/g, ""),
		);
		const query = `
      UPDATE peraturan
      SET 
        nama = $1,
        tautan = $2,
        tahun = $3,
        berlaku = $4,
        kata_kunci = string_to_array($5, ','),
        slug = $6,
        kategori = $7::kategori_peraturan,
        tanggal_pengesahan = $8::timestamp
      WHERE id = $9
    `;
		const formattedKataKunci = kataKunciArray.join(",");
		const params = [
			data.nama,
			data.tautan,
			data.tahun,
			data.berlaku,
			formattedKataKunci,
			data.slug,
			data.kategori,
			data.tanggal_pengesahan,
			id,
		];

		// console.log(query);

		await this.prisma.$queryRawUnsafe(query, ...params);

		// Fetch updated data
		const updatedData = await this.prisma.$queryRaw`
      SELECT * FROM peraturan WHERE id = ${id}
    `;

		return {
			success: true,
			message: "Data berhasil diperbarui",
			data: updatedData[0],
		};
	}
}
