/*
  Warnings:

  - You are about to drop the column `freqUnit` on the `Prescription` table. All the data in the column will be lost.
  - Added the required column `period` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodUnit` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Prescription` DROP COLUMN `freqUnit`,
    ADD COLUMN `period` INTEGER NOT NULL,
    ADD COLUMN `periodUnit` VARCHAR(191) NOT NULL,
    MODIFY `vector` VARCHAR(191) NULL;
