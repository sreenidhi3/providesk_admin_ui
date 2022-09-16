import Header from 'modules/shared/Header';
import RequestCard from 'modules/shared/RequestCard';
import React, { useState } from 'react';
import { RequestData } from './types';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Select from 'modules/shared/Select';
import Search from 'modules/shared/Search';

const mockData: RequestData[] = [
  {
    id: 1,
    raised_by: 'Mickie',
    created_at: '8/6/2022',
    title: 'Martin & Orloff',
    updated_time: '7/16/2022',
    status: 'Fintone',
    assigned_to: 'Rank',
    department: 'Andalax',
  },
  {
    id: 2,
    raised_by: 'Vivyanne',
    created_at: '3/19/2022',
    title: 'Angel in My Pocket',
    updated_time: '3/16/2022',
    status: 'Zathin',
    assigned_to: 'Y-find',
    department: 'Cookley',
  },
  {
    id: 3,
    raised_by: 'Giustino',
    created_at: '6/2/2022',
    title: 'Reckless',
    updated_time: '5/1/2022',
    status: 'Cardguard',
    assigned_to: 'Otcom',
    department: 'Bytecard',
  },
  {
    id: 4,
    raised_by: 'Deborah',
    created_at: '11/18/2021',
    title: 'Nightwatch',
    updated_time: '6/9/2022',
    status: 'Treeflex',
    assigned_to: 'Fixflex',
    department: 'Rank',
  },
  {
    id: 5,
    raised_by: 'Brianne',
    created_at: '12/17/2021',
    title: 'Blank Check',
    updated_time: '6/11/2022',
    status: 'Aerified',
    assigned_to: 'Matsoft',
    department: 'Namfix',
  },
  {
    id: 6,
    raised_by: 'Linnea',
    created_at: '3/19/2022',
    title: 'Aningaaq',
    updated_time: '1/31/2022',
    status: 'Stim',
    assigned_to: 'Domainer',
    department: 'Konklux',
  },
  {
    id: 7,
    raised_by: 'Lyndsie',
    created_at: '3/20/2022',
    title: "Gone Fishin'",
    updated_time: '12/20/2021',
    status: 'Voyatouch',
    assigned_to: 'Veribet',
    department: 'Toughjoyfax',
  },
  {
    id: 8,
    raised_by: 'Clemmy',
    created_at: '9/6/2022',
    title: 'Emma',
    updated_time: '7/25/2022',
    status: 'Y-find',
    assigned_to: 'Mat Lam Tam',
    department: 'Tampflex',
  },
  {
    id: 9,
    raised_by: 'Kata',
    created_at: '7/26/2022',
    title: 'Play it to the Bone',
    updated_time: '11/30/2021',
    status: 'Keylex',
    assigned_to: 'Cardguard',
    department: 'Cookley',
  },
  {
    id: 10,
    raised_by: 'Worth',
    created_at: '5/14/2022',
    title: 'Duck, You Sucker (a.k.a. Fistful of Dynamite, A) (Giù la testa)',
    updated_time: '12/13/2021',
    status: 'Temp',
    assigned_to: 'Kanlam',
    department: 'Asoka',
  },
  {
    id: 11,
    raised_by: 'Aurea',
    created_at: '11/24/2021',
    title: '#chicagoGirl: The Social Network Takes on a Dictator',
    updated_time: '4/23/2022',
    status: 'Stringtough',
    assigned_to: 'Y-Solowarm',
    department: 'Vagram',
  },
  {
    id: 12,
    raised_by: 'Emalee',
    created_at: '1/7/2022',
    title: 'Times Square',
    updated_time: '2/1/2022',
    status: 'Stim',
    assigned_to: 'Stronghold',
    department: 'Alpha',
  },
  {
    id: 13,
    raised_by: 'Reamonn',
    created_at: '9/30/2021',
    title: 'Christopher Strong',
    updated_time: '5/16/2022',
    status: 'Tresom',
    assigned_to: 'Flexidy',
    department: 'Stim',
  },
  {
    id: 14,
    raised_by: 'Randy',
    created_at: '8/15/2022',
    title: 'Zu: Warriors from the Magic Mountain (Xin shu shan jian ke)',
    updated_time: '1/6/2022',
    status: 'Stronghold',
    assigned_to: 'Subin',
    department: 'Stronghold',
  },
  {
    id: 15,
    raised_by: 'Lonny',
    created_at: '6/28/2022',
    title: 'Room in Rome (Habitación en Roma)',
    updated_time: '12/21/2021',
    status: 'Cookley',
    assigned_to: 'Andalax',
    department: 'Konklab',
  },
];

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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
            Text
          </Button>
        </div>
        <div className='d-flex flex-wrap gap-4 mt-3'>
          {mockData.map((request) => (
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
