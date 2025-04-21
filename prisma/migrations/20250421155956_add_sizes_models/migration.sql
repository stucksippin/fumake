/*
  Warnings:

  - You are about to drop the column `size` on the `FurnitureVariations` table. All the data in the column will be lost.
  - Added the required column `sizeId` to the `FurnitureVariations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Sizes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FurnitureVariations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "furnitureId" INTEGER,
    "sizeId" INTEGER NOT NULL,
    "colorsId" INTEGER NOT NULL,
    CONSTRAINT "FurnitureVariations_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "Colors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FurnitureVariations_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Sizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FurnitureVariations_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FurnitureVariations" ("colorsId", "furnitureId", "id") SELECT "colorsId", "furnitureId", "id" FROM "FurnitureVariations";
DROP TABLE "FurnitureVariations";
ALTER TABLE "new_FurnitureVariations" RENAME TO "FurnitureVariations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Sizes_size_key" ON "Sizes"("size");
