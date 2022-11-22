import { get, put } from 'apis/apiHelper';
import { IEditUserPayload } from './type';

export const putEditUser = (payload: { user: IEditUserPayload }) =>
  put({ path: '/users', payloadParams: payload });

export const getUsersList = (dept_id) => {
  return get({ path: `/departments/${dept_id}/users` });
};
