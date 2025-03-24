import {
  DefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import { AddData, getByIdData, UpdatePatchData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import { FilialsQuery,TData } from "../type";
import { FilialFormType } from "./schema";

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface IFilials {
  options?: DefinedInitialDataOptions<TData>;
  id: string | undefined;
  queries?: FilialsQuery;
}
interface IFilialsMute {
  data: FilialFormType;
  id: string | undefined;
}

export const useFilialMutation = ({
  ...options
}: UseMutationOptions<AuthResponse, Error, IFilialsMute, unknown>) =>
  useMutation({
    ...options,
    mutationFn: async ({ data, id }) => {
      const costomData: any = {
        ...data,
        // main_image: data?.main_image?.id,
      };
      if (id)
        return await UpdatePatchData<FilialFormType>(apiRoutes.filial, id, costomData);
      return await AddData<FilialFormType>(apiRoutes.filial, costomData);
    },
  });

export const useFilialById = ({ options, id, queries }: IFilials) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.filial, id],
    enabled: Boolean(id),
    queryFn: () =>
      getByIdData<TData, FilialsQuery>(apiRoutes.filial, id || "", queries),
  });
