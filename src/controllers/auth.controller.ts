import type { Context } from "hono";
import { sign } from "hono/jwt";
import { AuthService } from "../services/auth.service";
import { HTTPException } from "hono/http-exception";

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(c: Context) {
    const { email } = await c.req.json();

    if (!email) {
      throw new HTTPException(400, { message: "Email dibutuhkan" });
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      throw new HTTPException(500, { message: "Server configuration error" });
    }

    const user = await this.authService.checkEmail(email);

    if (!user) {
      throw new HTTPException(403, { message: "Anda tidak memiliki akses" });
    }

    const payload = {
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Token berlaku 24 jam
    };

    const token = await sign(payload, JWT_SECRET);

    const data = {
      email: user.email,
      role: user.role,
      token: token,
    };

    return c.json({
      success: true,
      message: "Login berhasil",
      data: data,
    });
  }
}
