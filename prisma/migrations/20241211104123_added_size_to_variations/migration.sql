/*
  Warnings:

  - Added the required column `size` to the `FurnitureVariations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FurnitureVariations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "furnitureId" INTEGER,
    "size" TEXT NOT NULL,
    "colorsId" INTEGER NOT NULL,
    CONSTRAINT "FurnitureVariations_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "Colors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FurnitureVariations_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FurnitureVariations" ("colorsId", "furnitureId", "id") SELECT "colorsId", "furnitureId", "id" FROM "FurnitureVariations";
DROP TABLE "FurnitureVariations";
ALTER TABLE "new_FurnitureVariations" RENAME TO "FurnitureVariations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
