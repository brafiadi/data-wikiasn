import type { Context } from "hono";
import { StandarBiayaMasukanService } from "../services/sbm.service";
import { HTTPException } from "hono/http-exception";

export class StandarBiayaMasukanController {
  private standarBiayaMasukanService: StandarBiayaMasukanService;

  constructor() {
    this.standarBiayaMasukanService = new StandarBiayaMasukanService();
  }

  async listStandarBiayaMasukan(c: Context) {
    const listSBM =
      await this.standarBiayaMasukanService.getListStandarBiayaMasukan();
    return c.json({
      success: true,
      data: listSBM,
    });
  }

  async getSBMByIdAndTahun(c: Context) {
    const tahun = c.req.query("tahun");
    const sbmSlug = c.req.query("sbm");

    if (!tahun || !sbmSlug) {
      throw new HTTPException(400, {
        message: "Parameter 'tahun' dan 'sbm' dibutuhkan",
      });
    }

    const sbmInfo = await this.standarBiayaMasukanService.getSBMBySlug(sbmSlug);
    if (!sbmInfo) {
      throw new HTTPException(404, { message: "SBM tidak ditemukan" });
    }
    const { id, judul } = sbmInfo;

    const [penjelasanData, peraturanData, tabelData, sbmData] =
      await Promise.all([
        this.standarBiayaMasukanService.getPenjelasanSBM(tahun, id),
        this.standarBiayaMasukanService.getPeraturanSBM(tahun),
        this.standarBiayaMasukanService.getSBMTabel(id),
        this.standarBiayaMasukanService.getSBMByIdAndTahun(tahun, id),
      ]);

    const info = {
      id: id,
      judul: judul,
      penjelasan: penjelasanData?.penjelasan ?? "",
      peraturan: peraturanData?.nama ?? "",
      tautan: peraturanData?.tautan ?? "",
    };

    return c.json({
      success: true,
      info: info,
      table: tabelData,
      data: sbmData,
    });
  }

  async insertPenjelasanSBM(c: Context) {
    const { tahun, id, penjelasan } = await c.req.json();
    if (!tahun || !id || penjelasan === undefined) {
      throw new HTTPException(400, {
        message: "Parameter 'tahun', 'id', dan 'penjelasan' dibutuhkan",
      });
    }

    const result = await this.standarBiayaMasukanService.insertPenjelasanSBM(
      tahun,
      id,
      penjelasan,
    );

    return c.json(result);
  }

  async editPenjelasanSBM(c: Context) {
    const paramId = c.req.param("id");
    const { penjelasan } = await c.req.json();
    if (penjelasan === undefined) {
      throw new HTTPException(400, {
        message: "Parameter 'penjelasan' dibutuhkan",
      });
    }

    const id = Number.parseInt(paramId);
    const result = await this.standarBiayaMasukanService.editPenjelasanSBM(
      id,
      penjelasan,
    );

    return c.json(result);
  }
}
