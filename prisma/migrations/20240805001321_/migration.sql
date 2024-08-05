-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "location" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crimes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" INTEGER NOT NULL,
    "photo" TEXT,
    "createdat" TEXT,
    "updatedat" TEXT,
    "status" INTEGER DEFAULT 1,
    "userId" INTEGER NOT NULL,
    "isdelete" INTEGER DEFAULT 0,

    CONSTRAINT "Crimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "remark" TEXT NOT NULL,
    "crimeId" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sqlite_autoindex_Users_1" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_roleId_key" ON "User"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Crimes_id_key" ON "Crimes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sqlite_autoindex_Remarks_1" ON "Comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sqlite_autoindex_Locations_1" ON "Locations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sqlite_autoindex_Roles_1" ON "Roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sqlite_autoindex_Status_1" ON "Status"("id");

-- AddForeignKey
ALTER TABLE "Crimes" ADD CONSTRAINT "Crimes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_crimeId_fkey" FOREIGN KEY ("crimeId") REFERENCES "Crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
