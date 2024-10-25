-- CreateTable
CREATE TABLE "ComplianceData" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "idToken" TEXT,
    "accessToken" TEXT,
    "authCode" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplianceData_pkey" PRIMARY KEY ("id")
);
