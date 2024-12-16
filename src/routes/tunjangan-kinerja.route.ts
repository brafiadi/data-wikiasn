import { Hono } from "hono";
import { TunjanganKinerjaController } from "../controllers/tunjangan-kinerja.controller";

export const tunjanganKinerjaRoute = new Hono();
const tunjanganKinerjaController = new TunjanganKinerjaController();

tunjanganKinerjaRoute.get("/", (c) =>
	tunjanganKinerjaController.listTunjanganKinerja(c),
);
tunjanganKinerjaRoute.get("/instansi", (c) =>
	tunjanganKinerjaController.detailTunjanganKinerja(c),
);
