-- CreateTable
CREATE TABLE "Images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "furnitureVariationId" INTEGER,
    CONSTRAINT "Images_furnitureVariationId_fkey" FOREIGN KEY ("furnitureVariationId") REFERENCES "FurnitureVariations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
