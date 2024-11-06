/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Furniture` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Furniture_image_key" ON "Furniture"("image");
