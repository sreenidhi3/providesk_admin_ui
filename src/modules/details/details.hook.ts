import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import API_CONSTANTS from 'hooks/constants';
import { getDetailsTicket, putEditTicket } from './details.service';
import { IEditTicketPayload } from './type';
import { AxiosError } from 'axios';
import { ICreateTicketError } from 'modules/Ticket/type';

export const useEditTicket = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, ticket }: { id: number; ticket: { ticket: IEditTicketPayload } }) =>
      putEditTicket({ id, ticket }),
    {
      onSuccess: (res) => {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries([API_CONSTANTS.DETAILS_SPECEFIC]);
      },
      onError: (err: AxiosError) => {
        let error = err?.response?.data as ICreateTicketError;
        toast.error(error?.errors || 'Failed to create ticket.');
      },
    }
  );
};

export const useTicketDetails = (id: number) => {
  const { data, isLoading } = useQuery(
    [API_CONSTANTS.DETAILS_SPECEFIC, id],
    () => getDetailsTicket(id),
    {
      onError: (err: AxiosError) => {
        let error = err?.response?.data as ICreateTicketError;
        toast.error(error?.message || 'Failed to fetch ticket details');
      },
    }
  );
  return {
    ticket: data?.data?.data?.ticket,
    activities: data?.data?.data?.activites,
    isLoading,
  };
};
