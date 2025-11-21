// import {Conent} from "./conent";
import LeftConent from "./left-conent";
import RightConent from "./right-conent";

import { useRef } from "react";
import { ConentUI } from "./conentUI";

export default function PageOrginalCopy() {


  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div    className="flex h-[calc(100vh-65px)]">
        <LeftConent  />
        <ConentUI ref={printRef}/>
        <RightConent printRef={printRef}/>
      </div>
  );
}
