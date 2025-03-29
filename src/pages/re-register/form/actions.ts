import {
  DefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import { AddData, getByIdData, UpdateData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import {  TData, TQuery } from "../type";
import { CropFormType } from "./schema";

interface IData {
  options?: DefinedInitialDataOptions<TData>;
  id: string | undefined;
  queries?: TQuery;
}
interface IMute {
  data: CropFormType;
  id: string | undefined;
}

interface IMuteCheck {
  data: {
    bar_code:string,
    y:string
  }
}

export const useDataLibrary = ({
  ...options
}: UseMutationOptions<object, Error, IMute, unknown>) =>
  useMutation({
    ...options,
    mutationFn: async ({ data, id }) => {
      const costomData: object = {
        ...data,
        country: data?.country?.value,
        collection: data?.collection?.value,
        size: data?.size?.value,
        shape:data?.shape?.value,
        style:data?.style?.value,
        color:data?.color?.value,
        model:data?.model?.value,
      };
      if (id)
        return await UpdateData<CropFormType>(apiRoutes.qrBase, id, costomData as CropFormType);
      return await AddData<CropFormType>(apiRoutes.qrBase, costomData as CropFormType);
    },
  });


export const useProdcutCheck = ({
  ...options
}: UseMutationOptions<object, Error, IMuteCheck, unknown>) =>
  useMutation({
    ...options,
    mutationFn: async ({ data }) => {
      return await AddData(apiRoutes.productscheck, data);
    },
  });

export const useDataLibraryId = ({ options, id, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.qrBase, id],
    enabled: Boolean(id),
    queryFn: () =>
      getByIdData<TData, TQuery>(apiRoutes.qrBase, id || "", queries),
  });

