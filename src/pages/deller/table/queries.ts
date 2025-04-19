import { useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

const useDataLibrary = ({ options, queries }) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.qrBase, queries],
    queryFn: () => getAllData(apiRoutes.filial, queries),
  });

export default useDataLibrary;
