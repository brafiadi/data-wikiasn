import { Hono } from "hono";
import { PeraturanController } from "../controllers/peraturan.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const peraturanRoute = new Hono();
const peraturanController = new PeraturanController();

peraturanRoute.get("/", (c) => peraturanController.listPeraturan(c));
peraturanRoute.get("/data", (c) => peraturanController.detailPeraturan(c));
peraturanRoute.post("/", authMiddleware, (c) =>
	peraturanController.insertPeraturan(c),
);
