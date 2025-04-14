import Content from "./content";
import useOrder from "./queries";

export default function Page() {
  const {data } =useOrder({})
  const flatData = data?.pages?.flatMap(page => page?.items || []) || [];

  return (
    <>
    <Content orderList={flatData}/>
    </>
  )
}
