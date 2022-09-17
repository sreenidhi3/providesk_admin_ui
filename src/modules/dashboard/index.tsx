import Header from 'modules/shared/Header';
import RequestCard from 'modules/shared/RequestCard';
import React, { useState } from 'react';
import { RequestData } from './types';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Select from 'modules/shared/Select';
import Search from 'modules/shared/Search';
import { useGetRequestsList } from './dashboard.hooks';
import { RequestQuote } from '@mui/icons-material';

const statusOptions = [
  {
    value: 'open',
    label: 'Open',
  },
  {
    value: 'assigned',
    label: 'Assigned',
  },
  {
    value: 'in_progress',
    label: 'In Progress',
  },
  {
    value: 'resloved',
    label: 'Resloved',
  },
];

const departmentOptions = [
  {
    value: 'finance',
    label: 'Finance',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'sales',
    label: 'Sales',
  },
  {
    value: 'learning',
    label: 'Learning',
  },
];

const Dashboard = () => {
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    title: '',
  });

  const { requests, requestsLoading } = useGetRequestsList(filters);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((p) => ({ ...p, [event.target.name]: event.target.value }));
  };

  const onSearchTile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((p) => ({ ...p, title: event.target.value }));
  };

  
  return (
    <div>
      <Header />

      <div className='d-flex flex-column p-5 '>
        <div className='d-flex gap-3 me-2'>
          <Select
            label={'Status'}
            options={statusOptions}
            value={filters.status}
            onChange={handleChange}
            name='status'
          />
          <Select
            label={'Departments'}
            options={departmentOptions}
            value={filters.department}
            onChange={handleChange}
            name='deparment'
          />
          <Search
            label={'Enter Title'}
            value={filters.title}
            onChange={onSearchTile}
            name='title'
          />
          <Button variant='contained' sx={{ width: 250 }}>
            Search
          </Button>
        </div>
        <div className='d-flex flex-wrap gap-4 mt-3'>
          {requests?.map((request) => (
            <RequestCard data={request} />
          ))}
        </div>
        <div className='d-flex justify-content-end mt-3'>
          <Pagination
            count={10}
            variant='outlined'
            shape='rounded'
            onChange={(event: React.ChangeEvent<unknown>, page: number) =>
              console.log(page)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
