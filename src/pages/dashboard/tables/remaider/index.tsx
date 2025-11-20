import { JSX, useState } from "react";
import CountryRemainderTable from "./country";
import FoctoryRemainderTable from "./factory";
import CollectionTable from "./collection";

export default function RemainderTable() {
  const [remainder, setRemainder] = useState<{
    id: string;
    name: string;
    oldId: string;
  }>({
    id: "",
    oldId: "",
    name: "country",
  });

  // Mapping table names to components
  const remainderTable: Record<string, JSX.Element> = {
    country: <CountryRemainderTable remainder={remainder} setRemainder={setRemainder} />,
    factory: <FoctoryRemainderTable remainder={remainder} setRemainder={setRemainder} />,
    collection:<CollectionTable remainder={remainder} setRemainder={setRemainder} />,
  };


  return (
    <>
      {remainderTable?.[remainder.name]}
    </>
  );
}
