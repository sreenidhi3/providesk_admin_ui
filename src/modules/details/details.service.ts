import { get, put } from 'apis/apiHelper';

export const putEditTicket = ({ id, ticket: payload }) => {
  return put({ path: `/tickets/${id}`, payloadParams: payload });
};

export const getDetailsTicket = (id) => {
  return get({
    path: `/tickets/${id}`,
  });
};
