import prisma from "../lib/prisma";

export class AuthService {
  async checkEmail(email: string) {
    try {
      return await prisma.users.findUnique({
        where: { email: email },
        select: {
          email: true,
          nama: true,
          avatar: true,
          role: true,
        },
      });
    } catch (error) {
      console.error("Gagal memeriksa email:", error);
      throw new Error("Gagal memeriksa email");
    }
  }
}
