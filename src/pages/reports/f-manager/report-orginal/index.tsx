import Conent from "./conent";
import LeftConent from "./left-conent";
import RightConent from "./right-conent";

export default function PageOrginal() {
  return (
    <div className="flex h-[calc(100vh-65px)]">
          <LeftConent/>
          <Conent/>
          <RightConent/>
    </div>
  )
}
