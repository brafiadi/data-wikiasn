import type { Context } from "hono";
import { PeraturanService } from "../services/peraturan.service";

export class PeraturanController {
	private peraturanService: PeraturanService;

	constructor() {
		this.peraturanService = new PeraturanService();
	}

	private handleError(c: Context, error: unknown) {
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

	async listPeraturan(c: Context) {
		try {
			const listPeraturan = await this.peraturanService.getListPeraturan();

			return c.json({
				success: true,
				data: listPeraturan,
			});
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async peraturanById(c: Context) {
		try {
			const paramId = c.req.query("id");
			if (!paramId) {
				return c.json(
					{
						success: false,
						message: "parameter id dibutuhkan",
					},
					400,
				);
			}

			const id = Number.parseInt(paramId);

			const peraturan = await this.peraturanService.getPeraturanById(id);

			return c.json({
				success: true,
				data: peraturan,
			});
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async insertPeraturan(c: Context) {
		try {
			const { nama, tautan, tahun, kata_kunci } = await c.req.json();

			const data = {
				nama: nama,
				tautan: tautan,
				tahun: tahun,
				kata_kunci: kata_kunci,
			};

			const result = await this.peraturanService.insertPeraturan(data);
			return c.json(result);
		} catch (error) {
			return this.handleError(c, error);
		}
	}
}
