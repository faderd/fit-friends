/*
  Warnings:

  - You are about to drop the column `caloriesLoss` on the `TrainingDiary` table. All the data in the column will be lost.
  - You are about to drop the column `dateTraining` on the `TrainingDiary` table. All the data in the column will be lost.
  - You are about to drop the column `trainingDuration` on the `TrainingDiary` table. All the data in the column will be lost.
  - You are about to drop the column `trainingId` on the `TrainingDiary` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainingDiary" DROP CONSTRAINT "TrainingDiary_trainingId_fkey";

-- AlterTable
ALTER TABLE "TrainingDiary" DROP COLUMN "caloriesLoss",
DROP COLUMN "dateTraining",
DROP COLUMN "trainingDuration",
DROP COLUMN "trainingId",
ADD COLUMN     "diary" JSONB[];
