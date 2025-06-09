/*
  Warnings:

  - You are about to drop the column `albumsIds` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artistsIds` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `tracksIds` on the `Favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "albumsIds",
DROP COLUMN "artistsIds",
DROP COLUMN "tracksIds";

-- CreateTable
CREATE TABLE "_FavoriteArtist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoriteArtist_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavoriteAlbum" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoriteAlbum_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavoriteTrack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoriteTrack_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FavoriteArtist_B_index" ON "_FavoriteArtist"("B");

-- CreateIndex
CREATE INDEX "_FavoriteAlbum_B_index" ON "_FavoriteAlbum"("B");

-- CreateIndex
CREATE INDEX "_FavoriteTrack_B_index" ON "_FavoriteTrack"("B");

-- AddForeignKey
ALTER TABLE "_FavoriteArtist" ADD CONSTRAINT "_FavoriteArtist_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteArtist" ADD CONSTRAINT "_FavoriteArtist_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteAlbum" ADD CONSTRAINT "_FavoriteAlbum_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteAlbum" ADD CONSTRAINT "_FavoriteAlbum_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteTrack" ADD CONSTRAINT "_FavoriteTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteTrack" ADD CONSTRAINT "_FavoriteTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
