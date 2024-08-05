"use server";

import { ICrime } from "@/app/model/Type";
import { FormSchema } from "../FormComponent";
import { z } from "zod";

export async function postCrime(data:  z.infer<typeof FormSchema>) {
  const request = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}crimes`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return (await request).json();
}

export async function getCrimes(): Promise<ICrime[]> {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}crimes`);
  return data.json();
}
export async function deleteCrime(id: number) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}crimes/${id}`, {
    method: "DELETE",
  });
  return data.json();
}
