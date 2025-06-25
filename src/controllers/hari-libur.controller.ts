import type { Context } from "hono";
import { HariLiburService } from "../services/hari-libur.service";

export class HariLiburController {
  private hariLiburService: HariLiburService;

  constructor() {
    this.hariLiburService = new HariLiburService();
  }

  async listHariLibur(c: Context) {
    const paramTahun = c.req.query("tahun");
    const tahun = paramTahun ? Number.parseInt(paramTahun) : undefined;

    const listHariLibur = await this.hariLiburService.getListHariLibur(tahun);

    return c.json({
      success: true,
      data: listHariLibur,
    });
  }

  async liburHariIni(c: Context) {
    const liburHariIni = await this.hariLiburService.getLiburHariIni();

    return c.json({
      success: true,
      data: liburHariIni,
    });
  }
}
