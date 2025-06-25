import type { Context } from "hono";
import { TunjanganKinerjaService } from "../services/tunjangan-kinerja.service";
import { HTTPException } from "hono/http-exception";

export class TunjanganKinerjaController {
  private tunjanganKinerjaService: TunjanganKinerjaService;

  constructor() {
    this.tunjanganKinerjaService = new TunjanganKinerjaService();
  }

  async listTunjanganKinerja(c: Context) {
    const listTunjanganKinerja =
      await this.tunjanganKinerjaService.getListTunjanganKinerja();
    return c.json({
      success: true,
      data: listTunjanganKinerja,
    });
  }

  async detailTunjanganKinerja(c: Context) {
    const slug = c.req.query("nama");
    if (!slug) {
      throw new HTTPException(400, {
        message: "Param nama instansi dibutuhkan",
      });
    }

    const instansiPeraturan =
      await this.tunjanganKinerjaService.getInstansiPeraturanBySlug(slug);

    if (
      !instansiPeraturan?.instansi_id ||
      !instansiPeraturan?.tunjangan_kinerja
    ) {
      throw new HTTPException(404, { message: "Instansi tidak ditemukan" });
    }

    const [profilInstansi, detailTunjanganKinerja, statistikTunjanganKinerja] =
      await Promise.all([
        this.tunjanganKinerjaService.getProfilInstansi(
          instansiPeraturan.instansi_id,
        ),
        this.tunjanganKinerjaService.getDetailTunjanganKinerja(
          instansiPeraturan.tunjangan_kinerja,
        ),
        this.tunjanganKinerjaService.getStatistikTunjanganKinerja(
          instansiPeraturan.tunjangan_kinerja,
        ),
      ]);

    const dataDetailTunjanganKinerja = {
      instansi: profilInstansi,
      statistik: statistikTunjanganKinerja,
      tunjangan_kinerja: detailTunjanganKinerja,
    };

    return c.json({
      success: true,
      data: dataDetailTunjanganKinerja,
    });
  }
}
