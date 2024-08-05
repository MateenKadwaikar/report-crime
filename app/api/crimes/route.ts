import { NextRequest, NextResponse } from "next/server";
import prisma from "../db/client";

export async function GET() {
  try {
    const crimes = await prisma.$queryRaw`SELECT title,
      C.id as id,
      createdAt,
      L.name as location,
     S.name as status
      FROM "Crimes" AS  C
    LEFT JOIN "Locations" AS L ON L.id = C.location
    LEFT JOIN "Status" AS S ON S.id = C.status
    WHERE C.isdelete = 0
    `;
    return NextResponse.json(crimes);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const uniqueId = Math.floor(Math.floor(Math.random() * 1000));
    const crimeLists = await prisma?.crimes?.create({
      data: {
        id: uniqueId,
        title: data?.title,
        location: Number(data?.location),
        // status: 1,
        userId: 1,
        // isdelete: 0,
        createdat: Date.now().toString(),
        comments: {
          create: {
            remark: data?.notes,
            id: Math.floor(Math.floor(Math.random() * 1000)),
          },
        },
      },
    });

    if (!crimeLists?.id) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Created Successfully", crimeLists },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
