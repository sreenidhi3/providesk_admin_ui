import { useQuery } from "react-query";
import { toast } from "react-toastify";

import API_CONSTANTS from "hooks/constants";
import { getDepartmentList, getDetailsTicket } from "./details.service";

export const useDetails = (id: number) => {
  const { data, isLoading, refetch } = useQuery(
    [API_CONSTANTS.DETAILS_SPECEFIC, id],
    () => getDetailsTicket(id),
    {
      onError: (err) => {
        console.log(err);
        toast.error("Unable to Fetch data");
      },
    }
  );
  return { data: data?.data, isLoading };
};

export const useDepartMent = () => {};
export const useCatagory = () => {
  const { data, isLoading } = useQuery(
    API_CONSTANTS.DEPARTMENT_LIST,
    getDepartmentList,
    {
      onError: () => {
        toast.error("unable to fetch department list");
      },
    }
  );
};
