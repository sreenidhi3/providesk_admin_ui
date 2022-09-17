export interface IComplaintDetails {
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
  data: IComplaintDetails[];
}

export interface IFetchComplaintListRequest {
  status?: string;
  department?: string;
  title?: string;
  page: number;
  perPage: number;
}
