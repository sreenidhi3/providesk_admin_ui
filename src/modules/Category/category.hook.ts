import API_CONSTANTS from 'hooks/constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import {
  getCategoriesList,
  getDepartmentList,
  postCreateCategory,
} from './category.service';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((payload: any) => postCreateCategory({ payload }), {
    onSuccess: () => {
      queryClient.invalidateQueries([API_CONSTANTS.CATEGORY_LIST]);
      toast.success('Category created successfuly');
    },
    onError: () => {
      toast.error('Unable to create category');
    },
  });
};

export const useDepartments = (id) => {
  const { data, isLoading } = useQuery(
    [API_CONSTANTS.DEPARTMENT_LIST, id],
    () => getDepartmentList(id),
    {
      enabled: !!id,
      onError: () => {
        toast.error('unable to fetch departments list');
      },
    }
  );
  return { data: data?.data?.data?.departments, isLoading };
};

export const useCategories = (dept_id) => {
  const { data, isLoading } = useQuery(
    [API_CONSTANTS.CATEGORY_LIST, dept_id],
    () => getCategoriesList(dept_id),
    {
      enabled: !!dept_id,
      onError: () => {
        toast.error('unable to fetch categories list');
      },
    }
  );
  return { data: data?.data?.data?.categories, isLoading };
};
