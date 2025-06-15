import { minio_img_url } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function TebleAvatar({name,url}:{name:string,url?:string}) {
  return (
    <Avatar className="w-[50px] h-[50px]">
          <AvatarImage
            src={minio_img_url + url || undefined}
          />
          <AvatarFallback className="bg-primary text-white    flex items-center justify-center">
            {name?.[0]}
          </AvatarFallback>
        </Avatar>
  )
}
