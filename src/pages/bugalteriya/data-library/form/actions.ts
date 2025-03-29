import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { AddData, UpdatePatchData } from "@/service/apiHelpers";

import { CropFormType } from "./schema";


interface IMute {
  url:string;
  data: CropFormType;
  id: string | undefined;
}

export const useDataLibrary = ({
  ...options
}: UseMutationOptions<object, Error, IMute, unknown>) =>
  useMutation({
    ...options,
    mutationFn: async ({ url,data, id }) => {
      
      if (id)
        return await UpdatePatchData<CropFormType>(url, id,  url == "/partiya-number" ? {title: data?.title+ "-partiya"}:data);
      return await AddData<CropFormType>(url, url == "/partiya-number" ? {title: data?.title+ "-partiya"}:data);
    },
  });