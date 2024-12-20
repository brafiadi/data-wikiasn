import type { Context } from "hono";
import { StandarBiayaMasukanService } from "../services/sbm.service";

export class StandarBiayaMasukanController {
	private standarBiayaMasuakanService: StandarBiayaMasukanService;

	constructor() {
		this.standarBiayaMasuakanService = new StandarBiayaMasukanService();
	}

	async listStandarBiayaMasuakn(c: Context) {
		try {
			const listStandarBiayaMasuakn =
				await this.standarBiayaMasuakanService.getListStandarBiayaMasukan();
			return c.json({
				success: true,
				data: listStandarBiayaMasuakn,
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
