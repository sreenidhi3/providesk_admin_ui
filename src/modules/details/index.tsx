import * as yup from 'yup';
import { useCallback, useContext, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { UserContext } from 'App';
import { useCategories, useDepartments } from 'modules/Category/category.hook';
import { IEditTicketPayload, ITicketDetails } from './type';
import { useEditTicket, useTicketDetails } from './details.hook';
import { useUsers } from 'modules/Ticket/ticket.hook';

import Paper from '@mui/material/Paper';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  Typography,
  Select as SelectMUI,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { Select } from 'modules/shared/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { StyleLabel } from 'modules/shared/StyleLabel';
import { Button } from 'modules/shared/Button';
import Loader from 'modules/Auth/components/Loader';
import { EditTicketForm } from './components/EditTicketForm';

function Details() {
  const { userAuth } = useContext(UserContext);

  // toDo
  const id: number = parseInt(useParams().id as string);
  const {
    ticket: ticketDetails,
    activities,
    isLoading: isFetchingTicketDetails,
  } = useTicketDetails(id);

  const [ticket, setTicket] = useState(ticketDetails);
  // const [organizationId, setOrganizationId] = useState<number | ''>(
  //   userAuth?.organizations?.[0]?.id || ''
  // );
  // const [departmentId, setDepartmentId] = useState<number | ''>(
  //   ticket?.department_id || ''
  // );

  // const { data: departmentsList, isLoading: isFetchingDepartments } =
  //   useDepartments(organizationId);
  // const { data: categoriesList, isLoading: isFetchingCategories } =
  //   useCategories(departmentId);
  // const { data: usersList, isLoading: isFetchingUsers } =
  //   useUsers(departmentId);
  // const { mutate } = useEditTicket();

  useEffect(() => {
    setTicket(ticketDetails);
  }, [ticketDetails]);

  // const deptOptions = useMemo(
  //   () =>
  //     departmentsList?.map((dept) => ({
  //       label: dept.name,
  //       value: dept.id,
  //     })) || [],
  //   [departmentsList]
  // );

  // const categoryOptions = useMemo(() => {
  //   return (
  //     categoriesList?.map((cate) => ({
  //       label: cate.name,
  //       value: cate.id,
  //     })) || []
  //   );
  // }, [categoriesList]);

  // const userOptions = useMemo(() => {
  //   return (
  //     usersList?.map((cate) => ({
  //       label: cate.name,
  //       value: cate.id,
  //     })) || []
  //   );
  // }, [usersList]);

  // const onSubmit = useCallback((values) => {
  //   // window.alert(values);
  //   mutate({ id, ticket: { ticket: values } });
  // }, []);

  // const initialValues: IEditTicketPayload = {
  //   department_id: ticket?.department_id || '',
  //   category_id: ticket?.category_id || '',
  //   resolver_id: ticket?.resolver_id || '',
  //   status: ticket?.status || '',
  // };

  const validationSchema = yup.object({
    // description: yup
    //   .string()
    //   .matches(
    //     /^[-().,_ A-Za-z0-9@': \n]*$/i,
    //     'Special characters are not allowed.'
    //   )
    //   .required('Update ticket comment is required'),
    department_id: yup.string().required('Select department'),
    category_id: yup.string().required('Select ticket category'),
    resolver_id: yup.string().required('Assign ticket to resolver'),
  });

  // const {
  //   values,
  //   touched,
  //   errors,
  //   handleChange,
  //   handleBlur,
  //   handleSubmit,
  //   resetForm,
  // } = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     onSubmit(values);
  //     resetForm();
  //   },
  // });

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} p={5}>
          <Divider>
            <Typography variant='h6' component='div'>
              Edit Ticket {}
            </Typography>
          </Divider>
          <Loader isLoading={isFetchingTicketDetails} />
          {isFetchingTicketDetails ? (
            <Loader isLoading={isFetchingTicketDetails} />
          ) : (
            <EditTicketForm ticket={ticketDetails} id={id} />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ maxHeight: '85vh', overflow: 'auto' }}
        >
          <div className='timeline'>
            {[1, 2, 2, 3, 3, 34, 3, 3, 3, 3, 2].map((item) => {
              return (
                <>
                  <div style={{ display: 'flex' }}>
                    <div className='content-left left'>dfkj.</div>
                    <div>
                      <div className='container right'>
                        <div className='content'>
                          <Paper elevation={8}>
                            <div className='p-2 m-2'>
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing omnis laudantium est obcaecati
                                quibusdam aliquam excepturi nulla?
                              </p>
                            </div>
                          </Paper>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Details;
