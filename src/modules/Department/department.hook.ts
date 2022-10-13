import { useMutation } from 'react-query';
import { postCreateDepartment } from './department.service';
import { toast } from 'react-toastify';

export const useCreateDepartment = () => {
  return useMutation((payload: any) => postCreateDepartment({ payload }), {
    onSuccess: () => {
      toast.success('department created successfuly');
    },
    onError: () => {
      toast.error('unable to create department');
    },
  });
};
