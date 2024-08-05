import { NextResponse } from "next/server";
import prisma from "../db/client";

export async function GET() {
  try {
    const location = await prisma.locations.findMany();
    return NextResponse.json(location);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
