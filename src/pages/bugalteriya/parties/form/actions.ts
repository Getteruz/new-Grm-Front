import {
  DefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import { AddData, getByIdData, UpdateData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import { CropIdQuery,TData } from "../type";
import { CropFormType } from "./schema";

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface ICrops {
  options?: DefinedInitialDataOptions<TData>;
  id: string | undefined;
  queries?: CropIdQuery;
}
interface ICropsMute {
  data: CropFormType;
  id: string | undefined;
}

export const useCropMutation = ({
  ...options
}: UseMutationOptions<AuthResponse, Error, ICropsMute, unknown>) =>
  useMutation({
    ...options,
    mutationFn: async ({ data, id }) => {
      const costomData: any = {
        ...data,
        main_image: data?.main_image?.id,
      };
      if (id)
        return await UpdateData<CropFormType>(apiRoutes.crops, id, costomData);
      return await AddData<CropFormType>(apiRoutes.crops, costomData);
    },
  });

export const useCropById = ({ options, id, queries }: ICrops) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.crops, id],
    enabled: Boolean(id),
    queryFn: () =>
      getByIdData<TData, CropIdQuery>(apiRoutes.crops, id || "", queries),
  });
