import { IFetchComplaintListRequest } from 'modules/dashboard/types';
import { useQuery } from 'react-query';
import { getRequestList } from './dashboard.services';

export const useGetRequestsList = (queryParams: IFetchComplaintListRequest) => {
  const { data, isLoading, isFetching } = useQuery('complaint-list', () =>
    getRequestList(queryParams)
  );
  return {
    data: data?.data,
    isLoading: isLoading || isFetching,
  };
};
