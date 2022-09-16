export interface RequestData {
  id: number;
  raised_by: string;
  created_at: string;
  title: string;
  updated_time: string;
  status: string;
  assigned_to: string;
  department: string;
}

export interface GetRequestsListResponse {
  message: string;
  data: RequestData[];
}
