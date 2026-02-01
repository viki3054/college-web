-- CreateEnum
CREATE TYPE "BusEventType" AS ENUM ('ENTRY', 'EXIT');

-- AlterTable
ALTER TABLE "NotificationSetting" ADD COLUMN     "busEnabled" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Bus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT,
    "plateNo" TEXT,
    "capacity" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusRoute" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "stops" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusAssignment" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unassignedAt" TIMESTAMP(3),

    CONSTRAINT "BusAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusEvent" (
    "id" TEXT NOT NULL,
    "type" "BusEventType" NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "busId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "recordedById" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitePage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHtml" TEXT,
    "sourceUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SitePage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bus_plateNo_key" ON "Bus"("plateNo");

-- CreateIndex
CREATE INDEX "Bus_isActive_idx" ON "Bus"("isActive");

-- CreateIndex
CREATE INDEX "BusRoute_busId_idx" ON "BusRoute"("busId");

-- CreateIndex
CREATE INDEX "BusRoute_isActive_idx" ON "BusRoute"("isActive");

-- CreateIndex
CREATE INDEX "BusAssignment_studentId_idx" ON "BusAssignment"("studentId");

-- CreateIndex
CREATE INDEX "BusAssignment_routeId_isActive_idx" ON "BusAssignment"("routeId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BusAssignment_routeId_studentId_key" ON "BusAssignment"("routeId", "studentId");

-- CreateIndex
CREATE INDEX "BusEvent_routeId_occurredAt_idx" ON "BusEvent"("routeId", "occurredAt");

-- CreateIndex
CREATE INDEX "BusEvent_studentId_occurredAt_idx" ON "BusEvent"("studentId", "occurredAt");

-- CreateIndex
CREATE INDEX "BusEvent_busId_occurredAt_idx" ON "BusEvent"("busId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "SitePage_slug_key" ON "SitePage"("slug");

-- CreateIndex
CREATE INDEX "SitePage_isPublished_idx" ON "SitePage"("isPublished");

-- CreateIndex
CREATE INDEX "SitePage_sourceUrl_idx" ON "SitePage"("sourceUrl");

-- AddForeignKey
ALTER TABLE "BusRoute" ADD CONSTRAINT "BusRoute_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusAssignment" ADD CONSTRAINT "BusAssignment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "BusRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusAssignment" ADD CONSTRAINT "BusAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusEvent" ADD CONSTRAINT "BusEvent_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusEvent" ADD CONSTRAINT "BusEvent_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "BusRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusEvent" ADD CONSTRAINT "BusEvent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusEvent" ADD CONSTRAINT "BusEvent_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
