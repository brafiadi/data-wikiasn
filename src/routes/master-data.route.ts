import { Hono } from "hono";
import { MasterDataController } from "../controllers/master-data.controller";

export const masterDataRoute = new Hono();
const masterDataController = new MasterDataController();

masterDataRoute.get("/menu", (c) => masterDataController.listMenu(c));
masterDataRoute.get("/instansi", (c) => masterDataController.listInstansi(c));
