import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import API_CONSTANTS from 'hooks/constants';
import { getDetailsTicket } from './details.service';

export const useDetails = (id: number) => {
  const { data, isLoading, refetch } = useQuery(
    [API_CONSTANTS.DETAILS_SPECEFIC, id],
    () => getDetailsTicket(id),
    {
      onError: (err) => {
        toast.error('Unable to Fetch data');
      },
    }
  );
  return { data: data?.data, isLoading };
};
