import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { IComplaintDetails } from 'modules/dashboard/types';
import ROUTE from 'routes/constants';
import { List, ListItem } from '@mui/material';
import { ticketStatusColours } from 'modules/details/constants';
import { Box } from '@mui/system';
import { DateFormate } from 'apis/utils/date.utils';
interface Props {
  details: IComplaintDetails;
}

const ComplaintCard: React.FC<Props> = (props) => {
  const { details } = props;
  const {
    id,
    title,  
    status,   
    created_at,
    updated_at,
    category,
    department,
    resolver,
    requester, 
    reason_for_update
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
      value: DateFormate(created_at),
    },
    {
      label: 'Assigned To',
      value: resolver,
    },
   {
    label:"Last Comment",
    value: reason_for_update || "_"
   },
    {
       label: 'Last Updated Time',
        value: DateFormate(updated_at) || '_'
    },
  ];
  const [pointer,setPointer] = useState<boolean>(false) 

  return (
    
    <Card variant="outlined" onClick={onCardClick} 
    // onMouseEnter={()=>setPointer(true)} 
    // onMouseOut={()=>setPointer(false)}
    // className={"shadow-lg p-3 mb-5 bg-red rounded"}
     sx={{cursor:"pointer" }}
    //  boxShadow={{ pointer?-1:3}}
     >
      <CardContent sx={{pb: '0.5rem !important'}}>
        <Stack
          direction='row'
          spacing={1}
          sx={{justifyContent: 'space-between', mb: '1rem'}}
        >
          {/* <Chip label={id} variant="outlined" size='small' sx={{fontSize: '0.75rem', fontWeight: '600'}} /> */}
          <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} className='text-truncate' size='small' sx={{fontSize: '1rem', fontWeight: '400',}} style={{backgroundColor:ticketStatusColours[status]}}/>
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
        <Box sx={{display:"flex" ,justifyContent:"center"}}>
        <Typography onClick= {onCardClick} sx={{color:"GrayText"}}>See more...</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(ComplaintCard);
