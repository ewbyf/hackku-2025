-- CreateTable
CREATE TABLE `ExplainedProcedure` (
    `technical` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`technical`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientProcedure` (
    `order` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PatientProcedure` ADD CONSTRAINT `PatientProcedure_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientProcedure` ADD CONSTRAINT `PatientProcedure_name_fkey` FOREIGN KEY (`name`) REFERENCES `ExplainedProcedure`(`technical`) ON DELETE RESTRICT ON UPDATE CASCADE;
