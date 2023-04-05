/*
  Warnings:

  - You are about to drop the column `movieCrewId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `characterName` on the `MovieCast` table. All the data in the column will be lost.
  - You are about to drop the column `personGender` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `personName` on the `Person` table. All the data in the column will be lost.
  - Added the required column `name` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_movieCrewId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_genreId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "movieCrewId";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "genreId";

-- AlterTable
ALTER TABLE "MovieCast" DROP COLUMN "characterName",
ADD COLUMN     "character" TEXT;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "personGender",
DROP COLUMN "personName",
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON "_GenreToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
