-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "cryptoAsset" TEXT NOT NULL,
    "referenceCurrency" TEXT NOT NULL,
    "balanceInCryptoAsset" DOUBLE PRECISION NOT NULL,
    "balanceInReferenceCurrency" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
