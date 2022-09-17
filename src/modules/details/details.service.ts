import { get } from "apis/apiHelper";

export const getDetailsTicket = (id) => {
  return get({
    path: `/detailsLIst/:${id}`,
    params: { id },
    responseType: detailsData,
  });
};
export const getDepartmentList = () => {
  return get({});
};
