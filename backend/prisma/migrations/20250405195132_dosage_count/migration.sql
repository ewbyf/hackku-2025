/*
  Warnings:

  - Added the required column `takenToday` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Prescription` ADD COLUMN `takenToday` INTEGER NOT NULL;
