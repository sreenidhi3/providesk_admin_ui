import { post, get } from 'apis/apiHelper';
import { createTicketPayloadType } from './type';

export const postCreateTicket = ({
  payload,
}: {
  payload: createTicketPayloadType;
}) => {
  return post({ path: '/tickets', requestParams: payload });
};

export const getUsersList = (dept_id) => {
  return get({ path: `/departments/${dept_id}/users` });
};
