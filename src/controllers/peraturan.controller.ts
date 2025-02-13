import type { Context } from "hono";
import { PeraturanService } from "../services/peraturan.service";

interface Peraturan {
	id: number;
	nama: string;
	tautan: string;
	tahun: string;
	berlaku: boolean;
	kata_kunci: string[];
	slug: string;
	kategori: string;
	tanggal_pengesahan: Date;
}

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

			// // menambahkan link
			// const listPeraturanWithLink = listPeraturan.map((peraturan: any) => ({
			// 	...peraturan,
			// 	link: slugify(peraturan.nama, { lower: true, strict: true }),
			// }));

			return c.json({
				success: true,
				data: listPeraturan,
			});
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async detailPeraturan(c: Context) {
		try {
			const paramId = c.req.query("id");
			const paramLink = c.req.query("link");
			if (!paramId && !paramLink) {
				return c.json(
					{
						success: false,
						message: "parameter dibutuhkan",
					},
					400,
				);
			}

			let peraturan: Peraturan | null = null; // Initialize with a default value and type

			if (paramId) {
				const id = paramId ? Number.parseInt(paramId) : 0;
				peraturan = await this.peraturanService.getPeraturanById(id);
			} else if (paramLink) {
				// Changed to else if since we only want one condition to execute
				const slug = paramLink;
				peraturan = await this.peraturanService.getPeraturanBySlug(slug);
			}

			if (!peraturan) {
				// Add check for null/undefined
				return c.json({
					success: false,
					message: "Peraturan not found",
					status: 404,
				});
			}

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
			const {
				nama,
				tautan,
				tahun,
				kata_kunci,
				slug,
				kategori,
				tanggal_pengesahan,
			} = await c.req.json();

			const data = {
				nama,
				tautan,
				tahun,
				kata_kunci,
				slug,
				kategori,
				tanggal_pengesahan,
			};

			// console.log(data);

			const result = await this.peraturanService.insertPeraturan(data);
			return c.json(result);
		} catch (error) {
			return this.handleError(c, error);
		}
	}
}
