import { useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

const useBroned = ({ options, queries }) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.broned, queries],
    queryFn: () => getAllData(apiRoutes.broned, queries),
  });

export default useBroned;
