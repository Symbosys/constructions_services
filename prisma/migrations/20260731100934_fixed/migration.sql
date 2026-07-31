-- AlterTable
ALTER TABLE `homehero` ADD COLUMN `subtitle` TEXT NULL,
    ADD COLUMN `title` VARCHAR(191) NULL,
    MODIFY `imageUrl` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `homeplanning` MODIFY `imageUrl` LONGTEXT NULL,
    MODIFY `paragraph1` TEXT NULL,
    MODIFY `paragraph2` TEXT NULL;

-- AlterTable
ALTER TABLE `serviceitem` MODIFY `imageUrl` LONGTEXT NOT NULL;
