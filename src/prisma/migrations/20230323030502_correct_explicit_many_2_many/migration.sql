/*
  Warnings:

  - The primary key for the `MovieProductionCompany` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MovieProductionCompany` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `MovieProductionCompany` table. All the data in the column will be lost.
  - You are about to drop the column `production_company_id` on the `MovieProductionCompany` table. All the data in the column will be lost.
  - You are about to drop the `_MovieToProductionCompany` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `movieId` to the `MovieProductionCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productionCompanyId` to the `MovieProductionCompany` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MovieProductionCompany" DROP CONSTRAINT "MovieProductionCompany_movie_id_fkey";

-- DropForeignKey
ALTER TABLE "MovieProductionCompany" DROP CONSTRAINT "MovieProductionCompany_production_company_id_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToProductionCompany" DROP CONSTRAINT "_MovieToProductionCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToProductionCompany" DROP CONSTRAINT "_MovieToProductionCompany_B_fkey";

-- AlterTable
ALTER TABLE "MovieProductionCompany" DROP CONSTRAINT "MovieProductionCompany_pkey",
DROP COLUMN "id",
DROP COLUMN "movie_id",
DROP COLUMN "production_company_id",
ADD COLUMN     "movieId" TEXT NOT NULL,
ADD COLUMN     "productionCompanyId" TEXT NOT NULL,
ADD CONSTRAINT "MovieProductionCompany_pkey" PRIMARY KEY ("movieId", "productionCompanyId");

-- DropTable
DROP TABLE "_MovieToProductionCompany";

-- AddForeignKey
ALTER TABLE "MovieProductionCompany" ADD CONSTRAINT "MovieProductionCompany_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieProductionCompany" ADD CONSTRAINT "MovieProductionCompany_productionCompanyId_fkey" FOREIGN KEY ("productionCompanyId") REFERENCES "ProductionCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
