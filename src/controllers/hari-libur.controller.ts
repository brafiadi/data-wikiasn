import type { Context } from "hono";
import { HariLiburService } from "../services/hari-libur.service";

export class HariLiburController {
	private hariLiburService: HariLiburService;

	constructor() {
		this.hariLiburService = new HariLiburService();
	}

	async listHariLibur(c: Context) {
		try {
			const paramTahun = c.req.query("tahun");
			const tahun = paramTahun ? Number.parseInt(paramTahun) : undefined;

			const listHariLibur = await this.hariLiburService.getListHariLibur(tahun);

			return c.json({
				success: true,
				data: listHariLibur,
			});
		} catch (error) {
			return c.json(
				{
					success: false,
					message:
						error instanceof Error
							? error.message
							: "Terjadi kesalahan tidak dikenal",
				},
				500,
			);
		}
	}

	async liburHariIni(c: Context) {
		try {
			const liburHariIni = await this.hariLiburService.getLiburHariIni();

			return c.json({
				success: true,
				data: liburHariIni,
			});
		} catch (error) {
			return c.json(
				{
					success: false,
					message:
						error instanceof Error
							? error.message
							: "Terjadi kesalahan tidak dikenal",
				},
				500,
			);
		}
	}
}
