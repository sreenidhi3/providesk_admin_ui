import { AxiosError } from 'axios';
import API_CONSTANTS from 'hooks/constants';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { IEditUserError, IEditUserPayload } from './type';
import { putEditUser } from './users.service';

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: IEditUserPayload) => putEditUser({ user: { ...payload } }),
    {
      onSuccess: (res) => {
        toast.success(res?.data?.message || 'Ticked edited successfully.');
        queryClient.invalidateQueries([API_CONSTANTS.DETAILS_SPECEFIC]);
      },
      onError: (err: AxiosError) => {
        let error = err?.response?.data as IEditUserError;
        toast.error(
          error?.errors || error?.message || 'Failed to create ticket.'
        );
      },
    }
  );
};
