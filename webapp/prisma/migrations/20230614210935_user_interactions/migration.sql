/*
  Warnings:

  - Added the required column `userId` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
