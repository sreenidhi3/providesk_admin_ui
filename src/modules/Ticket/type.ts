export type createTicketDataType = {
  title: string;
  description: string;
  category_id: number;
  department_id: number;
  ticket_type: number;
  resolver_id: number;
};

export type createTicketPayloadType = {
  ticket: createTicketDataType;
};

export type createTicketResponseType = {
  message: string;
};

export type TicketType = { id: number; value: string };

export type CreateTicketErrorType = {
  message: string;
  errors: string;
};
