import type { Context } from "hono";
import { MasterDataService } from "../services/master-data.service";

export class MasterDataController {
  private masterDataService: MasterDataService;

  constructor() {
    this.masterDataService = new MasterDataService();
  }

  async listMenu(c: Context) {
    const listMenu = await this.masterDataService.getListMenu();
    return c.json({
      success: true,
      data: listMenu,
    });
  }

  async listInstansi(c: Context) {
    const listInstansi = await this.masterDataService.getListInstansi();
    return c.json({
      success: true,
      data: listInstansi,
    });
  }
}
