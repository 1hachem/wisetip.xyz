-- CreateTable
CREATE TABLE "TipSubmission" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "TipSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TipSubmission" ADD CONSTRAINT "TipSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipSubmission" ADD CONSTRAINT "TipSubmission_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
