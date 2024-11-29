-- CreateTable
CREATE TABLE "Colors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FurnitureVariations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "furnitureId" INTEGER,
    "colorsId" INTEGER NOT NULL,
    CONSTRAINT "FurnitureVariations_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FurnitureVariations_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "Colors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
