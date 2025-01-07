import { Hono } from "hono";
import { StandarBiayaMasukanController } from "../controllers/sbm.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const standarBiayaMasuaknRoute = new Hono();
const standarBiayaMasukanController = new StandarBiayaMasukanController();

standarBiayaMasuaknRoute.get("/", (c) =>
	standarBiayaMasukanController.listStandarBiayaMasuakn(c),
);
standarBiayaMasuaknRoute.get("/data", (c) =>
	standarBiayaMasukanController.getSBMByIdAndTahun(c),
);
standarBiayaMasuaknRoute.post("/tes", authMiddleware, (c) => {
	return c.json({ success: true, message: "Autentikasi berhasil" });
});
