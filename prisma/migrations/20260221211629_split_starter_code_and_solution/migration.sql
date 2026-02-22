/*
  Warnings:

  - You are about to drop the column `solution` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `starterCode` on the `problems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "problems" DROP COLUMN "solution",
DROP COLUMN "starterCode",
ADD COLUMN     "solutionCss" TEXT,
ADD COLUMN     "solutionHtml" TEXT,
ADD COLUMN     "solutionJs" TEXT,
ADD COLUMN     "starterCodeCss" TEXT,
ADD COLUMN     "starterCodeHtml" TEXT,
ADD COLUMN     "starterCodeJs" TEXT;
