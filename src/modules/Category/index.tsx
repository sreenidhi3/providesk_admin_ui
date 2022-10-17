import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateCategory, useDepartments } from './category.hook';
import { PriorityType } from './type';
import CategoryList from './components/CategoryList';
import { Button } from 'modules/shared/Button';
import API_CONSTANTS from 'hooks/constants';

import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

export const Category = () => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState<string>('');
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);

  const { mutate, isLoading: creating, data } = useCreateCategory();
  const { data: departmentsList, isLoading: departmentsFetching } =
    useDepartments(1);
  const prioritiesList: PriorityType[] = [
    { id: 0, value: 'Regular' },
    { id: 1, value: 'High' },
    { id: 2, value: 'Medium' },
    { id: 3, value: 'Low' },
  ];

  const createCategory = () => {
    let payload = {
      categories: {
        name: category,
        priority: priority,
        department_id: departmentId,
      },
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
        <Divider>
          <Typography variant='h6' component='div'>
            Create New Category
          </Typography>
        </Divider>
        <div
          style={{
            margin: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label='Create New Category'
            value={category}
            type='text'
            required={true}
            variant='standard'
            color='secondary'
            onChange={(e) => setCategory(e.target.value)}
          />
          <FormControl variant='standard' sx={{ m: 3, minWidth: 120 }}>
            <InputLabel id='priority-selector-id'>Priority</InputLabel>
            <Select
              placeholder='Select Priority'
              required={true}
              labelId='priority-selector-id'
              id='priority-selector'
              value={priority?.toString()}
              label='Priority'
              onChange={(e: SelectChangeEvent) =>
                setPriority(parseInt(e.target.value))
              }
            >
              {prioritiesList?.map((item) => (
                <MenuItem key={item.value} value={item.id}>
                  <span>{item.value}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='department-selector-id'>Department</InputLabel>
            <Select
              placeholder='Select Department'
              required={true}
              labelId='department-selector-id'
              id='department-selector'
              value={departmentId?.toString()}
              label='Department'
              onChange={(e: SelectChangeEvent) =>
                setDepartmentId(parseInt(e.target.value))
              }
            >
              <MenuItem key={'None'} value={0}>
                <em> -Select- </em>
              </MenuItem>
              {departmentsList?.map((item) => (
                <MenuItem key={item.name} value={item.id}>
                  <span>{item.name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              createCategory();
              setPriority(0);
              setDepartmentId(0);
              setCategory('');
            }}
            className='btn btn-success mx-3'
            style={{ height: '40px' }}
            disabled={category.length < 6 || departmentId === 0 || creating}
          >
            Create
          </Button>
        </div>
        <br />
        <CategoryList />
      </div>
    </>
  );
};
