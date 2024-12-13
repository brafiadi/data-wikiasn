import { Hono } from "hono";
import { HariLiburController } from "../controllers/hari-libur.controller";

export const hariLiburRoute = new Hono();
const hariLiburController = new HariLiburController();

hariLiburRoute.get("/", (c) => hariLiburController.listHariLibur(c));
hariLiburRoute.get("/hari-ini", (c) => hariLiburController.liburHariIni(c));
