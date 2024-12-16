import type { Context } from "hono";
import { MasterDataService } from "../services/master-data.service";

export class MasterDataController {
	private masterDataService: MasterDataService;

	constructor() {
		this.masterDataService = new MasterDataService();
	}

	async listMenu(c: Context) {
		try {
			const listMenu = await this.masterDataService.getListMenu();
			return c.json({
				success: true,
				data: listMenu,
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

	async listInstansi(c: Context) {
		try {
			const listInstansi = await this.masterDataService.getListInstansi();
			return c.json({
				success: true,
				data: listInstansi,
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
