import CarpetCard from "@/components/cards/carpet-card";
import Filters from "./filters";

export default function Page() {

  return (
    <>
     <Filters />
     <div className="px-2.5  mt-4 gap-2 grid row-start grid-cols-6  pb-[17px]">
        <CarpetCard id='1' isBron={true} carpetType="my-broned"  discount={"5"} img="public/images/image.png" model="M39A" size="100X150" count="1" price="170" colaction="Sanat Montreal" color="Beige"/>
        <CarpetCard id='1' isBron={true} carpetType="my-broned"  img="public/images/image.png" model="M39A" size="100X150" count="1" price="170" colaction="Sanat Montreal" color="Beige"/>
        <CarpetCard id='1' isBron={true} carpetType="my-broned" img="public/images/image.png" model="M39A" size="100X150" count="1" price="170" colaction="Sanat Montreal" color="Beige"/>
    </div>
    </>
  );
}
