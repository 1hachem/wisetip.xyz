/*
  Warnings:

  - You are about to drop the column `downvotes` on the `Tip` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Tip` table. All the data in the column will be lost.
  - You are about to drop the `Interaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_tipId_fkey";

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_userId_fkey";

-- AlterTable
ALTER TABLE "Tip" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";

-- DropTable
DROP TABLE "Interaction";

-- DropEnum
DROP TYPE "InteractionType";

-- CreateTable
CREATE TABLE "Upvote" (
    "tipId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("tipId","userId")
);

-- CreateTable
CREATE TABLE "Downvote" (
    "tipId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Downvote_pkey" PRIMARY KEY ("tipId","userId")
);

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_tipId_fkey" FOREIGN KEY ("tipId") REFERENCES "Tip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_tipId_fkey" FOREIGN KEY ("tipId") REFERENCES "Tip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
