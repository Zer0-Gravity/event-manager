/*
  Warnings:

  - You are about to drop the column `evenDate` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventInvite" DROP CONSTRAINT "EventInvite_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "evenDate",
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "EventInvite" ADD CONSTRAINT "EventInvite_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRsvp" ADD CONSTRAINT "EventRsvp_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
