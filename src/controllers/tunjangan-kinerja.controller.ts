import type { Context } from "hono";
import { TunjanganKinerjaService } from "../services/tunjangan-kinerja.service";


export class TunjanganKinerjaController {
	private tunjanganKinerjaService: TunjanganKinerjaService;

	constructor() {
		this.tunjanganKinerjaService = new TunjanganKinerjaService();
	}

	

	async listTunjanganKinerja(c: Context) {
		try {
			const listTunjanganKinerja =
				await this.tunjanganKinerjaService.getListTunjanganKinerja();
			return c.json({
				success: true,
				data: listTunjanganKinerja,
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

	async detailTunjanganKinerja(c: Context) {
		try {
			const paramPeraturanId = c.req.query("peraturan");
			const peraturanId = paramPeraturanId
				? Number.parseInt(paramPeraturanId)
				: undefined;

			if (!peraturanId) {
				return c.json({
					success: false,
					message: "Param peraturan id dibutuhkan",
				});
			}

			const detailTunjanganKinerja =
				await this.tunjanganKinerjaService.getDetailTunjanganKinerja(
					peraturanId,
				);

				console.log(detailTunjanganKinerja)

			return c.json({
				success: true,
				data: detailTunjanganKinerja,
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
