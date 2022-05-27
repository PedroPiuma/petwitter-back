-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image_url" VARCHAR;

-- CreateTable
CREATE TABLE "Twitte" (
    "id" SERIAL NOT NULL,
    "body" VARCHAR(140) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Twitte_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Twitte" ADD CONSTRAINT "Twitte_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
