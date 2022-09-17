import { get } from "apis/apiHelper";

export const getDetailsTicket = (id) => {
  return get({
    path: `/detailsLIst/:${id}`,
    queryParams: { id },
  });
};

export const getDepartmentList = () => {
  return get({ path: `/departments/` });
};
