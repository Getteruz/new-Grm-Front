"use client";

import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";

import { Button } from "./ui/button";

export const UploadAvatarButton = () => {
  const [avatar, setAvatar] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    api
      .post(apiRoutes.upload, formData)
      .then((res) => {
        setAvatar(res?.data?.image?.url);
        setValue("avatar", res?.data?.image?.["0"].id);
      })
      .catch((err) => toast.error(String(err)));
  };

  const handleIconClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className=" flex gap-7">
      <Button type="button" onClick={handleIconClick}>
        <UploadCloud size={48} className="" /> Загрузить файл (фото.jpeg)
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {avatar && (
        <img
          src={ avatar}
          alt=""
          className="w-[95px] h-[117px] object-contain"
        />
      )}
    </div>
  );
};
