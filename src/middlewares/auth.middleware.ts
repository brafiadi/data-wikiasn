import type { Context, Next } from "hono";
import { jwt } from "hono/jwt";
import { HTTPException } from "hono/http-exception";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined");
}

export const authMiddleware = async (c: Context, next: Next) => {
	const authHeader = c.req.header("Authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return c.json(
			{
				success: false,
				message: "Token tidak ditemukan",
			},
			401,
		);
	}

	try {
		const token = authHeader.split(" ")[1];
		// Menggunakan jwt sebagai middleware dengan options
		const jwtMiddleware = jwt({
			secret: JWT_SECRET,
		});

		// Menerapkan middleware JWT
		await jwtMiddleware(c, async () => {
			// Mengakses payload JWT yang sudah diverifikasi
			const payload = c.get("jwtPayload");
			c.set("user", payload);
		});

		await next();
	} catch (error) {
		if (error instanceof HTTPException) {
			return c.json(
				{
					success: false,
					message: "Token tidak valid",
				},
				401,
			);
		}

		return c.json(
			{
				success: false,
				message: "Terjadi kesalahan pada autentikasi",
			},
			500,
		);
	}
};
