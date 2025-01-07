import { PrismaClient } from "@prisma/client";

export class AuthService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async checkEmail(email: string) {
		// console.log("Checking email:", email);
		const query = `
			SELECT email, nama, avatar, role 
			FROM users
			WHERE email = $1
		`;

		const data = await this.prisma.$queryRawUnsafe(query, email);
		return data[0];
	}
}
