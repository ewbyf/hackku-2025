-- CreateTable
CREATE TABLE `Prescription` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `medication` VARCHAR(191) NOT NULL,
    `dosage` INTEGER NOT NULL,
    `vector` VARCHAR(191) NOT NULL,
    `freq` INTEGER NOT NULL,
    `freqUnit` VARCHAR(191) NOT NULL,
    `lastTaken` DATETIME(3) NULL,

    PRIMARY KEY (`id`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
