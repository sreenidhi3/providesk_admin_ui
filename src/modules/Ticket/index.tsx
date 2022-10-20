import { useMemo, useState, useContext } from 'react';
import { toast } from 'react-toastify';

import { Button } from 'modules/shared/Button';
import Select from 'modules/shared/Select';

import { UserContext } from 'App';
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
  const { userAuth } = useContext(UserContext);

  const [organization_id, setOrganizationId] = useState<number | ''>(
    userAuth?.organizations?.[0]?.id || ''
  );
  const [department_id, setDepartmentId] = useState<number | ''>(1);
  const [ticketData, setTicketData] = useState<createTicketDataType | {}>({});

  const { data: departmentsList, isLoading: departmentsFetching } =
    useDepartments(organization_id);
  const { data: categoriesList, isLoading: categoriesFetching } =
    useCategories(department_id);
  const { data: usersList, isLoading: usersFetching } = useUsers(department_id);
  const { mutate, isLoading: creating, data } = useCreateTicket();

  const ticketTypesList: string[] = ['request', 'complaint'];

  const deptOptions = useMemo(() => {
    return (
      departmentsList?.map((dept) => ({
        label: dept.name,
        value: dept.id,
      })) || []
    );
  }, [departmentsList]);

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
    let valid = /^[-()., A-Za-z0-9 \n]*$/;
    if (valid.test(value)) {
      setTicketData((values) => ({ ...values, [name]: value }));
    }
  };

  function handleSelectDeptChange(e) {
    setDepartmentId(parseInt(e.target.value));
    handleDataChange(e);
  }

  const createTicket = () => {
    let ticket = ticketData as createTicketDataType;
    if (
      Object.keys(ticket).length > 1 &&
      ticket?.title &&
      ticket.title.length > 0 &&
      ticket?.description &&
      ticket.description?.length > 0 &&
      ticket.resolver_id &&
      ticket.department_id &&
      ticket.ticket_type &&
      ticket.category_id
    ) {
      let payload = {
        ticket: {
          ...ticket,
          title: ticket.title.trim(),
          description: ticket.description.trim(),
        },
      };
      mutate(payload);
      setTicketData({});
    } else {
      toast.warning('Fields cannot be empty');
      return;
    }
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
              label='Complaint or Request'
              name='title'
              minRows={3}
              value={(ticketData as createTicketDataType).title || ''}
              type='text'
              required={true}
              variant='standard'
              color='secondary'
              onChange={handleDataChange}
              autoFocus={true}
              helperText='Cannot include special characters'
            />
            <small style={{ margin: '0 1rem' }}> Description * </small>
            <textarea
              style={{
                margin: '0 1rem',
                border: '0',
                borderBottom: '1px solid',
                whiteSpace: 'pre-wrap',
                outline: 'none',
              }}
              name='description'
              rows={3}
              value={(ticketData as createTicketDataType).description || ''}
              required={true}
              color='secondary'
              onChange={handleDataChange}
            />
            <small style={{ fontSize: '0.6rem', margin: '0.4rem 1rem' }}>
              Cannot include special characters
            </small>
            <FormControl variant='standard' sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id='ticket-type-selector-id'>Ticket Type</InputLabel>
              <SelectMUI
                name='ticket_type'
                placeholder='Ticket Type'
                required={true}
                labelId='ticket-type-selector-id'
                id='priority-selector'
                value={(ticketData as createTicketDataType).ticket_type || ''}
                label='Ticket Type'
                onChange={handleDataChange}
              >
                <MenuItem
                  key={'Select'}
                  value={''}
                  style={{ textTransform: 'capitalize' }}
                >
                  <span>None</span>
                </MenuItem>
                {ticketTypesList?.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                    style={{ textTransform: 'capitalize' }}
                  >
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
              className='mx-3'
              style={{ height: '40px' }}
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
