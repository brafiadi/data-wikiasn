import type { Context } from "hono";
import { TunjanganKinerjaService } from "../services/tunjangan-kinerja.service";

interface ProfilInstansi {
	instansi_id: number
	tunjangan_kinerja: number
}
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

			const paramSlug = c.req.query("nama")
			const slug = paramSlug ? paramSlug : undefined

			if(!slug){
				return c.json({
					success: false,
					message: "Param nama instansi dibutuhkan"
				})
			}

			const getInstansiPeraturan: ProfilInstansi = await this.tunjanganKinerjaService.getInstansiPeraturanBySlug(slug as string)

			const instansiId = getInstansiPeraturan?.instansi_id ?? undefined
			const peraturanId = getInstansiPeraturan?.tunjangan_kinerja ?? undefined

			const profilInstansi =  	
				await this.tunjanganKinerjaService.getProfilInstansi(instansiId);

			const detailTunjanganKinerja =
				await this.tunjanganKinerjaService.getDetailTunjanganKinerja(
					peraturanId,
				);

			const statistikTunjanganKinerja =
				await this.tunjanganKinerjaService.getStatistikTunjanganKinerja(
					peraturanId,
				);

			const dataDetailTunjanganKinerja = {
				instansi: profilInstansi,
				statistik: statistikTunjanganKinerja,
				tunjangan_kinerja: detailTunjanganKinerja,
			};

			return c.json({
				success: true,
				data: dataDetailTunjanganKinerja,
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
