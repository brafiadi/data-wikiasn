import { Hono } from "hono";
import { PeraturanController } from "../controllers/peraturan.controller";

export const peraturanRoute = new Hono();
const peraturanController = new PeraturanController();

peraturanRoute.get("/", (c) => peraturanController.listPeraturan(c));
peraturanRoute.get("/data", (c) => peraturanController.peraturanById(c));
