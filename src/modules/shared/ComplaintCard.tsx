import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CardActionArea from '@mui/material/CardActionArea';

import { IComplaintDetails } from 'modules/dashboard/types';

interface Props {
  details: IComplaintDetails;
}

const ComplaintCard: React.FC<Props> = (props) => {
  const { details } = props;
  const {
    id,
    title,
    raised_by,
    created_at: raised_time,
    updated_time: last_update_time,
    status,
    assigned_to,
    department,
  } = details;

  const navigate = useNavigate();

  // navigate to the details page of specific complaint
  const onCardClick = () => {
    navigate('/');
  };

  const complaintConfig = [
    {
      label: 'Department',
      value: department,
    },
    {
      label: 'Raised by',
      value: raised_by,
    },
    {
      label: 'Raised Time',
      value: raised_time,
    },
    {
      label: 'Assigned To',
      value: assigned_to,
    },
    {
      label: 'Department',
      value: department,
    },
    { label: 'Last Updated Time', value: last_update_time },
  ];

  return (
    <Card sx={{ minWidth: 300, cursor: 'pointer' }} onClick={onCardClick}>
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
            sx={{ fontSize: 16, fontWeight: 'bold', maxWidth: 300 }}
            color='text.dark'
            gutterBottom
          >
            {title}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {complaintConfig.map((config) => (
                  <TableRow>
                    <TableCell sx={{ color: '#63686b' }}>
                      {config.label}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      {config.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default React.memo(ComplaintCard);
