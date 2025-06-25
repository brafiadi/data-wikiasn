import type { Context } from "hono";
import { PeraturanService } from "../services/peraturan.service";
import type { UpdatePeraturanData } from "../types/peraturan";
import { HTTPException } from "hono/http-exception";

export class PeraturanController {
  private peraturanService: PeraturanService;

  constructor() {
    this.peraturanService = new PeraturanService();
  }

  async listPeraturan(c: Context) {
    const listPeraturan = await this.peraturanService.getListPeraturan();
    return c.json({
      success: true,
      data: listPeraturan,
    });
  }

  async detailPeraturan(c: Context) {
    const paramId = c.req.query("id");
    const paramLink = c.req.query("link");
    if (!paramId && !paramLink) {
      throw new HTTPException(400, { message: "parameter dibutuhkan" });
    }

    let peraturan = null;

    if (paramId) {
      const id = Number.parseInt(paramId);
      peraturan = await this.peraturanService.getPeraturanById(id);
    } else if (paramLink) {
      const slug = paramLink;
      peraturan = await this.peraturanService.getPeraturanBySlug(slug);
    }

    if (!peraturan) {
      throw new HTTPException(404, { message: "Peraturan not found" });
    }

    return c.json({
      success: true,
      data: peraturan,
    });
  }

  async insertPeraturan(c: Context) {
    const data = await c.req.json();
    const result = await this.peraturanService.insertPeraturan(data);
    return c.json(result);
  }

  async editPeraturan(c: Context) {
    const paramId = c.req.param("id");
    const data: UpdatePeraturanData = await c.req.json();
    const id = Number.parseInt(paramId);

    const result = await this.peraturanService.updatePeraturan(id, data);
    return c.json(result);
  }
}
