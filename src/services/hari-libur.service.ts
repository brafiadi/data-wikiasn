import { PrismaClient } from "@prisma/client";

function toISOString(date) {
  return date.toISOString().slice(0, 10);
}

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
			console.error("Gagal mengambil data:", error);
			throw new Error("Gagal mengambil data");
		}
	}

	async getLiburHariIni(): Promise<{
		isHoliday: boolean;
		holidayName: string;
	}> {
		const today = new Date();
		const dayOfWeek = today.getDay();



		const holidayData = await this.prisma.$queryRaw`
								SELECT hl.nama, hl.tanggal_mulai, hl.tanggal_akhir 
								FROM hari_libur hl
								WHERE hl.tanggal_mulai <= CURRENT_DATE AND hl.tanggal_akhir >= CURRENT_DATE
							`;

		let isHoliday = holidayData.length > 0;
		let holidayName = "";

		if (isHoliday) {
			holidayName = holidayData[0].nama_libur;
		} else if (dayOfWeek === 0 || dayOfWeek === 6) {
			isHoliday = true;
			holidayName = `Hari ${dayOfWeek === 0 ? "Minggu" : "Sabtu"}`;
		}

		return {
			isHoliday,
			holidayName,
		};
	}
}
