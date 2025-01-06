import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";

export const authRoute = new Hono();
const authController = new AuthController();

authRoute.post("/login", (c) => authController.login(c));
