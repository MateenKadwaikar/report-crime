import ChartComponent from "./component/ChartComponent/ChartComponent";
import CrimesComponent from "./component/CrimesComponent/page";
import HeaderComponent from "./component/HeaderComponent/HeaderComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeaderComponent />
      {/* <ChartComponent/> */}
      <CrimesComponent />
    </main>
  );
}
