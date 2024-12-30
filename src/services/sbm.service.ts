import { PrismaClient } from "@prisma/client";
import { selectSBMByTahun } from "@prisma/client/sql";
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

	async getSBMIdBySLug(sbm: string){
		const query = `
			SELECT id
			FROM standar_biaya_masukan
			WHERE link = '${sbm}'
			
		`
		const data = await this.prisma.$queryRawUnsafe(query)
		return data[0]
	}

	async getSBMByIdAndTahun(tahun: string, id: number) {
		const data = await this.prisma.$queryRawTyped(selectSBMByTahun(tahun, id));
		return data;
	}

	async getSBMTabel(id: number) {
		const query = `
			SELECT kolom_uraian, kolom_satuan, kolom_1, kolom_2, kolom_3, kolom_4, kolom_5 
			FROM standar_biaya_masukan_tabel 
			WHERE standar_biaya_masukan_id = ${id}
		`;
		const data = await this.prisma.$queryRawUnsafe(query);
		return data[0];
	}
}
