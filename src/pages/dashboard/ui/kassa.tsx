import { Progress } from "@/components/ui/progress";

export default function Kassa() {
  return (
    <div className="border border-border bg-white rounded-xl mt-2.5">
      <div className="hover:bg-[#F9F9F9] border-border   m-1 rounded-xl p-[25px]">
        <div className="flex items-center mb-2 gap-2 ">
          <p className="mr-auto text-[17px] text-[#333333]">Маруф касса</p>
          <p className=" text-[17px] opacity-30 text-[#333333]">Расход</p>
          <p className=" text-[17px] text-[#333333]">8 320 $</p>
        </div>
        <Progress  classNameIndicator="bg-[#FEDDCA]" className="bg-[#F3F3F3]" value={50} />
        <p className="text-[24px] mt-2">39 831 $</p> 
      </div>
      <div className=" w-full h-[1px] bg-border"></div>
      <div className="hover:bg-[#F9F9F9] m-1 rounded-xl p-[25px]">
        <div className="flex items-center mb-2 gap-2 ">
          <p className="mr-auto text-[17px] text-[#333333]">Маруф касса</p>
          <p className=" text-[17px] opacity-30 text-[#333333]">Расход</p>
          <p className=" text-[17px] text-[#333333]">8 320 $</p>
        </div>
        <Progress classNameIndicator="bg-[#B8F2FD] " className="bg-[#F3F3F3]" value={50} />
        <p className="text-[24px] mt-2">39 831 $</p>
      </div>
    </div>
  );
}
