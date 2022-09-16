import Header from 'modules/shared/Header';
import RequestCard from 'modules/shared/RequestCard';
import React from 'react';
import { RequestData } from './types';
import Container from '@mui/material/Container';


const mockData: RequestData[] = [
  {
    id: 1,
    raised_by: 'Mickie',
    raised_time: '8/6/2022',
    title: 'Martin & Orloff',
    last_update_time: '7/16/2022',
    status: 'Fintone',
    assigned_to: 'Rank',
    department: 'Andalax',
  },
  {
    id: 2,
    raised_by: 'Vivyanne',
    raised_time: '3/19/2022',
    title: 'Angel in My Pocket',
    last_update_time: '3/16/2022',
    status: 'Zathin',
    assigned_to: 'Y-find',
    department: 'Cookley',
  },
  {
    id: 3,
    raised_by: 'Giustino',
    raised_time: '6/2/2022',
    title: 'Reckless',
    last_update_time: '5/1/2022',
    status: 'Cardguard',
    assigned_to: 'Otcom',
    department: 'Bytecard',
  },
  {
    id: 4,
    raised_by: 'Deborah',
    raised_time: '11/18/2021',
    title: 'Nightwatch',
    last_update_time: '6/9/2022',
    status: 'Treeflex',
    assigned_to: 'Fixflex',
    department: 'Rank',
  },
  {
    id: 5,
    raised_by: 'Brianne',
    raised_time: '12/17/2021',
    title: 'Blank Check',
    last_update_time: '6/11/2022',
    status: 'Aerified',
    assigned_to: 'Matsoft',
    department: 'Namfix',
  },
  {
    id: 6,
    raised_by: 'Linnea',
    raised_time: '3/19/2022',
    title: 'Aningaaq',
    last_update_time: '1/31/2022',
    status: 'Stim',
    assigned_to: 'Domainer',
    department: 'Konklux',
  },
  {
    id: 7,
    raised_by: 'Lyndsie',
    raised_time: '3/20/2022',
    title: "Gone Fishin'",
    last_update_time: '12/20/2021',
    status: 'Voyatouch',
    assigned_to: 'Veribet',
    department: 'Toughjoyfax',
  },
  {
    id: 8,
    raised_by: 'Clemmy',
    raised_time: '9/6/2022',
    title: 'Emma',
    last_update_time: '7/25/2022',
    status: 'Y-find',
    assigned_to: 'Mat Lam Tam',
    department: 'Tampflex',
  },
  {
    id: 9,
    raised_by: 'Kata',
    raised_time: '7/26/2022',
    title: 'Play it to the Bone',
    last_update_time: '11/30/2021',
    status: 'Keylex',
    assigned_to: 'Cardguard',
    department: 'Cookley',
  },
  {
    id: 10,
    raised_by: 'Worth',
    raised_time: '5/14/2022',
    title: 'Duck, You Sucker (a.k.a. Fistful of Dynamite, A) (Giù la testa)',
    last_update_time: '12/13/2021',
    status: 'Temp',
    assigned_to: 'Kanlam',
    department: 'Asoka',
  },
  {
    id: 11,
    raised_by: 'Aurea',
    raised_time: '11/24/2021',
    title: '#chicagoGirl: The Social Network Takes on a Dictator',
    last_update_time: '4/23/2022',
    status: 'Stringtough',
    assigned_to: 'Y-Solowarm',
    department: 'Vagram',
  },
  {
    id: 12,
    raised_by: 'Emalee',
    raised_time: '1/7/2022',
    title: 'Times Square',
    last_update_time: '2/1/2022',
    status: 'Stim',
    assigned_to: 'Stronghold',
    department: 'Alpha',
  },
  {
    id: 13,
    raised_by: 'Reamonn',
    raised_time: '9/30/2021',
    title: 'Christopher Strong',
    last_update_time: '5/16/2022',
    status: 'Tresom',
    assigned_to: 'Flexidy',
    department: 'Stim',
  },
  {
    id: 14,
    raised_by: 'Randy',
    raised_time: '8/15/2022',
    title: 'Zu: Warriors from the Magic Mountain (Xin shu shan jian ke)',
    last_update_time: '1/6/2022',
    status: 'Stronghold',
    assigned_to: 'Subin',
    department: 'Stronghold',
  },
  {
    id: 15,
    raised_by: 'Lonny',
    raised_time: '6/28/2022',
    title: 'Room in Rome (Habitación en Roma)',
    last_update_time: '12/21/2021',
    status: 'Cookley',
    assigned_to: 'Andalax',
    department: 'Konklab',
  },
];

const Dashboard = () => {
  return (
    <div >
      <Header />
     <Container>
        
     </Container>
      <Container sx={{display:"flex",flexWrap:"wrap"}}>
        {mockData.map((request) => (
          <RequestCard data={request} />
        ))}
      </Container>
    </div>
  );
};

export default Dashboard;
