export interface details {
  ticket: {
    status:
      | "open"
      | "assigned"
      | "inprogress"
      | "resolved"
      | "closed"
      | "rejected";
    title: string;
    description: string;
    ticket_number: number;
    ticket_type: string;
    priority: string;
    category_name: string;
    activities: {
      created_at: string;
      description: string;
      asset_url?: string;
      resolver?: { id: number; name: string };
      id: number;
    }[];

    resolver?: {
      id: number;
      name: string;
    };
    created_at: string;
    resolved_at?: string;
    id: number;
  };
}

export interface detailsData {
  data: details;
}

// #department listing response

// {
//   "data": {
//     "total": 3,
//     "departments": [
//       {
//         "name": "Mr. Raina Fisher3",
//         "id": "1"
//       },
//       {
//         "name": "Hiram Walker2",
//         "id": "2"
//       },
//       {
//         "name": "Breanne Ledner1",
//         "id": "3"
//       }
//     ]
//   }
// }

export interface departMentList {
  total: number;
  departments: {
    name: string;
    id: number;
  }[];
}
export interface departMentListData {
  data: departMentList;
}
