import { post, get } from 'apis/apiHelper';
import { ICreateTicketPayload } from './type';

export const postCreateTicket = (payload: ICreateTicketPayload) =>
  post({ path: '/tickets', requestParams: payload });

export const getUsersList = (dept_id) => {
  return get({ path: `/departments/${dept_id}/users` });
};
