-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "budget" DROP NOT NULL,
ALTER COLUMN "revenue" DROP NOT NULL,
ALTER COLUMN "voteCount" DROP NOT NULL,
ALTER COLUMN "voteAverage" DROP NOT NULL,
ALTER COLUMN "releaseStatus" DROP NOT NULL,
ALTER COLUMN "release_date" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;