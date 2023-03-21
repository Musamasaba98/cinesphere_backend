-- CreateTable
CREATE TABLE "MovieProductionCompany" (
    "id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "production_company_id" TEXT NOT NULL,

    CONSTRAINT "MovieProductionCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieProductionCompany" ADD CONSTRAINT "MovieProductionCompany_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieProductionCompany" ADD CONSTRAINT "MovieProductionCompany_production_company_id_fkey" FOREIGN KEY ("production_company_id") REFERENCES "ProductionCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
