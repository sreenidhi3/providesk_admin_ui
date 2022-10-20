import { useMemo, useState } from 'react';

import Select from 'modules/shared/Select';
import Loader from 'modules/Auth/components/Loader';

import { useCategories, useDepartments } from '../category.hook';

import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  TableHead,
  TableRow,
} from '@mui/material';

const CategoryList = () => {
  const [departmentId, setDepartmentId] = useState<number>(1);

  const { data: categoriesList, isLoading: listFetching } =
    useCategories(departmentId);
  // todo
  // send organization id in useDepartments
  const { data: departmentsList, isLoading: departmentsFetching } =
    useDepartments(1);

  const deptOptions = useMemo(() => {
    return (
      departmentsList?.map((dept) => ({
        label: dept.name,
        value: dept.id,
      })) || []
    );
  }, [departmentId, departmentsList]);

  function handleChange(value: string) {
    setDepartmentId(parseInt(value));
  }

  return (
    <div style={{ width: '80%' }}>
      <Divider>
        <Typography variant='h6' component='div' align='center'>
          Category Listing
        </Typography>
      </Divider>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}
      >
        <Select
          required={true}
          sx={{ m: 0, width: '12rem' }}
          label={'Department'}
          value={departmentId}
          options={deptOptions}
          onChange={(e) => handleChange(e.target.value)}
        />{' '}
        <br />
      </div>
      <Divider>
        {departmentsList?.[departmentId - 1].name} Department Categories
      </Divider>
      <div style={{ maxHeight: '60vh', overflowY: 'scroll', width: '100%' }}>
        <TableContainer component={Paper}>
          <Table
            stickyHeader={true}
            sx={{
              minWidth: 250,
              maxHeight: '20vh',
              overflow: 'scroll',
            }}
            aria-label='sticky table'
          >
            <TableHead>
              <TableRow>
                <TableCell className='fw-bold'>Id</TableCell>
                <TableCell className='fw-bold'>Name</TableCell>
              </TableRow>
            </TableHead>
            {listFetching ? (
              <Loader isLoading={listFetching} />
            ) : (
              <TableBody>
                {categoriesList?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CategoryList;
