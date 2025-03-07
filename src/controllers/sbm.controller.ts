import type { Context } from "hono";
import { StandarBiayaMasukanService } from "../services/sbm.service";

export class StandarBiayaMasukanController {
	private standarBiayaMasuakanService: StandarBiayaMasukanService;

	constructor() {
		this.standarBiayaMasuakanService = new StandarBiayaMasukanService();
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

	async listStandarBiayaMasuakn(c: Context) {
		try {
			const listStandarBiayaMasuakn =
				await this.standarBiayaMasuakanService.getListStandarBiayaMasukan();
			return c.json({
				success: true,
				data: listStandarBiayaMasuakn,
			});
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async getSBMByIdAndTahun(c: Context) {
		try {
			const paramTahun = c.req.query("tahun");
			const paramSbm = c.req.query("sbm");

			const tahun = paramTahun ? paramTahun : undefined;
			const sbm = paramSbm ? paramSbm : undefined;

			if (!tahun) {
				return c.json({
					success: false,
					message: "Param tahun dibutuhkan",
				});
			}
			if (!sbm) {
				return c.json({
					success: false,
					message: "Param sbm dibutuhkan",
				});
			}

			// console.log(sbm)

			const sbmId = await this.standarBiayaMasuakanService.getSBMIdBySLug(sbm);

			const id = sbmId.id;

			// console.log(sbmId)

			const penjelasanData =
				await this.standarBiayaMasuakanService.getPenjelasanSBM(tahun, id);

			// console.log(penjelasanData)

			const peraturanData =
				await this.standarBiayaMasuakanService.getPeraturanSBM(tahun);

			const judulSBM =
				await this.standarBiayaMasuakanService.getJudulSBMById(id);

			const info = {
				id: id,
				judul: judulSBM.judul ? judulSBM.judul : "",
				penjelasan: penjelasanData ? penjelasanData.penjelasan : "",
				peraturan: peraturanData.nama,
				tautan: peraturanData.tautan,
			};

			const tabelData = await this.standarBiayaMasuakanService.getSBMTabel(id);

			const sbmData = await this.standarBiayaMasuakanService.getSBMByIdAndTahun(
				tahun,
				id,
			);
			return c.json({
				success: true,
				info: info,
				table: tabelData,
				data: sbmData,
			});
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async insertPenjelasanSBM(c: Context) {
		try {
			const { tahun, id, penjelasan } = await c.req.json();

			const result = await this.standarBiayaMasuakanService.insertPenjelasanSBM(
				tahun,
				id,
				penjelasan,
			);

			return c.json(result);
		} catch (error) {
			return this.handleError(c, error);
		}
	}

	async editPenjelasanSBM(c: Context) {
		try {
			const paramId = c.req.param("id");
			const { penjelasan } = await c.req.json();

			const id = Number.parseInt(paramId);

			const result = await this.standarBiayaMasuakanService.editPenjelasanSBM(
				id,
				penjelasan,
			);

			return c.json(result);
		} catch (error) {
			return this.handleError(c, error);
		}
	}
}
