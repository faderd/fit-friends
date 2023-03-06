-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuestionnaire" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trainingLevel" TEXT NOT NULL,
    "trainingType" TEXT NOT NULL,
    "trainingDuration" TEXT NOT NULL,
    "caloriesLoss" INTEGER NOT NULL,
    "burnsCaloriesPerDay" INTEGER NOT NULL,
    "isReadyToTrain" BOOLEAN NOT NULL,

    CONSTRAINT "UserQuestionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerQuestionnaire" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trainingLevel" TEXT NOT NULL,
    "trainingType" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    "merits" TEXT NOT NULL,
    "isReadyToTrain" BOOLEAN NOT NULL,

    CONSTRAINT "TrainerQuestionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshSessions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshSessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserQuestionnaire" ADD CONSTRAINT "UserQuestionnaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerQuestionnaire" ADD CONSTRAINT "TrainerQuestionnaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshSessions" ADD CONSTRAINT "RefreshSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
