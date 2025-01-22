import { Hono } from "hono";
import { StandarBiayaMasukanController } from "../controllers/sbm.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const standarBiayaMasukanRoute = new Hono();
const standarBiayaMasukanController = new StandarBiayaMasukanController();

standarBiayaMasukanRoute.get("/", (c) =>
	standarBiayaMasukanController.listStandarBiayaMasuakn(c),
);
standarBiayaMasukanRoute.get("/data", (c) =>
	standarBiayaMasukanController.getSBMByIdAndTahun(c),
);
standarBiayaMasukanRoute.post("/penjelasan", authMiddleware, (c) =>
	standarBiayaMasukanController.insertPenjelasanSBM(c),
);
standarBiayaMasukanRoute.put("/penjelasan/:id", authMiddleware, (c) =>
	standarBiayaMasukanController.editPenjelasanSBM(c),
);

//tes
standarBiayaMasukanRoute.post("/tes", authMiddleware, (c) => {
	return c.json({ success: true, message: "Autentikasi berhasil" });
});
