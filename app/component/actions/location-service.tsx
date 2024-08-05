"use server";
import { ILocation } from "@/app/model/Type";

export async function getLocations(): Promise<ILocation[]> {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`);
  return await data.json();
}
