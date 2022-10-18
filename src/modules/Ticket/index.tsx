import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';

import { Button } from 'modules/shared/Button';
import Select from 'modules/shared/Select';

import { createTicketDataType } from './type';
import { useCategories, useDepartments } from 'modules/Category/category.hook';
import { useCreateTicket, useUsers } from './ticket.hook';

import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select as SelectMUI,
  TextField,
  Typography,
} from '@mui/material';

export const Ticket = () => {
  const queryClient = useQueryClient();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [department_id, setDepartmentId] = useState<number | ''>(1);
  const [ticketData, setTicketData] = useState<createTicketDataType | {}>({});

  const { data: departmentsList, isLoading: departmentsFetching } =
    useDepartments(1);
  const { data: categoriesList, isLoading: categoriesFetching } =
    useCategories(department_id);
  const { data: usersList, isLoading: usersFetching } = useUsers(department_id);
  const { mutate, isLoading: creating, data } = useCreateTicket();

  const ticketTypesList: string[] = ['Request', 'Complaint'];

  const deptOptions = useMemo(() => {
    return (
      departmentsList?.map((dept) => ({
        label: dept.name,
        value: dept.id,
      })) || []
    );
  }, [departmentsList]);
  //todo
  //add organization_id to dependency array for departments option list

  const categoryOptions = useMemo(() => {
    return (
      categoriesList?.map((cate) => ({
        label: cate.name,
        value: cate.id,
      })) || []
    );
  }, [department_id, categoriesList]);

  const userOptions = useMemo(() => {
    return (
      usersList?.map((cate) => ({
        label: cate.name,
        value: cate.id,
      })) || []
    );
  }, [department_id, usersList]);

  const handleDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTicketData((values) => ({ ...values, [name]: value }));
    let ticket = ticketData as createTicketDataType;
    if (
      ticket.title &&
      ticket?.title.length > 0 &&
      ticket.description &&
      ticket?.description.length > 0 &&
      ticket.resolver_id &&
      ticket.department_id &&
      ticket.ticket_type &&
      ticket.category_id
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  function handleSelectDeptChange(e) {
    setDepartmentId(parseInt(e.target.value));
    handleDataChange(e);
  }

  const createTicket = () => {
    let payload = {
      ticket: { ...(ticketData as createTicketDataType) },
    };
    mutate(payload);
  };

  return (
    <>
      <div
        style={{
          margin: '3rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={2} sx={{ paddingTop: 3, minWidth: '20rem' }}>
          <Divider>
            <Typography variant='h6' component='div'>
              Create New Ticket
            </Typography>
          </Divider>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <TextField
              sx={{ m: 2 }}
              label='Enter ticket title'
              name='title'
              value={(ticketData as createTicketDataType).title || ''}
              type='text'
              required={true}
              variant='standard'
              color='secondary'
              onChange={handleDataChange}
            />
            <TextField
              sx={{ m: 2 }}
              label='Enter ticket description'
              name='description'
              value={(ticketData as createTicketDataType).description || ''}
              type='text'
              required={true}
              variant='standard'
              color='secondary'
              onChange={handleDataChange}
            />
            <FormControl variant='standard' sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id='ticket-type-selector-id'>Ticket Type</InputLabel>
              <SelectMUI
                name='ticket_type'
                placeholder='Select Ticket Type'
                required={true}
                labelId='ticket-type-selector-id'
                id='priority-selector'
                value={(ticketData as createTicketDataType).ticket_type || ''}
                label='Ticket Type'
                onChange={handleDataChange}
              >
                {ticketTypesList?.map((item) => (
                  <MenuItem key={item} value={item}>
                    <span>{item}</span>
                  </MenuItem>
                ))}
              </SelectMUI>
            </FormControl>

            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <Select
                name='department_id'
                required={true}
                label={'Department'}
                value={(ticketData as createTicketDataType).department_id || ''}
                options={deptOptions}
                onChange={(e) => handleSelectDeptChange(e)}
              />
            </FormControl>

            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <Select
                name='category_id'
                required={true}
                label={'Category'}
                value={(ticketData as createTicketDataType).category_id || ''}
                options={categoryOptions}
                onChange={(e) => handleDataChange(e)}
              />
            </FormControl>

            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <Select
                name='resolver_id'
                required={true}
                label={'Resolver'}
                value={(ticketData as createTicketDataType).resolver_id || ''}
                options={userOptions}
                onChange={(e) => handleDataChange(e)}
              />
            </FormControl>

            <Button
              onClick={() => {
                createTicket();
              }}
              className='btn btn-success mx-3'
              style={{ height: '40px' }}
              disabled={disabled}
            >
              Create
            </Button>
          </div>
          <br />
        </Paper>
      </div>
    </>
  );
};
