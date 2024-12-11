-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "menu" TEXT NOT NULL,
    "deskripsi" TEXT,
    "link" TEXT NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);
