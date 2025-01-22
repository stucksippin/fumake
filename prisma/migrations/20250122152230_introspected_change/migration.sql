/*
  Warnings:

  - You are about to drop the column `color` on the `Furniture` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Furniture` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Furniture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Furniture" ("category", "discription", "id", "image", "name", "price") SELECT "category", "discription", "id", "image", "name", "price" FROM "Furniture";
DROP TABLE "Furniture";
ALTER TABLE "new_Furniture" RENAME TO "Furniture";
CREATE UNIQUE INDEX "Furniture_image_key" ON "Furniture"("image");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
