import { JSX, useState } from "react";
import CountryRemainderTable from "./country";
import FoctoryRemainderTable from "./factory";

export default function RemainderTable() {
  const [remainder, setRemainder] = useState<{
    id: string;
    name: string;
  }>({
    id: "",
    name: "country",
  });

  // Mapping table names to components
  const remainderTable: Record<string, JSX.Element> = {
    country: <CountryRemainderTable remainder={remainder} setRemainder={setRemainder} />,
    factory: <FoctoryRemainderTable remainder={remainder} setRemainder={setRemainder} />,
  };

  return (
    <>
      {remainderTable?.[remainder.name]}
    </>
  );
}
