import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { getUsersList, postCreateTicket } from './ticket.service';
import { createTicketPayloadType } from './type';

import API_CONSTANTS from 'hooks/constants';

//todo
//1. inavalidate ticket query on successful ticket creation
//2. change toast messages to make it dynamic

export const useCreateTicket = () => {
  // const queryClient = useQueryClient();
  const { mutate, data, isLoading, error } = useMutation(
    (payload: createTicketPayloadType) => postCreateTicket({ payload }),
    {
      onSuccess: (res) => {
        // queryClient.invalidateQueries([API_CONSTANTS.TICKET]);
        toast.success('Ticket Created Successfully');
      },
      onError: () => {
        toast.error('unable to create ticket');
      },
    }
  );
  return { mutate, data: data?.data?.data?.users, isLoading };
};

export const useUsers = (dept_id) => {
  const { data, isLoading } = useQuery(
    [API_CONSTANTS.USER_LIST, dept_id],
    () => getUsersList(dept_id),
    {
      onError: () => {
        toast.error('unable to fetch users list');
      },
    }
  );
  return { data: data?.data?.data?.users, isLoading };
};
