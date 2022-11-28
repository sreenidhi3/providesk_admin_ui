import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { IComplaintDetails } from 'modules/dashboard/types';
import ROUTE from 'routes/constants';
import { List, ListItem } from '@mui/material';
interface Props {
  details: IComplaintDetails;
}

const ComplaintCard: React.FC<Props> = (props) => {
  const { details } = props;
  const {
    id,
    title,
    description,
    ticket_number,
    status,
    priority,
    ticket_type,
    resolved_at,
    created_at,
    updated_at,
    category,
    department,
    resolver,
    requester,
    permited_events,
  } = details;

  const navigate = useNavigate();

  // navigate to the details page of specific complaint
  const onCardClick = () => {
    navigate(`${ROUTE.DASHBOARD}/${id}`);
  };

  const complaintConfig = [
    {
      label: 'Department',
      value: department,
    },
    {
      label: 'Category',
      value: category,
    },
    {
      label: 'Raised by',
      value: requester,
    },
    {
      label: 'Raised Time',
      value: created_at,
    },
    {
      label: 'Assigned To',
      value: resolver,
    },
   
    { label: 'Last Updated Time', value: updated_at || '_' },
  ];

  return (
    <Card variant="outlined" onClick={onCardClick}>
      <CardContent sx={{pb: '0.5rem !important'}}>
        <Stack
          direction='row'
          spacing={1}
          sx={{justifyContent: 'space-between', mb: '1rem'}}
        >
          <Chip label={id} variant="outlined" size='small' sx={{fontSize: '0.75rem', fontWeight: '600'}} />
          <Chip label={status} variant="outlined" color='info' className='text-truncate' size='small' sx={{fontSize: '0.75rem', fontWeight: '500'}} />
        </Stack>
        <Typography variant='h6' sx={{mb: '0.5rem'}} className='text-truncate'>
          {title}
        </Typography>
        <List className='card-list'>
          {complaintConfig.map((config) => (
            <ListItem sx={{gap: '1rem', p: '0.5rem'}} className='card-list-item'>
              <Typography variant='body2' sx={{mr: 'auto'}}>{config.label}</Typography>
              <Typography variant='body1' sx={{fontWeight: '700'}}>{config.value}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default React.memo(ComplaintCard);
