import { useCallback, useContext, useMemo, useState } from 'react';
import { useFormik } from 'formik';

import { useCategories, useDepartments } from 'modules/Category/category.hook';
import { useUsers } from 'modules/Ticket/ticket.hook';
import { useEditTicket } from '../details.hook';
import { IEditTicketPayload, IEditTicketProps } from '../type';
import { UserContext } from 'App';
import Select from 'modules/shared/Select';
import { Button } from 'modules/shared/Button';
import { validationSchema } from '../details.helpers';
import Loader from 'modules/Auth/components/Loader';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { StyleLabel } from 'modules/shared/StyleLabel';

export const EditTicketForm = ({
  ticket,
  id,
  setOpenEdit,
}: IEditTicketProps) => {
  const { userAuth } = useContext(UserContext);

  const [organizationId, setOrganizationId] = useState<number | ''>(
    userAuth?.organizations?.[0]?.id || ''
  );
  const [departmentId, setDepartmentId] = useState<number | ''>(
    parseInt(ticket?.department_id) || ''
  );

  const { data: departmentsList, isLoading: isFetchingDepartments } =
    useDepartments(organizationId);
  const { data: categoriesList, isLoading: isFetchingCategories } =
    useCategories(departmentId);
  const { data: usersList, isLoading: isFetchingUsers } =
    useUsers(departmentId);
  const { mutate, isLoading: isUpdatingTicket } = useEditTicket();

  const deptOptions = useMemo(
    () =>
      departmentsList?.map((dept) => ({
        label: dept.name,
        value: dept.id,
      })) || [],
    [departmentsList]
  );

  const categoryOptions = useMemo(() => {
    return (
      categoriesList?.map((cate) => ({
        label: cate.name,
        value: cate.id,
      })) || []
    );
  }, [categoriesList]);

  const userOptions = useMemo(() => {
    return (
      usersList?.map((cate) => ({
        label: cate.name,
        value: cate.id,
      })) || []
    );
  }, [usersList]);

  const handleUpdateTicket = useCallback((values) => {
    mutate({ id, ticket: { ticket: values } });
  }, []);

  const initialValues: IEditTicketPayload = {
    department_id: ticket?.department_id || '',
    category_id: ticket?.category_id || '',
    resolver_id: ticket?.resolver_id || '',
    description: '',
    status: ticket?.status || '',
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdateTicket(values);
      setOpenEdit(false);
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        m: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        maxWidth: 600,
        mt: 10,
      }}
    >
      <CloseIcon
        style={{ float: 'right', cursor: 'pointer' }}
        onClick={() => setOpenEdit(false)}
      />
      <Loader
        isLoading={
          isFetchingDepartments &&
          isFetchingCategories &&
          isFetchingUsers &&
          isUpdatingTicket
        }
      />
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 20,
          alignItems: 'center',
        }}
      >
        <FormControl sx={{ m: 2, minWidth: 240 }}>
          <Select
            name='department_id'
            required={true}
            label={'Department'}
            value={values.department_id}
            options={deptOptions}
            onChange={(e) => {
              setDepartmentId(parseInt(e.target.value));
              values.category_id = '';
              values.resolver_id = '';
              handleChange(e);
            }}
            error={(touched.department_id && errors.department_id) || ''}
          />
        </FormControl>

        <FormControl sx={{ m: 2, minWidth: 240 }}>
          <Select
            name='category_id'
            required={true}
            label={'Category'}
            value={values.category_id}
            options={categoryOptions}
            onChange={handleChange}
            error={(touched.category_id && errors.category_id) || ''}
          />
        </FormControl>

        <FormControl sx={{ m: 2, minWidth: 240 }}>
          <Select
            name='resolver_id'
            required={true}
            label={'Resolver'}
            value={values.resolver_id}
            options={userOptions}
            onChange={handleChange}
            error={(touched.resolver_id && errors.resolver_id) || ''}
          />
        </FormControl>

        <Box>
          <StyleLabel
            text={'Comment'}
            required={true}
            sx={{
              fontSize: '11px',
            }}
          />
          <TextareaAutosize
            required
            name='description'
            value={values.description}
            minRows={3}
            style={{
              border: '0',
              borderBottom: '1px solid',
              whiteSpace: 'pre-wrap',
              outline: 'none',
              width: '240px',
            }}
            placeholder='Leave a comment'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.description && errors.description && (
            <Typography
              variant='caption'
              display='block'
              color='#f44336'
              gutterBottom
              style={{ fontSize: '11px', margin: 0, padding: 0 }}
            >
              {errors.description}
            </Typography>
          )}
        </Box>

        <FormControl variant='standard' sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id='ticket-status-selector-id'>Status</InputLabel>
          <SelectMUI
            name='status'
            id='ticket-status-selector-id'
            placeholder='Current Status'
            required={true}
            value={values.status}
            label='Ticket Type'
            onChange={handleChange}
            error={touched.status && Boolean(errors.status)}
          >
            <MenuItem
              key={ticket?.status}
              value={ticket?.status || ''}
              selected
              style={{ textTransform: 'capitalize' }}
            >
              <span>{ticket?.status}</span>
            </MenuItem>
            {ticket?.permited_transitions?.map((item) => (
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

        <Button type='submit' className='mx-3' style={{ height: '40px' }}>
          Update Ticket
        </Button>
      </form>
    </Box>
  );
};
