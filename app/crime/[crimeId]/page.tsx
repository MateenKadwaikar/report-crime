import React from "react";

const getCrimeById = async (id: number) => {
  const response = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`);
  return (await response)?.json();
};

async function Page({ params }: { params: { crimeId: number } }) {
  const { crimeId } = params;
  const request = await getCrimeById(crimeId);
  return <>{JSON.stringify(request)}</>;
}

export default Page;
