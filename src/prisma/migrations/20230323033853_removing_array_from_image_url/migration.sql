-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "imageUrl" SET DATA TYPE TEXT;
