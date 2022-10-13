import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { postCreateDepartment } from './department.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_CONSTANTS from 'hooks/constants';
import { AxiosError } from 'axios';

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation((payload: any) => postCreateDepartment({ payload }), {
    onSuccess: () => {
      queryClient.invalidateQueries(API_CONSTANTS.DEPARTMENT_LIST);
      toast.success('department created successfuly');
    },
    onError: (err: AxiosError) => {
      toast.error(err?.message ? err?.message : 'unable to create department');
    },
  });
};
