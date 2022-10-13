import { get } from 'apis/apiHelper';

export const getDetailsTicket = (id) => {
  return get({
    path: `/detailsLIst/:${id}`,
    queryParams: { id },
  });
};

export const getDepartmentList = () => {
  return get({ path: `/organizations/1/departments` });
};

export const getCategoryList = () => {
  return get({ path: `/category/` });
};
