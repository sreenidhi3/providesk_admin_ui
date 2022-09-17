import { GetRequestsListRequest } from 'modules/dashboard/types';
import { useQuery } from 'react-query';
import { getRequestList } from './dashboard.services';

export const useGetRequestsList = (queryParams: GetRequestsListRequest) => {
  const { data, isLoading, isFetching } = useQuery('request-list', () =>
    getRequestList(queryParams)
  );

  return {
    requests: data?.data,
    requestsLoading: isLoading || isFetching,
  };
};
