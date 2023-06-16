-- CreateTable
CREATE TABLE "Interested" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Interested_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interested_userId_key" ON "Interested"("userId");

-- AddForeignKey
ALTER TABLE "Interested" ADD CONSTRAINT "Interested_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
