-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "Interaction" (
    "id" SERIAL NOT NULL,
    "type" "InteractionType" NOT NULL,
    "tipId" TEXT NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_tipId_fkey" FOREIGN KEY ("tipId") REFERENCES "Tip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
