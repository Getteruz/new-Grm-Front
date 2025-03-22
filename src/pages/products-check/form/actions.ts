import { ProductsCheckFormType } from "./schema";
import {
  DefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { AddData, getByIdData, UpdateData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { ProductsChecksData, ProductsChecksQuery } from "../type";

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface IProductsChecks {
  options?: DefinedInitialDataOptions<ProductsChecksData>;
  id: string | undefined;
  queries?: ProductsChecksQuery;
}
interface IProductsChecksMute {
  data: ProductsCheckFormType;
  id: string | undefined;
}

export const useProductsCheckMutation = ({
  ...options
}: UseMutationOptions<AuthResponse, Error, IProductsChecksMute, unknown>) =>
  useMutation({
    ...options,
    mutationFn: async ({ data, id }) => {
     
      if (id)
        return await UpdateData<ProductsCheckFormType>(apiRoutes.productscheck, id, data);
      return await AddData<ProductsCheckFormType>(apiRoutes.productscheck, data);
    },
  });

export const useProductsCheckById = ({ options, id, queries }: IProductsChecks) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.productscheck, id],
    enabled: Boolean(id),
    queryFn: () =>
      getByIdData<ProductsChecksData, ProductsChecksQuery>(apiRoutes.productscheck, id || "", queries),
  });
