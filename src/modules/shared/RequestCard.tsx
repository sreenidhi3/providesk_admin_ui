import { RequestData } from 'modules/dashboard/types';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material';

//  {
//     id: 1,
//     raised_by: 'Mickie',
//     raised_time: '8/6/2022',
//     title: 'Martin & Orloff',
//     last_update_time: '7/16/2022',
//     status: 'Fintone',
//     assigned_to: 'Rank',
//     department: 'Andalax',
//   },

const RequestCard = ({ data }: { data: RequestData }) => {
  const {
    id,
    title,
    raised_by,
    created_at: raised_time,
    updated_time: last_update_time,
    status,
    assigned_to,
    department,
  } = data;

  const navigate = useNavigate();

  const onCardClick = () => {
    navigate('/');
  };
  return (
    <Card sx={{ maxWidth: 275, cursor: 'pointer' }} onClick={onCardClick}>
      <CardActionArea>
        <CardContent>
          <Stack
            direction='row'
            spacing={1}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <Chip label={id} />
            <Chip label={status} color='primary' />
          </Stack>
          <Typography
            sx={{ fontSize: 16, fontWeight: 'bold' }}
            color='text.dark'
            gutterBottom
          >
            {title}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: '#63686b' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {department}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#63686b' }}>Raised by</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{raised_by}</TableCell>
                </TableRow>{' '}
                <TableRow>
                  <TableCell sx={{ color: '#63686b' }}>Raised Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {raised_time}
                  </TableCell>
                </TableRow>{' '}
                <TableRow>
                  <TableCell sx={{ color: '#63686b' }}>Assigned To </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {assigned_to}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: '#63686b' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {department}
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell sx={{ color: '#63686b',display:"flex" }}>
                    Last Updated Time 
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {last_update_time}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RequestCard;
