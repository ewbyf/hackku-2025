/*
  Warnings:

  - You are about to alter the column `explanation` on the `ExplainedProcedure` table. The data in that column could be lost. The data in that column will be cast from `VarChar(4096)` to `VarChar(1024)`.

*/
-- AlterTable
ALTER TABLE `ExplainedProcedure` MODIFY `explanation` VARCHAR(1024) NOT NULL;
