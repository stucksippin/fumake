/*
  Warnings:

  - Added the required column `image` to the `Furniture` table without a default value. This is not possible if the table is not empty.

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
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Furniture" ("category", "color", "discription", "id", "name", "price", "size") SELECT "category", "color", "discription", "id", "name", "price", "size" FROM "Furniture";
DROP TABLE "Furniture";
ALTER TABLE "new_Furniture" RENAME TO "Furniture";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
