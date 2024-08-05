"use client";
import { Hooks } from "./hooks";
import AddCrimeComponent from "../AddCrimeComponent";
import { DataTable } from "../CommonComponent/TableComponent";
import { getCrimes } from "../actions/crime-service";
import { useEffect, useState } from "react";
import { ICrime } from "@/app/model/Type";

export default function CrimesComponent() {
  const getCrime = async () =>
    await getCrimes().then((crimes) => setCrime(crimes));
  const [crime, setCrime] = useState<ICrime[]>([]);
  const { columns } = Hooks();
  useEffect(() => {
    getCrime();
  }, []);
  return (
    <div className="container mx-auto my-auto max-h-fit">
      <DataTable columns={columns} data={crime}>
        <AddCrimeComponent />
      </DataTable>
    </div>
  );
}
