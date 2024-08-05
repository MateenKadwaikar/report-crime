import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db/client";

//const { searchParams } = new URL(request.url)
//const id = searchParams.get('id')
export async function GET(
  req: NextRequest,
  context: { params: { crimeId: number } }
) {
  try {
    const {
      params: { crimeId },
    } = context;
    if (!crimeId) {
      return NextResponse.json(
        { message: "Please provide crime id" },
        { status: 500 }
      );
    }

    const crimeList = await prisma.crimes.findFirst({
      where: {
        id: Number(crimeId),
      },
      select: {
        comments: true,
        id: true,
        status: true,
        location: true,
        photo: true,
        title: true,
        updatedat: true,
      },
    });
    if (!crimeList?.id) {
      return NextResponse.json({ message: "Id not found" }, { status: 500 });
    }
    return NextResponse.json(crimeList);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function DELETE(
  request: NextRequest,
  context: { params: { crimeId: number } }
) {
  try {
    const {
      params: { crimeId },
    } = context;
    if (!crimeId) {
      return NextResponse.json(
        { message: "Please provide crime id" },
        { status: 500 }
      );
    }
    const response = await prisma.crimes.update({
      data: {
        isdelete: 1,
      },
      where: {
        id: +crimeId,
      },
    });
    console.log(response);
    if (!response?.id) {
      return NextResponse.json({ message: "Id not found" }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Delete Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
