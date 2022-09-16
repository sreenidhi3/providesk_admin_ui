export interface RequestData {
  id: number;
  raised_by: string;
  raised_time: string;
  title: string;
  last_update_time: string;
  status: string;
  assigned_to: string;
  department: string;
}

export interface GetRequestsListResponse {
  message: string;
  data: RequestData[];
}
