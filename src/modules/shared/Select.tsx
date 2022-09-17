import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: SelectOption[];
  name:string;
}

const Select = ({ label, value, onChange, options,name }: SelectProps) => {
  return (
    <TextField
      id='outlined-select-currency'
      select
      label={label}
      value={value}
      onChange={onChange}
        name={name}
      
    //   sx={{width:200}}
    fullWidth
    >
      {options.map((option: SelectOption) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
