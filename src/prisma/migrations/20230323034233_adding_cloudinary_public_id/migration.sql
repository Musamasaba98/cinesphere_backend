-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "cloudinary_coverUrl_public_id" TEXT,
ADD COLUMN     "cloudinary_imageUrl_public_id" TEXT,
ADD COLUMN     "cloudinary_trailerUrl_public_id" TEXT,
ADD COLUMN     "cloudinary_videoUrl_public_id" TEXT;
