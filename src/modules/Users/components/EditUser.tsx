import { useCallback, useState, useMemo, useContext } from 'react';

import { useDepartments } from 'modules/Category/category.hook';
import Loader from 'modules/Auth/components/Loader';
import Select from 'modules/shared/Select';
import { Button } from 'modules/shared/Button';
import { useEditUser } from '../users.hook';
import { getAllowedRoles } from '../users.helpers';
import { UserContext } from 'App';
import { ROLES } from 'routes/roleConstants';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditUser = ({ user, organizationId, setOpenEdit }) => {
  const { userAuth } = useContext(UserContext);

  const { data: departmentsList, isLoading: isFetchingDepartments } =
    useDepartments(organizationId);
  const [departmentId, setDepartmentId] = useState<number>(
    user?.department_id || departmentsList?.[0]?.id
  );
  const [role, setRole] = useState<string>('');
  const allowedRoles = getAllowedRoles(userAuth?.role);
  const { mutate: updateUser, isLoading: isUpdatingUser } = useEditUser();

  const handleRoleChange = useCallback((e) => setRole(e.target.value), []);
  const handleUpdateUser = useCallback(() => {
    const payload = {
      role,
      department_id: departmentId,
    };
    // updateUser(payload)
    console.log(payload);
  }, [role, departmentId]);

  const deptOptions = useMemo(() => {
    if (userAuth?.role === ROLES.DEPARTMENT_HEAD)
      setDepartmentId(userAuth.organizations[0].department_id);
    return (
      departmentsList?.map((dept) => ({ label: dept.name, value: dept.id })) ||
      []
    );
  }, [departmentsList]);

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
      <Loader isLoading={isFetchingDepartments || isUpdatingUser} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3>Edit User</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormControl variant='standard' sx={{ m: '1rem 0', minWidth: 240 }}>
            <InputLabel id='select-role'>Role</InputLabel>
            <SelectMUI
              labelId='select-role'
              id='select-role'
              value={role}
              onChange={handleRoleChange}
              label='Change Role'
            >
              {allowedRoles.map((role) => (
                <MenuItem value={role}>{role}</MenuItem>
              ))}
            </SelectMUI>
          </FormControl>

          <Select
            sx={{ minWidth: 240 }}
            name='department'
            required={true}
            label={'Department'}
            value={departmentId}
            options={deptOptions}
            onChange={(e) => setDepartmentId(parseInt(e.target.value))}
          />

          <Button
            disabled={false}
            type='submit'
            onClick={handleUpdateUser}
            style={{ height: '40px', margin: '1.5rem auto' }}
          >
            Update
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default EditUser;
