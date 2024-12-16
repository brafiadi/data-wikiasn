import { PrismaClient } from "@prisma/client";

interface HariLibur {
	nama: string;
	tanggal_mulai: Date;
	tanggal_akhir: Date;
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
		libur: boolean;
		hari_libur: string;
		hari_ini: string;
		pesan: string
	}> {
		const today = new Date();
		const dayOfWeek = today.getDay();

		const hariLiburData = await this.prisma.$queryRaw<HariLibur[]>`
								SELECT hl.nama, hl.tanggal_mulai, hl.tanggal_akhir 
								FROM hari_libur hl
								WHERE hl.tanggal_mulai <= CURRENT_DATE AND hl.tanggal_akhir >= CURRENT_DATE
							`;

		let libur = hariLiburData.length > 0;
		let hari_libur = "";
		let pesan = "Selamat bekerja dan menyelesaikan tugas hari ini"
		let hari_ini = today.toLocaleDateString("id", { weekday:"long", year:"numeric", month:"long", day:"numeric"})

		if (libur) {
			hari_libur = hariLiburData[0].nama;
			pesan = `Selamat berlibur dan semoga harimu menyenangkan`
		} else if (dayOfWeek === 0 || dayOfWeek === 6) {
			libur = true;
			hari_libur = `Hari ${dayOfWeek === 0 ? "Minggu" : "Sabtu"}`;
			pesan = `Selamat berakhir pekan dan semoga harimu menyenangkan`
		}

		return {
			libur,
			hari_libur,
			hari_ini,
			pesan
		};
	}
}
