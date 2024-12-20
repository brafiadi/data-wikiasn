import { Hono } from "hono";
import { StandarBiayaMasukanController } from "../controllers/sbm.controller";

export const standarBiayaMasuaknRoute = new Hono();
const standarBiayaMasukanController = new StandarBiayaMasukanController();

standarBiayaMasuaknRoute.get("/", (c) =>
	standarBiayaMasukanController.listStandarBiayaMasuakn(c),
);
