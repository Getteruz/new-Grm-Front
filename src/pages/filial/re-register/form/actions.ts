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

interface IMuteCheck {
  data:CropFormType
  isUpdate:boolean,
  id:string 
}

export const useProdcutCheck = ({
  ...options
}: UseMutationOptions<object, Error, IMuteCheck, unknown>) =>
  useMutation({
    ...options,
    mutationFn: async ({  data,id, isUpdate }) => {
      const costomData: object = {
        ...data,
        countryId: data?.country?.value,
        collectionId :data?.collection?.value,
        sizeId: data?.size?.value,
        shapeId:data?.shape?.value,
        styleId:data?.style?.value,
        colorId:data?.color?.value,
        modelId:data?.model?.value,
        factoryId:data?.factory?.value,
        isMetric:data?.isMetric?.value === "true" ? true : false,
      };
      if(isUpdate){
        return await UpdateData(apiRoutes.excelSingle, id,  costomData);
      }else{
        return await AddData(apiRoutes.excelProduct + "/" + id, costomData);
      }
    },
  });

export const useProductId = ({ options, id, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.qrBase, id],
    enabled: Boolean(id),
    queryFn: () =>
      getByIdData<TData, TQuery>(apiRoutes.qrBase, id || "", queries),
  });

  export const useBarCodeById = ({ options, id, queries }: IData) =>
    useQuery({
      ...options,
      queryKey: [apiRoutes.qrBase + 'find-by', id],
      enabled: Boolean(id),
      queryFn: () =>
        getByIdData<TData, TQuery>(apiRoutes.qrBase+ '/find-by', id || "", queries),
    });
  
  
