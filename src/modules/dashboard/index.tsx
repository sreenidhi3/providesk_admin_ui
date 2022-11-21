import React, { useContext, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';

import { useGetRequestsList } from './dashboard.hooks';
import { CustomSelect } from 'modules/shared/Select';
import Search from 'modules/shared/Search';
import ComplaintCard from 'modules/shared/ComplaintCard';
import { UserContext } from 'App';
import { useCategories, useDepartments } from 'modules/Category/category.hook';
import { CheckBox } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Checkbox, Typography } from '@mui/material';

const statusOptions = [
  {
    value: 'open',
    label: 'Open',
  },
  {
    value: 'assigned',
    label: 'Assigned',
  },
  {
    value: 'in_progress',
    label: 'In Progress',
  },
  {
    value: 'resloved',
    label: 'Resloved',
  },
];


const typeOption = [{value:"complaint",label:"Complaint"},{value:"request",label:"Request"}]

const DEFAULT_FILTERS = {
  status: '',
  type:'',
  department: '',
  title: '',
  category:'',
  page: 0,
  perPage: 30,
  assig_to_me:false,
  created_by_me:false,
};

const TOTAL_COMPLAINTS = 15;

const Dashboard = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const { data, isLoading } = useGetRequestsList(filters);
  const {userAuth}= useContext(UserContext);
  //todo add admin or user filter
  // console.log(userAuth,"usercontext")
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [departmentId, setDepartmentId] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((p) => ({ ...p, [event.target.name]: event.target.value }));
  };

  const onSearchTile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((p) => ({ ...p, title: event.target.value }));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { data: categoriesList, isLoading: listFetching } =
  useCategories(departmentId);
  const categoryOptions = useMemo(() => {
    return (
      categoriesList?.map((cate) => ({
        label: cate.name,
        value: cate.id,
      })) || []
    );
  }, [categoriesList]);
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

  const updatedData = data?.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  

  return (
    <div>
      <div className='d-flex flex-column p-5 '>
        <div className='d-flex gap-3 mb-4'>
        <CustomSelect
          label = {'Type'}
          options= {typeOption}
          value={filters.type}
          onChange={handleChange}
          name='type'
          />
          <CustomSelect
            label={'Status'}
            options={statusOptions}
            value={filters.status}
            onChange={handleChange}
            name='status'
          />
           <CustomSelect
            label={'departments'}
            options={deptOptions}
            value={filters.department}
            onChange={(e)=>{setDepartmentId(+(e.target.value));
              setFilters((p) => ({ ...p, "category": "" }))
              handleChange(e)}
            
            }
            name='department'
          />
          <CustomSelect
            label={'Category'}
            options={categoryOptions}
            value={filters.category}
            onChange={handleChange}
            name='category'
          />
          <Box sx={{display:"flex"}}>
            <Typography>Assign to me</Typography>
          <Checkbox checked={filters.assig_to_me} onChange={()=> setFilters((p) => ({ ...p, "assig_to_me": !filters.assig_to_me }))}/>
          </Box>
          <Box sx={{display:"flex"}}>
            <Typography>Created by me</Typography>
          <Checkbox checked={filters.created_by_me} onChange={()=> setFilters((p) => ({ ...p, "created_by_me": !filters.created_by_me }))}/>
          </Box>
        
          <Search
            label={'Enter Title'}
            value={filters.title}
            onChange={onSearchTile}
            name='title'
          />
          <Button variant='contained' sx={{ width: 250 }}>
            Search
          </Button>
        </div>
        <div className='d-flex justify-content-around flex-wrap gap-4 mt-3'>
          {updatedData?.map((complaint) => (
            <ComplaintCard details={complaint} />
          ))}
        </div>
        <div className='d-flex justify-content-end mt-3'>
          <TablePagination
            component='div'
            count={TOTAL_COMPLAINTS}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: 30 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
