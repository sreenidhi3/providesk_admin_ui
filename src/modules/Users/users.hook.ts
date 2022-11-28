import { AxiosError } from 'axios';
import API_CONSTANTS from 'hooks/constants';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { IEditUserError, IEditUserPayload } from './type';
import { putEditUser } from './users.service';

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, payload }: { id: number; payload: IEditUserPayload }) =>
      putEditUser(id, { user: { ...payload } }),
    {
      onSuccess: (res) => {
        toast.success(res?.data?.message || 'User editted successfully.');
        queryClient.invalidateQueries(API_CONSTANTS.USER_LIST);
      },
      onError: (err: AxiosError) => {
        let error = err?.response?.data as IEditUserError;
        toast.error(error?.errors || error?.message || 'Failed to edit user.');
      },
    }
  );
};
