"use client";
import { Hooks } from "./hooks";
import AddCrimeComponent from "../AddCrimeComponent";
import { DataTable } from "../CommonComponent/TableComponent";
import { getCrimes } from "../actions/crime-service";
import { useEffect, useState } from "react";
import { ICrime } from "@/app/model/Type";
import RefreshButtonComponent from "../CommonComponent/RefreshButtonComponent";

export default function CrimesComponent() {
  const getCrime = async () =>
    await getCrimes().then((crimes) => setCrime(crimes));
  const [crime, setCrime] = useState<ICrime[]>([]);
  const { columns } = Hooks();
  useEffect(() => {
    getCrime();
  }, []);

  const onRefreshHandler = () => getCrime();
  return (
    <div className="container mx-auto  min-h-fit">
      <DataTable columns={columns} data={crime}>
        <div className="flex gap-2">
          <RefreshButtonComponent onRefrehBtnHandler={onRefreshHandler} />
          <AddCrimeComponent />
        </div>
      </DataTable>
    </div>
  );
}
