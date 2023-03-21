-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'CREATOR';

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "price" INTEGER NOT NULL,
    "coverUrl" VARCHAR(1000),
    "imageUrl" TEXT[],
    "videoUrl" VARCHAR(1000),
    "trailerUrl" VARCHAR(1000),
    "budget" BIGINT NOT NULL,
    "revenue" BIGINT NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "voteAverage" DOUBLE PRECISION NOT NULL,
    "releaseStatus" BOOLEAN NOT NULL,
    "release_date" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "personName" TEXT NOT NULL,
    "personGender" "Gender",

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToProductionCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Movie_title_idx" ON "Movie"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToProductionCompany_AB_unique" ON "_MovieToProductionCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToProductionCompany_B_index" ON "_MovieToProductionCompany"("B");

-- AddForeignKey
ALTER TABLE "_MovieToProductionCompany" ADD CONSTRAINT "_MovieToProductionCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToProductionCompany" ADD CONSTRAINT "_MovieToProductionCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
