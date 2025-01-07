import type { Context } from "hono";
import { sign } from "hono/jwt";
import { AuthService } from "../services/auth.service";

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	async login(c: Context) {
		try {
			const { email } = await c.req.json();

			if (!email) {
				return c.json(
					{
						success: false,
						message: "email dibutuhkan",
					},
					400,
				);
			}

			// Lakukan proses login di sini

			const checkEmail = await this.authService.checkEmail(email);

			if (!checkEmail) {
				return c.json(
					{
						success: false,
						message: "Anda tidak memiliki akses",
					},
					404,
				);
			}

			const role = checkEmail.role;

			const payload = {
				email: email,
				exp: Math.floor(Date.now() / 1000) + 60 * 60,
			};
			const secret = JWT_SECRET;
			if (!secret) {
				throw new Error("JWT_SECRET is not defined");
			}
			const token = await sign(payload, secret);

			const data = {
				email: email,
				role: role,
				token: token,
			};

			return c.json({
				success: true,
				message: "Login berhasil",
				data: data,
			});
		} catch (error) {
			return c.json(
				{
					success: false,
					message:
						error instanceof Error
							? error.message
							: "Terjadi kesalahan tidak dikenal",
				},
				500,
			);
		}
	}
}
