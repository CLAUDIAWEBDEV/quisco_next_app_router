/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_productId_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderProducts";
