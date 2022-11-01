export interface ICreateTicketData {
  title: string;
  description: string;
  category_id: number;
  department_id: number;
  ticket_type: number;
  resolver_id: number;
}

export interface ICreateTicketPayload {
  ticket: ICreateTicketData;
}

export interface ICreateTicketResponse {
  message: string;
}

export interface ITicketType {
  id: number;
  value: string;
}

export interface ICreateTicketError {
  message: string;
  errors: string;
}
