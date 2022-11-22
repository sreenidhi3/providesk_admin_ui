import { get, put } from 'apis/apiHelper';

export const putEditUser = (id, payload) =>
  put({ path: `/users/${id}`, payloadParams: payload });

export const getUsersList = (dept_id) =>
  get({ path: `/departments/${dept_id}/users` });
