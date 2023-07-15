/*
  Warnings:

  - A unique constraint covering the columns `[landId]` on the table `BankSlip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BankSlip_landId_key` ON `BankSlip`(`landId`);
