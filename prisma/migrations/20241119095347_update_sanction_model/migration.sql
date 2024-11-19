/*
  Warnings:

  - The primary key for the `Sanction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `Sanction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sanction" DROP CONSTRAINT "Sanction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sanction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sanction_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Sanction_userId_key" ON "Sanction"("userId");
